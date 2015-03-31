/*jslint browser: true*/
/*global define, Class*/

/**
 * Basic Yaga object
 *
 * @module yaga
 */
define('yaga', ['EventEmitter', 'mootools'], function (EventEmitter) {
    'use strict';

    var Yaga;

    /**
     *
     * @alias yaga
     * @name Yaga
     * @constructor
     * @augments EventEmitter
     * @type {Class}
     */
    Yaga = new Class({
        Extends: EventEmitter,
        initialize: function (opts) {
            Yaga.init.call(this, opts);
        }
    });

    /**
     * Function to initialize any Yaga object
     * @static
     */
    Yaga.init = function () {};

    /**
     * Assume an object and make a Yaga-Object from it
     * @param {{}} original - The original object that should be extended
     * @static
     * @returns Yaga
     */
    Yaga.assume = function (original) {
        var obj, hash;
        obj = Yaga.create();
        for (hash in original) {
            if (hash !== 'prototype') {
                obj[hash] = original[hash];
            }
        }
    };
    /**
     * Instantiate Yaga object by function
     * @static
     * @param opts
     * @returns {Yaga}
     */
    Yaga.create = function (opts) {
        return new Yaga(opts);
    };
    return Yaga;
});