/*globals define, window*/

define('yaga-dummy', ['yaga', 'EventEmitter', 'jquery', 'leaflet', 'jqueryMobile'], function YagaDummy(yaga, EventEmitter, $, L) {
    'use strict';
    var Dummy, document;

    document = window.document;

    Dummy = function YagaDummy(opts) {
        var self;
        self = this;
        opts = opts || {};
        opts.content = opts.content || 'Test';

        if (typeof opts.name === "string") {
            Dummy.dummy[opts.name] = this;
        }

        this.domRoot = document.createElement('div');
        this.domRoot.appendChild(document.createTextNode(opts.content));
        this.domRoot._yagaExtension = this;

        this.setId = function (value) {
            this.emit('setId', value);
            this.domRoot.setAttribute('id', value);
            return this;
        };
        this.getId = function () {
            this.domRoot.getAttribute('id');
            return this;
        };

        this.setStyle = function (value) {
            this.emit('setStyle', value);
            this.domRoot.setAttribute('style', value);
            return this;
        };
        this.getStyle = function () {
            this.domRoot.getAttribute('style');
            return this;
        };

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.style) {
            this.setStyle(opts.style);
        }

        $(document).on('DOMNodeInserted', this.domRoot, function () {
            this.dummy(); // make a resize or something else
        });

        document.body.appendChild(this.domRoot);
    };
    Dummy.prototype = new EventEmitter();
    Dummy.dummy = {};
    Dummy.yagaExtensionName = 'Dummy';

    Dummy.create = function (opts) {
        return new Dummy(opts);
    };

    yaga.registerExtension(Dummy);
    return Dummy;
});