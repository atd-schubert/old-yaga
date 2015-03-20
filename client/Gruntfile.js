/*jslint node: true */
'use strict';

/**
 * This is the basic Gruntfile for Wheregroup PHP projects.
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
 * Task-runner for wheregroup php projects
 * @param {grunt} grunt
 */
module.exports = function wheregroupTaskRunner(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            client: {
                options: {
                    keepalive: true,
                    port: 3000,
                    open: true,
                    hostname: '*',
                    base: {
                        path: './',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            },
            dist: {
                options: {
                    keepalive: true,
                    port: 3000,
                    open: true,
                    hostname: '192.168.0.126',
                    base: {
                        path: './',
                        options: {
                            index: 'dist.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'app',
                    baseUrl: 'scripts',
                    mainConfigFile: 'scripts/main.js',
                    out: 'scripts/yaga-compiled.js'
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

    grunt.registerTask('show-dist', ['requirejs', 'connect:dist']);
    grunt.registerTask('default', ['connect:client']);
};