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
 * Function for listing files
 * @link https://www.npmjs.com/package/glob - NPM
 * @requires glob
 * @type {exports}
 */
var glob = require('glob');

/**
 * Node filesystem library
 * @type {exports}
 * @requires fs
 */
var fs = require('fs');

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
        'scripts/vendor/jquery-mobile-bower/jquery.mobile-1.4.5.css',
        'scripts/vendor/leaflet/leaflet.css',
        'scripts/yaga.css'
    ],
    livereload: 35729,
    port: 3000,
    hostname: 'localhost' // '0.0.0.0'
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
                    hostname: project.hostname,
                    base: {
                        path: './',
                        options: {
                            index: 'debug.html',
                            maxAge: 300000
                        }
                    }
                }
            },
            test: {
                options: {
                    keepalive: false,
                    port: project.port,
                    open: true,
                    hostname: project.hostname,
                    base: {
                        path: './',
                        options: {
                            index: 'test/index.html',
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
                    hostname: project.hostname,
                    base: {
                        path: './dist',
                        options: {
                            index: 'index.html',
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
                    out: 'helper/dist.min.js'
                }
            }
        },
        watch: {
            changeJsFiles: {
                files: ['scripts/*.js'],
                options: {
                    livereload: project.livereload
                }
            },
            changeTests: {
                files: ['test/*.js', '!test/tests.js'],
                tasks: ['createTests'],
                options: {
                    livereload: project.livereload
                }
            },
            changeCssFiles: {
                files: project.css,
                options: {
                    livereload: project.livereload
                }
            },
            changeVendorFiles: {
                files: ['scripts/vendor/**'],
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
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: {
                    'dist/yaga.min.css': project.css
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
            tests: ['test/tests.js', 'test/index.html'],
            dist: ['dist', 'helper'],
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
                            host: project.hostname
                        },
                        jsSrc: 'scripts/vendor/requirejs/require.js',
                        amdMain: 'scripts/main.js'
                    }
                },
                files: {
                    'debug.html': 'views/index.jade'
                }
            },
            test: {
                options: {
                    data: {
                        css: ['scripts/vendor/mocha/mocha.css'],
                        livereload: {
                            port: project.livereload,
                            host: project.hostname
                        },
                        jsSrc: 'scripts/vendor/requirejs/require.js',
                        amdMain: 'test/main.js'
                    }
                },
                files: {
                    'test/index.html': 'test/test.jade'
                }
            },
            dist: {
                options: {
                    data: {
                        css: ['yaga.min.css'],
                        livereload: false,
                        manifest: 'yaga.appcache',
                        jsSrc: 'yaga.min.js'
                    }
                },
                files: {
                    'dist/index.html': 'views/index.jade'
                }
            }
        },
        manifest: {
            dist: {
                options: {
                    basePath: './dist',
                    cache: ['yaga.min.js', 'yaga.min.css'],
                    network: [],
                    fallback: [],
                    exclude: [],
                    preferOnline: true,
                    verbose: true,
                    timestamp: false,
                    hash: true,
                    master: ['index.html'],
                    process: function (path) {
                        return path.substring('build/'.length);
                    }
                },
                src: [],
                dest: 'dist/yaga.appcache'
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
                    process: function (path) {
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
        },
        uglify: {
            dist: {
                options: {
                    //sourceMap: true
                },
                files: {
                    'dist/yaga.min.js': ['scripts/vendor/requirejs/require.js', 'helper/dist.min.js']
                }
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
     * Task to minify js files
     * @link https://github.com/gruntjs/grunt-contrib-uglify - Github
     * @requires grunt-contrib-uglify/tasks/uglify.js
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /**
     * Task to generate manifest files
     * @link https://github.com/gunta/grunt-manifest - Github
     * @requires grunt-manifest/tasks/manifest.js
     */
    grunt.loadNpmTasks('grunt-manifest');

    grunt.registerTask('createTests', 'Task to create a working test suite', function () {
        var done, doc, reqStr, tests;
        done = this.async();
        doc = fs.readFileSync('test/tests.js.template').toString();
        reqStr = ", '../";
        tests = [];
        glob('test/*.js', function (err, files) {
            var i;
            if (err) {
                return done(err);
            }
            for (i = 0; i < files.length; i += 1) {
                if (files[i] !== 'test/main.js' && files[i] !== 'test/tests.js') {
                    tests.push(files[i].substr(0, files[i].length - 3));
                }
                console.log(files[i]);
            }
            reqStr += tests.join("', '../");
            reqStr += "'";
            doc = doc.split('/*** Modules here ***/').join(reqStr);
            fs.writeFileSync('test/tests.js', doc);
            return done();
        });
    });

    grunt.registerTask('dist', ['jade:dist', 'requirejs', 'cssmin', 'uglify:dist', 'manifest:dist', 'connect:dist']);
    grunt.registerTask('debug', ['jade:debug', 'connect:debug', 'watch']);
    grunt.registerTask('develop', ['jade:debug', 'connect:debug', 'watch']);
    grunt.registerTask('test', ['jade:test', 'createTests', 'connect:test', 'watch']);
    grunt.registerTask('init', ['bower']);

    grunt.registerTask('default', ['init', 'debug']);
};