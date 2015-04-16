/*jslint browser: true*/
/*globals window, define, Class */

/**
 * @module yaga-storage-local
 */
define('yaga-storage-local', ['yaga-storage'], function (storageSuperClass) {
    'use strict';
    var StorageLocal;

    /**
     * Basic StorageLocal super class for yaga
     *
     * @alias yaga-storage-local
     * @name StorageLocal
     * @constructor
     * @augments Storage
     * @type {Class}
     */
    StorageLocal = new Class({
        Extends: storageSuperClass,
        initialize: function (opts) {
            StorageLocal.init.call(this, opts);
        },
        loadById: function (id) {
            return this.setData(JSON.parse(window.localStorage.getItem(id)));
        },
        saveById: function (id) {
            window.localStorage.setItem(id, JSON.stringify(this.getData()));
            return this;
        }
    });
    /**
     * Constructor to initialize any StorageLocal object
     * @static
     */
    StorageLocal.init = function (opts) {
        opts = opts || {};
        storageSuperClass.init.call(this, opts);
    };

    /**
     * Assume an object and make a Storage-Object from it
     * @param {Node} domRoot
     * @static
     * @returns {StorageLocal}
     */
    StorageLocal.assume = function (domRoot) {
        return StorageLocal.create({domRoot: domRoot});
    };
    /**
     * Instantiate Storage object by function
     * @static
     * @param opts
     * @returns {StorageLocal}
     */
    StorageLocal.create = function (opts) {
        return new StorageLocal(opts);
    };

    return StorageLocal;
});