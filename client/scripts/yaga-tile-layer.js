/*globals define, window*/
define('yaga-layer-tree-panel', ['jquery', 'leaflet', 'EventEmitter', 'underscore'], function ($, L, EventEmitter, _) {
    'use strict';
    var TileLayer, tiles;
    TileLayer = function (url, opts) {
        if (!opts.name) {
            throw new Error('Your tile layer has to have a name in options');
        }
        _.extend(this, L.tileLayer(url, opts));

        this.show = function () {
            this.addTo(yaga.map);
            this.displayed = true;
        };

        this.hide = function () {
            yaga.map.removeLayer(this);
            this.displayed = false;
        };

    };

    TileLayer.prototype = new EventEmitter();

    TileLayer.create = function () {
        return new TileLayer(url, opts);


        var tile = L.tileLayer(url, opts);
        if (!opts.name) {
            throw new Error('Your tile layer has to have a name in options');
        }
        tile.name = opts.name;
        tile.caption = opts.caption;
        tile.displayed = false;

        tile.show = function () {
            this.addTo(yaga.map);
            this.displayed = true;
        };
        tile.hide = function () {
        };

        tileLayers[opts.name] = tile;
        return tile;
    };

    return tileLayer;
});