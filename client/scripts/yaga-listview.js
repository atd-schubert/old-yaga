/*globals define, window*/

define('yaga-listview', ['yaga', 'EventEmitter', 'jquery', 'leaflet', 'jqueryMobile'], function YagaListview(yaga, EventEmitter, $, L) {
    'use strict';
    var Listview, document;

    document = window.document;

    Listview = function YagaListview(opts) {
        var self;
        self = this;
        opts = opts || {};
        opts.content = opts.content || 'Test';

        if (typeof opts.name === "string") {
            Listview.listview[opts.name] = this;
        }

        this.domRoot = document.createElement('div');
        this.domRoot.setAttribute('data-role', 'listview');
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

        // collapsible, inset
        this.addEntry = function (entry) {

        };
        this.removeEntry = function (entry) {

        };

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.style) {
            this.setStyle(opts.style);
        }

        $(document).on('DOMNodeInserted', this.domRoot, function () {
            self.domRoot.listview('refresh'); // make a resize or something else
        });

        document.body.appendChild(this.domRoot);
    };
    Listview.prototype = new EventEmitter();
    Listview.listview = {};
    Listview.yagaExtensionName = 'Listview';

    Listview.create = function (opts) {
        return new Listview(opts);
    };

    yaga.registerExtension(Listview);
    return Listview;
});