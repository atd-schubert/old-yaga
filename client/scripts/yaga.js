/*jslint browser: true*/
/*global define, Class*/

/**
 * EventEmitter for Javascript
 * @name EventEmitter
 * @property {function} $caller
 * @property {function} caller
 * @property {function} initialize
 * @property {function} $constructor
 * @property {{}} parent
 * @property {function} getListeners
 * @property {function} flattenListeners
 * @property {function} getListenersAsObject
 * @property {function} addListener
 * @property {function} on
 * @property {function} addOnceListener
 * @property {function} once
 * @property {function} defineEvent
 * @property {function} defineEvents
 * @property {function} removeListener
 * @property {function} off
 * @property {function} addListeners
 * @property {function} removeListeners
 * @property {function} manipulateListeners
 * @property {function} removeEvent
 * @property {function} removeAllListeners
 * @property {function} emitEvent
 * @property {function} trigger
 * @property {function} emit
 * @property {function} setOnceReturnValue
 */

/**
 * Basic Yaga object
 *
 * @module yaga
 */
define('yaga', ['EventEmitter', 'mootools'], function (EventEmitter) {
    'use strict';

    var Yaga;

    /**
     * Basic Yaga Object with EventEmitter support
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
        return obj;
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