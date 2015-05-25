/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-layer-tile', ['yaga-layer', 'leaflet', 'yaga-map'], function (Layer, L, Map) {
    'use strict';
    var TileLayer;

    TileLayer = new Class({
        Extends: Layer,
        getContainer: function () {
            return this.getLeafletElement().getContainer();
        },
        redraw: function () {
            this.emit('redraw');
            this.getLeafletElement().redraw();
            return this;
        },
        getUrl: function () {
            return this.getLeafletElement()._url;
        },
        setUrl: function (value, noRedraw) {
            this.emit('setUrl', value);
            this.getLeafletElement().setUrl(value, noRedraw);
            return this;
        },
        initialize: function (opts) {
            TileLayer.init.call(this, opts);
        },
        getLeafletElement: function () {
            throw new Error('not implemented');
        }
    });

    TileLayer.init = function (opts) {
        var attribution, zIndex, opacity, self, leafletElement;
        self = this;
        opts = opts || {
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            //minZoom: 1,
            //maxZoom: 19,
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            title: 'OpenStreetMap international'
        };
        if (!opts.url) {
            throw new Error('You have to specify an url of an tile-layer');
        }
        opts.caption = opts.caption || opts.name || 'Unknown Tile layer "' + opts.url + '"';

        Layer.init.call(this, opts);

        leafletElement = opts.leaflet ||  new L.TileLayer(opts.url, opts);

        this.getLeafletElement = function () {
            return leafletElement;
        };

        leafletElement.getYagaElement = function () {
            return self;
        };

        leafletElement.getAttribution = function () { // Hack to change attribution
            return attribution;
        };

        this.getAttribution = function () { // Hack to change attribution
            return attribution;
        };
        this.setAttribution = function (value) {
            this.emit('setAttribution', value);
            attribution = value;
            this.redraw();
            return this;
        };
        this.getZIndex = function () { // Hack to get ZIndex
            return zIndex;
        };
        this.setZIndex = function (value) {
            this.emit('setZIndex', value);
            zIndex = value;
            leafletElement.setZIndex(zIndex);
            return this;
        };
        this.getOpacity = function () { // Hack to set opacity
            return opacity;
        };
        this.setOpacity = function (value) {
            this.emit('setOpacity', value);
            opacity = value;
            leafletElement.setOpacity(opacity);
            return this;
        };
        if (opts.attribution) {
            this.setAttribution(opts.attribution);
        }
        if (opts.opacity) {
            this.setOpacity(opts.opacity);
        }
        if (opts.zIndex) {
            this.setZIndex(opts.zIndex);
        }
    };

    TileLayer.create = function (opts) {
        return new TileLayer(opts);
    };
    TileLayer.assume = function (leafletTileLayer) {
        var url, attribution;

        url = leafletTileLayer._url;
        attribution = leafletTileLayer.getAttribution();

        return TileLayer.create({
            leaflet: leafletTileLayer,
            url: url,
            attribution: attribution,
            title: 'Imported Tile-Layer',
            caption: 'Imported Tile-Layer'
        });
    };
    Layer.registerType('tile', TileLayer);

    return TileLayer;
});