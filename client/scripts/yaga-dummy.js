/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-dummy', ['yaga'], function (Yaga) {
    'use strict';
    var Dummy;

    Dummy = new Class({
        Extends: Yaga,
        initialize: function (opts) {
            Dummy.init.call(this, opts);
        },
        functions: function (value) {
            this.emt('functions', value);
            // to something...
            return this;
        },
        obj: null
    });

    Dummy.init = function YagaDummy(opts) {
        var privates;
        opts = opts || {};

        Yaga.init.call(this, opts);

        if (opts.obj) {
            this.functions(opts.obj);
        }
    };
    Dummy.assume = function () {
        throw new Error('not implemented');
    };
    Dummy.create = function (opts) {
        opts = opts || {};
        return new Dummy(opts);
    };

    return Dummy;
});