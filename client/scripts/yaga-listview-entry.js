/*globals define, window*/

define('yaga-listview-entry', ['yaga', 'EventEmitter', 'jquery', 'leaflet', 'jqueryMobile'], function YagaListviewEntry(yaga, EventEmitter, $, L) {
    'use strict';
    var ListviewEntry, document;

    document = window.document;

    ListviewEntry = function YagaListviewEntry(opts) {
        var self, caption, icon;
        self = this;
        opts = opts || {};
        opts.caption = opts.caption || 'List entry';

        if (typeof opts.name === "string") {
            ListviewEntry.listviewEntry[opts.name] = this;
        }

        this.domRoot = document.createElement('li');
        caption = document.createElement('span');
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
        this.setIcon = function (value) {};
        this.setThumbnail = function (value) {};
        this.setLinked = function (value) {};
        this.setCaption = function (value) {};
        this.setContent = function (value) {}; // Everything within a <p>
        this.setAside = function (value) {};
        this.setTheme = function (value) {};
        this.setListDivider = function (value) {};
        this.setCount = function (value) {};

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.style) {
            this.setStyle(opts.style);
        }

        $(document).on('DOMNodeInserted', this.domRoot, function () {
        });

        document.body.appendChild(this.domRoot);
    };
    ListviewEntry.prototype = new EventEmitter();
    ListviewEntry.listviewEntry = {};
    ListviewEntry.listviewEntries = [];
    ListviewEntry.yagaExtensionName = 'ListviewEntry';

    ListviewEntry.create = function (opts) {
        return new ListviewEntry(opts);
    };

    yaga.registerExtension(ListviewEntry);
    return ListviewEntry;
});