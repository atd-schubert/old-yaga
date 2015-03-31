/*jslint node: true */
'use strict';

/**
 * This is the basic Gruntfile for Yaga.
 *
 * @module ./Gruntfile.js
 * @author Arne Schubert <atd.schubert@gmail.com>
 */

/**
 * Common.JS object
 * @name module
 * @type {object}
 * @property {*} exports - Reference to export module data
 */

/**
 * Function to require Common.JS modules
 * @name require
 * @type {function}
 */

/**
 * Grunt module
 * @name grunt
 * @link http://gruntjs.com/api/grunt - Grunt API Documentation
 * @requires grunt
 * @property {function} initConfig
 * @property {function} loadNpmTasks
 * @property {function} registerMultiTask
 * @property {function} registerTask
 * @property {object} config
 * @property {object} task
 * @property {function} task.run
 * @property {object} log
 * @property {object} file
 * @property {object} fail
 * @property {function} fail.fatal
 * @type {object}
 */

/**
 * Project settings
 *
 * @name project
 * @type object
 */
var project = {
    css: [
        'scripts/vendor/jquery-mobile-bower/*.css',
        'scripts/vendor/leaflet/*.css',
        'scripts/yaga.css'
    ],
    livereload: 12345,
    port: 3000,
    localHostname: 'localhost'
};

/**
 * Task-runner for yaga-client
 * @param {grunt} grunt
 */


module.exports = function yagaClientTaskRunner(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            debug: {
                options: {
                    keepalive: false,
                    port: project.port,
                    open: true,
                    hostname: '*',
                    base: {
                        path: './',
                        options: {
                            index: 'debug.html',
                            maxAge: 300000
                        }
                    }
                }
            },
            dist: {
                options: {
                    keepalive: true,
                    port: project.port,
                    open: true,
                    hostname: '*',
                    base: {
                        path: './',
                        options: {
                            index: 'dist/dist.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    name: 'app',
                    baseUrl: 'scripts',
                    mainConfigFile: 'scripts/main.js',
                    out: 'dist/dist.min.js'
                }
            }
        },
        watch: {
            changeJsFiles: {
                files: ['scripts/*.js'],
                //tasks: ['requirejs'],
                options: {
                    livereload: project.livereload
                }
            },
            changeCssFiles: {
                files: [''],
                tasks: ['concat:css', 'cssmin'],
                options: {
                    livereload: project.livereload
                }
            },
            changeVendorFiles: {
                files: ['scripts/vendor/**'],
                //tasks: ['requirejs', 'concat:css', 'cssmin'],
                options: {
                    livereload: project.livereload
                }
            },
            views: {
                files: ['views/**'],
                tasks: ['jade'],
                options: {
                    livereload: project.livereload
                }
            }
        },
        concat: {
            options: {
                separator: ' '
            },
            css: {
                src: project.cssFileOrder,
                dest: 'scripts/dist.css'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: {
                    'scripts/dist.min.css': project.cssFileOrder
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'scripts/vendor',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: true,
                    bowerOptions: {}
                }
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },
        clean: {
            dist: ['dist'],
            bower: ['scripts/vendor'],
            debug: ['debug.html']
        },
        jade: {
            debug: {
                options: {
                    data: {
                        css: project.css,
                        livereload: {
                            port: project.livereload,
                            host: project.localHostname
                        },
                        jsSrc: 'scripts/vendor/requirejs/require.js',
                        amdMain: 'scripts/main.js'
                    }
                },
                files: {
                    'debug.html': 'views/index.jade'
                }
            },
            dist: {
                options: {
                    data: {
                        livereload: false,
                        manifest: 'dist.appcache',
                        jsSrc: 'scripts/dist.min.js'
                    }
                },
                files: {
                    'dist.html': 'views/index.jade'
                }
            }
        },
        manifest: {
            dist: {
                options: {
                    //basePath: '../',
                    cache: ['scripts/dist.min.js', 'scripts/dist.min.css'],
                    network: [],
                    fallback: [],
                    exclude: [],
                    preferOnline: true,
                    verbose: true,
                    timestamp: false,
                    hash: true,
                    master: ['dist.html'],
                    process: function(path) {
                        return path.substring('build/'.length);
                    }
                },
                src: [
                    'dist.html',
                    'scripts/dist.min.js',
                    'scripts/dist.min.css'
                ],
                dest: 'dist.appcache'
            },
            debug: {
                options: {
                    //basePath: '../',
                    cache: [],
                    network: [],
                    fallback: [],
                    exclude: [],
                    preferOnline: true,
                    verbose: true,
                    timestamp: false,
                    hash: true,
                    master: ['dist/index.html'],
                    process: function(path) {
                        return path.substring('dist/'.length);
                    }
                },
                src: [
                    'dist.html',
                    'scripts/dist.min.js',
                    'scripts/dist.min.css'
                ],
                dest: 'debug.appcache'
            }
        }
    });


// Loaded-tasks:
// General
    /**
     * Task for opening static files in a virtual server
     * @link https://github.com/gruntjs/grunt-contrib-connect - Github
     * @requires grunt-contrib-connect/tasks/connect.js
     */
    grunt.loadNpmTasks('grunt-contrib-connect');

    /**
     * Task for opening static files in a virtual server
     * @link https://github.com/gruntjs/grunt-contrib-requirejs - Github
     * @requires grunt-contrib-requirejs/tasks/requirejs.js
     */
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    /**
     * Task for watching file changes
     * @link https://github.com/gruntjs/grunt-contrib-watch - Github
     * @requires grunt-contrib-watch/tasks/watch.js
     */
    grunt.loadNpmTasks('grunt-contrib-watch');

    /**
     * Task for concat files
     * @link https://github.com/gruntjs/grunt-contrib-concat - Github
     * @requires grunt-contrib-concat/tasks/concat.js
     */
    grunt.loadNpmTasks('grunt-contrib-concat');

    /**
     * Task for minifying css files
     * @link https://github.com/gruntjs/grunt-contrib-cssmin - Github
     * @requires grunt-contrib-cssmin/tasks/cssmin.js
     */
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    /**
     * Task for handle bower
     * @link https://github.com/yatskevich/grunt-bower-task - Github
     * @requires grunt-bower-task/tasks/bower_task.js
     */
    grunt.loadNpmTasks('grunt-bower-task');

    /**
     * Task to clean files
     * @link https://github.com/gruntjs/grunt-contrib-clean - Github
     * @requires grunt-contrib-clean/tasks/clean.js
     */
    grunt.loadNpmTasks('grunt-contrib-clean');

    /**
     * Task create html files from jade
     * @link https://github.com/gruntjs/grunt-contrib-jade - Github
     * @requires grunt-contrib-jade/tasks/jade.js
     */
    grunt.loadNpmTasks('grunt-contrib-jade');

    /**
     * Task to generate manifest files
     * @link https://github.com/gunta/grunt-manifest - Github
     * @requires grunt-manifest/tasks/manifest.js
     */
    grunt.loadNpmTasks('grunt-manifest');

    grunt.registerTask('dist', ['jade:dist', 'requirejs', 'cssmin', 'connect:dist']);
    grunt.registerTask('init', ['bower']);
    grunt.registerTask('default', ['jade:debug', 'concat:css', 'connect:debug', 'watch']);
};