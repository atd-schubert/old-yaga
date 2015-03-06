/*globals define, window*/

define('yaga-layer-tree', ['yaga', 'EventEmitter', 'jquery', 'leaflet', 'jqueryMobile'], function YagaLayerTree(yaga, EventEmitter, $, L) {
    'use strict';
    var LayerTree, document;

    document = window.document;

    LayerTree = function YagaLayerTree(opts) {
        var self;
        self = this;
        opts = opts || {};
        opts.content = opts.content || 'Test';

        if (typeof opts.name === "string") {
            LayerTree.dummies[opts.name] = this;
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
            //this.dummy(); // make a resize or something else
        });

        document.body.appendChild(this.domRoot);
    };
    LayerTree.prototype = new EventEmitter();
    LayerTree.dummies = {};
    LayerTree.name = 'LayerTree';

    LayerTree.create = function (opts) {
        return new LayerTree(opts);
    };

    yaga.registerExtension('LayerTree', LayerTree);
    return LayerTree;
});