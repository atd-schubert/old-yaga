/*globals define, window*/

define('yaga-layer-tree-tool', ['yaga', 'EventEmitter', 'jquery', 'yaga-panel', 'yaga-layer'], function YagaLayerTreeTool(yaga, EventEmitter, $, Panel, Layer) {
    'use strict';
    var LayerTreeTool, ListviewEntry, document;

    document = window.document;

    ListviewEntry = function (opts) {
        var self, $domRoot, appendParts = [];
        self = this;
        this.domRoot = document.createElement('li');
        $domRoot = $(this.domRoot);

        this.domRoot.setAttribute('class', 'yaga-layer-tree-item');
        appendParts = [
            '<span class="ui-li-count">0 - 18</span>',
            '<h2>' + opts.caption + '</h2>',
            '<div>',
            '<span class="ui-btn ui-btn-icon-notext ui-icon-eye ui-btn-inline yaga-btn-deactive"></span>',
            '<span class="ui-btn ui-btn-icon-notext ui-icon-carat-d ui-btn-inline">one layer down</span>',
            '<span class="ui-btn ui-btn-icon-notext ui-icon-carat-u ui-btn-inline">one layer up</span>',
            '<span class="ui-btn ui-btn-icon-notext ui-icon-gear ui-btn-inline yaga-btn-gear">Settings</span>',
            '<input class="yaga-layer-opacity-slider" type="range" name="points" id="points" value="100" min="0" max="100" data-show-value="true">',
            '</div>'
        ];

        if (opts.leaflet.getAttribution()) {
            appendParts.push('<p>' + opts.leaflet.getAttribution() + '</p>');
        }

        $domRoot.append(appendParts.join(''));

        $domRoot.on('change', '.yaga-layer-opacity-slider', function (event) {
            opts.leaflet.setOpacity(parseInt(event.target.value, 10) / 100);
        });
        $domRoot.on('click', '.ui-icon-eye', function (event) {
            var $target = $(event.target);
            if ($target.hasClass('yaga-btn-active')) {
                $target.removeClass('yaga-btn-active');
                opts.hide();
                $target.addClass('yaga-btn-deactive');
            } else {
                $target.removeClass('yaga-btn-deactive');
                opts.show();
                $target.addClass('yaga-btn-active');
            }
        });
        $domRoot.on('click', '.ui-icon-carat-d', function () {
            if (self.domRoot.nextSibling) {
                $(self.domRoot.nextSibling).after(self.domRoot);
            }
        });
        $domRoot.on('click', '.ui-icon-carat-u', function () {
            if (self.domRoot.previousSibling) {
                $(self.domRoot.previousSibling).before(self.domRoot);
            }
        });

        this.refreshZIndex = function () {
            var i, length = this.domRoot.parentNode.childNodes.length;
            for (i = 0; i < length; i += 1) {
                if (this.domRoot.parentNode.childNodes.item(i) === this.domRoot) {
                    return opts.leaflet.setZIndex(length - i);
                }
            }
        };

    };


    LayerTreeTool = function YagaLayerTreeTool(opts) {
        var self, layers, layerName, tmp;
        self = this;
        opts = opts || {};

        if (typeof opts.name === "string") {
            LayerTreeTool.layerTreeTool[opts.name] = this;
        }

        this.domRoot = document.createElement('ul');
        this.domRoot.setAttribute('data-role', 'listview');
        this.domRoot.setAttribute('data-filter', 'true');
        this.domRoot.setAttribute('data-filter-placeholder', 'Layer name');

        if (!opts.hasOwnProperty('layer')) {
            layers = [];
            for (layerName in Layer.layer) {
                tmp = new ListviewEntry(Layer.layer[layerName]);
                this.domRoot.appendChild(tmp.domRoot);
                layers.push(tmp);
            }
        } else {
            layers = opts.layers;
            // TODO: make this fn
        }

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
        this.refreshZIndex = function () {
            var i;
            for (i = 0; i < layers.length; i += 1) {
                layers[i].refreshZIndex();
            }
        };

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.style) {
            this.setStyle(opts.style);
        }
        this.panel = Panel.create({content: this.domRoot, name: opts.name});

        this.panel.on('opened', function () {
            $.mobile.silentScroll(65);
        });


        $(this.domRoot).on('DOMNodeInserted', '.yaga-layer-tree-item', this.refreshZIndex);

        this.refreshZIndex();
    };

    LayerTreeTool.prototype = new EventEmitter();
    LayerTreeTool.layerTreeTool = {};
    LayerTreeTool.yagaExtensionName = 'LayerTreeTool';

    LayerTreeTool.create = function (opts) {
        return new LayerTreeTool(opts);
    };

    yaga.registerExtension(LayerTreeTool);
    return LayerTreeTool;
});