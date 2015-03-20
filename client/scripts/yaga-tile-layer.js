/*globals define, window*/

define('yaga-tile-layer', ['yaga-core', 'EventEmitter', 'leaflet', 'yaga-layer'], function YagaTileLayer(yaga, EventEmitter, L, Layer) {
    'use strict';
    var TileLayer;

    TileLayer = function YagaTileLayer(opts) {
        var self;
        self = this;
        opts = opts || {
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            minZoom: 8,
            maxZoom: 12,
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            name: 'OSM',
            caption: 'OpenStreetMap international'
        };

        if (!opts.url) {
            throw new Error('You have to specify an url of an tile-layer');
        }
        opts.caption = opts.caption || opts.name || 'Unknown Tile layer "' + opts.url + '"';

        if (typeof opts.name === "string") {
            TileLayer.tileLayer[opts.name] = this;
        }

        this.caption = opts.caption;
        this.leaflet = new L.TileLayer(opts.url, opts);

        this.setOpacity = function (value) {
            this.leaflet.setOpacity(value);
            return this;
        };

        this.show = function (res) {
            res = res || yaga.Map.activeMap;
            if (!res) {
                return;
            }
            this.emit('show', res);
            this.leaflet.addTo(res.leaflet);
        };
        this.hide = function (res) {
            res = res || yaga.Map.activeMap;
            if (!res) {
                return;
            }
            this.emit('hide', res);
            res.leaflet.removeLayer(this.leaflet);
        };
    };
    TileLayer.prototype = new EventEmitter();
    TileLayer.tileLayer = {};
    TileLayer.yagaExtensionName = 'TileLayer';

    TileLayer.create = function (opts) {
        return new TileLayer(opts);
    };

    Layer.registerLayerType(TileLayer);
    return TileLayer;
});