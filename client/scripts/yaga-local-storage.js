/*globals define, window*/

define('yaga-local-storage', ['yaga-core', 'EventEmitter'], function YagaLocalStorage(yaga, EventEmitter) {
    'use strict';
    var LocalStorage, readLs, writeLs, lsPrefix, lsDivider, lsInternalDivider;

    lsPrefix = 'yls';
    lsDivider = ':';
    lsInternalDivider = '.';

    readLs = function (storeName, opts) {
        var rg;
        opts = opts || {};
        rg = window.localStorage.getItem(storeName);

        if (!rg && opts.default) {
            writeLs(storeName, opts.default);
            return readLs(storeName, opts);
        }
        try {
            return JSON.parse(rg);
        } catch (e) {
            return {};
        }
    };

    writeLs = function (storeName, data) {
        window.localStorage.setItem(storeName, JSON.stringify(data));
    };


    LocalStorage = function YagaLocalStorage(opts) {
        var self, name;
        self = this;
        opts = opts || {};
        opts.name = opts.name || 'noname';
        name = opts.name;
        opts.data = opts.data || {};

        if (typeof opts.name === "string") {
            LocalStorage.localStorage[opts.name] = this;
        }

        this.data = opts.data;

        this.getName = function () {
            return name;
        };
        this.getPath = function () {
            return lsPrefix + lsDivider + name;
        };
        this.save = function () {
            self.emit('save');
            writeLs(this.getPath(), this.data);
        };
        this.remove = function () {
            LocalStorage.remove(name);
        };
        this.fetch = function () {
            this.data = readLs(this.getPath());
        };


    };
    LocalStorage.prototype = new EventEmitter();
    LocalStorage.localStorage = {};
    LocalStorage.getStore = function (name) {
        return LocalStorage.localStorage[name] || LocalStorage.create({name: name, default: {}});
    };
    LocalStorage.exists = function (name) {
        var storeName = lsPrefix + lsDivider + name;
        return !!window.localStorage.getItem(storeName);
    };
    LocalStorage.clear = function (opts) {
        var hash;
        opts = opts || {};

        if (opts.hard === true) {
            return window.localStorage.clear();
        }
        for (hash in LocalStorage.localStorage) {
            LocalStorage.localStorage[hash].remove();
        }
    };
    LocalStorage.yagaExtensionName = 'LocalStorage';
    LocalStorage.init = function () {
        readLs(lsPrefix + lsInternalDivider + 'stores', {default: []});
    };
    LocalStorage.save = function (opts) {
        var hash, arr = [];
        for (hash in LocalStorage.localStorage) {
            arr.push(hash);
        }
        writeLs(lsPrefix + lsInternalDivider + 'stores', arr);
    };
    LocalStorage.fetch = function (opts) {
        var arr, i, tmp;
        arr = readLs(lsPrefix + lsInternalDivider + 'stores', {default: []});

        for (i = 0; i < arr.length; i += 1) {
            tmp = LocalStorage.getStore(arr[i]);
            tmp.fetch();
        }
        return true;
    };

    LocalStorage.create = function (opts) {
        var ls = new LocalStorage(opts);
        this.save();
        return ls;
    };
    LocalStorage.remove = function (name) {
        var entry = LocalStorage.getStore(name);
        window.localStorage.removeItem(entry.getPath());
        delete LocalStorage.localStorage[name];
        return true;
    };

    LocalStorage.fetch();

    yaga.registerExtension(LocalStorage);
    return LocalStorage;
});