/*jslint browser: true*/
/*globals window, define, Class*/

/**
 * @module yaga-geo-json
 */
define('yaga-geo-json', ['yaga-layer', 'leaflet'], function (Layer, L) {
    'use strict';
    var GeoJson, Feature;

    /**
     * @name Feature
     * @constructor
     * @type {Class}
     */
    Feature = new Class({
        Extends: Layer,
        initialize: function (opts) {
            Feature.init.call(this, opts);
        },
        toGeoJson: function () {
            this.layer.toGeoJSON();
        },
        show: function (father) {
            father = father || this.parent;
            this.leaflet.addTo(father.leaflet);
        },
        hide: function (father) {
            father = father || this.parent;
            father.leaflet.removeLayer(this.leaflet);
        },
        geoJson: null,
        parent: null
    });
    Feature.init = function (opts) {
        Layer.init.call(this, opts);
        this.leaflet = opts.leaflet;
        this.geoJson = opts.geoJson;
        this.parent = opts.parent;
    };
    Feature.create = function (opts) {
        return new Feature(opts);
    };

    GeoJson = new Class({
        Extends: Layer,
        initialize: function (opts) {
            GeoJson.init.call(this, opts);
        },
        toGeoJSON: function () {
            return this.leaflet.toGeoJSON();
        },
        features: []
    });
    GeoJson.init = function (opts) {
        var attribution, zIndex, opacity, createOpts, self;
        opts = opts || {};
        self = this;

        Layer.init.call(this, opts);

        createOpts = {
            onEachFeature: function (feature, layer) {
                self.emit('createFeature', {leaflet: layer, geoJson: feature, parent: self});
                self.features.push(Feature.create({leaflet: layer, geoJson: feature, parent: self}));
                self.emit('changed');
            }
        };

        this.leaflet = opts.leaflet || L.geoJson(opts, createOpts);

        // Hacks
        this.leaflet.getAttribution = function () {
            return attribution;
        };
        this.getAttribution = function () { // Hack to change attribution
            return attribution;
        };
        this.setAttribution = function (value) {
            this.emit('setAttribution', value);
            attribution = value;
            return this;
        };
        this.getZIndex = function () { // Hack to get ZIndex
            throw new Error('not implemented');
        };
        this.setZIndex = function (value) {
            this.emit('setZIndex', value);
            throw new Error('not implemented');
        };
        this.getOpacity = function () { // Hack to set opacity
            return opacity;
        };
        this.setOpacity = function (value) {
            this.emit('setOpacity', value);
            opacity = value;
            this.leaflet.setOpacity(opacity);
            throw new Error('not implemented'); // TODO:
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
    GeoJson.assume = function (geojson) {
        GeoJson.create(geojson);
    };
    GeoJson.create = function (opts) {
        return new GeoJson(opts);
    };
    GeoJson.Feature = Feature;
    Layer.registerType('geojson', GeoJson);
    Layer.registerType('Feature', GeoJson);
    Layer.registerType('FeatureCollection', GeoJson);

    return GeoJson;
});