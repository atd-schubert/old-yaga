/*jslint browser: true*/
/*globals window, define, Class*/

/**
 * GeoJSON data like described here: http://geojson.org/
 * @name geojson
 * @type {{}}
 */


define('yaga-geo-json', ['yaga-layer', 'leaflet', 'yaga-map-marker'], function (YagaLayer, L, Marker) {
    'use strict';
    var YagaGeoJson, YagaGeoJsonFeature;

    /**
     * Yaga elenemt for features in geoJSON
     * @constructor
     * @name YagaGeoJsonFeature
     */
    YagaGeoJsonFeature = new Class({
        Extends: YagaLayer,
        initialize: function (opts) {
            YagaGeoJsonFeature.init.call(this, opts);
        },
        /**
         * @memberOf YagaGeoJsonFeature
         * @returns {geojson}
         */
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
    YagaGeoJsonFeature.init = function (opts) {
        YagaLayer.init.call(this, opts);
        this.leaflet = opts.leaflet;
        this.geoJson = opts.geoJson;
        this.parent = opts.parent;
    };
    YagaGeoJsonFeature.create = function (opts) {
        return new YagaGeoJsonFeature(opts);
    };

    /**
     *
     * @class YagaGeoJson
     * @constructor
     * @augments YagaLayer
     * @alias module:yaga-geo-json
     */
    YagaGeoJson = new Class({
        Extends: YagaLayer,
        initialize: function (opts) {
            YagaGeoJson.init.call(this, opts);
        },
        /**
         * @memberOf YagaLayer#
         * @returns {geojson}
         */
        toGeoJSON: function () {
            return this.leaflet.toGeoJSON();
        },
        /**
         * Add GeoJSON data to yaga-element
         * @param {geojson} geojson - Data to add in geojson format
         * @returns {YagaGeoJson}
         */
        addData: function (geojson) {
            this.leaflet.addData(geojson);
            return this;
        },
        features: []
    });
    /**
     *
     * @param {{}} [opts]
     * @param {string} [opts.attribution] - Attribution of layer
     */
    YagaGeoJson.init = function (opts) {
        var attribution, zIndex, opacity, createOpts, self;
        opts = opts || {};
        self = this;

        YagaLayer.init.call(this, opts);

        createOpts = {
            onEachFeature: function (feature, layer) {
                var tmpFeature = YagaGeoJsonFeature.create({leaflet: layer, geoJson: feature, parent: self});
                self.emit('createFeature', {leaflet: layer, geoJson: feature, parent: self, feature: tmpFeature});
                self.features.push(tmpFeature);
                self.emit('changed');
            },
            pointToLayer: function (feature, latlng) {
                var tmpMarker = Marker.create({lat: latlng.lat, lng: latlng.lng});
                self.emit('createMarker', {marker: tmpMarker, feature: feature, latlng: latlng});
                return tmpMarker.leaflet;
            }
        };

        this.leaflet = opts.leaflet || L.geoJson(null, createOpts);

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
        if (opts.data) {
            this.addData(opts.data);
        }
    };
    YagaGeoJson.assume = function (leafletGeoJson) { // TODO: not working!
        var rg = YagaGeoJson.create();
        rg.leaflet = leafletGeoJson;
        return rg;
    };
    YagaGeoJson.create = function (opts) {
        return new YagaGeoJson(opts);
    };
    YagaGeoJson.Feature = Feature;
    YagaLayer.registerType('geojson', YagaGeoJson);
    YagaLayer.registerType('Feature', YagaGeoJson);
    YagaLayer.registerType('FeatureCollection', YagaGeoJson);

    return YagaGeoJson;
});

/**
 *
 * @module yaga-geo-json
 * @returns YagaGeoJson
 */