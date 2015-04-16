/*jslint browser: true*/
/*globals window, define, Class */

/**
 * @module yaga-storage
 */
define('yaga-storage', ['yaga'], function (Yaga) {
    'use strict';
    var Storage;

    /**
     * Basic Storage super class for yaga
     *
     * @alias yaga-storage
     * @name Storage
     * @constructor
     * @augments Yaga
     * @type {Class}
     */
    Storage = new Class({
        Extends: Yaga,
        initialize: function (opts) {
            Storage.init.call(this, opts);
        },
        loadById: function (id) {
            if (!Storage.data[id]) {
                return undefined;
            }
            return this.setData(JSON.parse(Storage.data[id]));
        },
        saveById: function (id) {
            Storage.data[id] = JSON.stringify(this.getData());
            return this;
        },
        getData: function () {
            throw new Error('not implemented');
        },
        setData: function (value) {
            throw new Error('not implemented');
        },
        importFrom: function (handle) {
            var importData = handle.getData();
            this.emit('importFrom', {handle: handle, import: importData, old: this.getData()});
            this.setData(importData);
            return this;
        },
        exportTo: function (handle) {
            var exportData = this.getData();
            this.emit('exportTo', {handle: handle, old: handle.getData(), export: exportData});
            handle.setData(exportData);
            return this;
        }
    });
    /**
     * Constructor to initialize any Storage object
     * @static
     */
    Storage.init = function (opts) {
        var data = '{}';
        Yaga.init.call(this, opts);
        opts = opts || {};

        this.setData = function (value) {
            this.emit('setData', value);
            data = JSON.stringify(value);
            this.emit('changed');
            return this;
        };
        this.getData = function () {
            return JSON.parse(data);
        };

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.data) {
            this.setData(opts.data);
        }
    };

    /**
     * Assume an object and make a Yaga-Object from it
     * @param {Node} domRoot
     * @static
     * @returns {Storage}
     */
    Storage.assume = function (obj) {
        return Storage.create({data: obj});
    };
    /**
     * Instantiate Storage object by function
     * @static
     * @param opts
     * @returns {Storage}
     */
    Storage.create = function (opts) {
        return new Storage(opts);
    };
    Storage.data = {};

    return Storage;
});