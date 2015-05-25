/*jslint browser: true*/
/*globals window, define, Class*/

/**
 * @module yaga-geo-json
 */
define('yaga-geo-json', ['yaga-layer', 'leaflet', 'yaga-map-marker'], function (Layer, L, Marker) {
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
            this.getLeafletElement().addTo(father.getLeafletElement());
        },
        hide: function (father) {
            father = father || this.parent;
            father.getLeafletElement().removeLayer(this.getLeafletElement);
        },
        geoJson: null,
        parent: null,
        getLeafletElement: function () {
            throw new Error('not implemented');
        }
    });
    Feature.init = function (opts) {
        Layer.init.call(this, opts);
        this.getLeafletElement = function () {
            return opts.leaflet;
        };
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
            return this.getLeafletElement().toGeoJSON();
        },
        addData: function (geojson) {
            this.getLeafletElement().addData(geojson);
            return this;
        },
        features: [],
        getLeafletElement: function () {
            throw new Error('not implemented');
        }
    });
    GeoJson.init = function (opts) {
        var attribution, zIndex, opacity, createOpts, self, leafletElement;
        opts = opts || {};
        self = this;

        Layer.init.call(this, opts);

        createOpts = {
            onEachFeature: function (feature, layer) {
                var tmpFeature = Feature.create({leaflet: layer, geoJson: feature, parent: self});
                self.emit('createFeature', {leaflet: layer, geoJson: feature, parent: self, feature: tmpFeature});
                self.features.push(tmpFeature);
                self.emit('changed');
            },
            pointToLayer: function (feature, latlng) {
                var tmpMarker = Marker.create({lat: latlng.lat, lng: latlng.lng});
                self.emit('createMarker', {marker: tmpMarker, feature: feature, latlng: latlng});
                return tmpMarker.getLeafletElement();
            }
        };

        leafletElement = (opts.getLeafletElement === 'function' && opts.getLeafletElement()) || L.geoJson(null, createOpts);

        this.getLeafletElement = function () {
            return leafletElement;
        };

        // Hacks
        leafletElement.getAttribution = function () {
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
    GeoJson.assume = function (leafletGeoJson) { // TODO: not working!
        var rg = GeoJson.create();
        rg.getLeafletElement = function () {
            return leafletGeoJson;
        };
        return rg;
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