/*globals define, window*/

define('yaga-localstorage-tile-layer', ['yaga', 'EventEmitter', 'leaflet'], function YagaTileLayer(yaga, EventEmitter, L) {
    'use strict';



    return;
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
            throw new Error('You have to specify an url of an localstorage-tile-layer');
        }
        opts.caption = opts.caption || opts.name || 'Unknown Tile layer "' + opts.url + '"';

        if (typeof opts.name === "string") {
            TileLayer.tileLayer[opts.name] = this;
        }

        this.caption = opts.caption;
        this.leaflet = new L.TileLayer(opts.url, opts);

        // pipe events
        this.leaflet.on('loading', function (event) {
            self.emit('loading', event);
        });
        this.leaflet.on('load', function (event) {
            self.emit('load', event);
        });
        this.leaflet.on('tileloadstart', function (event) {
            self.emit('tileloadstart', event);
        });
        this.leaflet.on('tileload', function (event) {
            self.emit('tileload', event);
        });
        this.leaflet.on('tileunload', function (event) {
            self.emit('tileunload', event);
        });

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

    yaga.registerExtension(TileLayer);
    return TileLayer;
});