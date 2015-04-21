/*globals window, define, Class*/

/**
 * @module yaga-map-marker
 * @todo create module!!!
 */
define('yaga-map-marker', ['yaga', 'leaflet', 'yaga-map', 'yaga-map-icon'], function (Yaga, L, Map, Icon) {
    'use strict';
    var MapMarker;
    /**
     * @name MapMarker
     * @alias yaga-map-marker
     * @augments Yaga
     * @constructor
     * @type {Class}
     */
    MapMarker = new Class({
        Extends: Yaga,

        /**
         * Show marker on active or specified map
         * @type function
         * @param {Map} [map]
         * @returns {MapMarker}
         */
        show: function showMarker(map) {
            this.emit('show');
            map = map || Map.activeMap;
            if (map) {
                this.leaflet.addTo(map.leaflet);
                this.emit('changed');
            } else {
                window.console.error('No map to show marker!');
            }
            return this;
        },
        /**
         * Hide marker on active or specified map
         * @type function
         * @param {Map} [map]
         * @returns {MapMarker}
         */
        hide: function hideMarker(map) {
            this.emit('hide');
            map = map || Map.activeMap;
            if (map) {
                map.leaflet.removeLayer(this.leaflet);
                this.emit('changed');
            } else {
                window.console.error('No map to hide marker from!');
            }
            return this;
        },
        setLat: function (value) {
            this.emit('setLat', value);
            return this.setLatLng({
                lat: value,
                lng: this.getLng()
            });
        },
        getLat: function () {
            return this.getLatLng().lat;
        },
        setLng: function (value) {
            this.emit('setLng', value);
            return this.setLatLng({
                lat: this.getLat(),
                lng: value
            });
        },
        getLng: function () {
            return this.getLatLng().lng;
        },
        setLatLng: function (value) {
            this.emit('setLatLng', value);
            this.leaflet.setLatLng(value);
            this.emit('changed');
            return this;
        },
        getLatLng: function () {
            return this.leaflet.getLatLng();
        },
        setIcon: function (value) {
            this.emit('setIcon', value);
            if (!Icon.isPrototypeOf(value)) {
                value = Icon.create(value);
            }
            this.icon = icon;
            this.emit('changed');
            return this;
        },
        getIcon: function () {
            return this.icon;
        },
        bindPopup: function (popup) {
            this.emit('bindPopup', popup);
            this.leaflet.bindPopup(popup.leaflet);
            return this;
        },
        bindPanel: function (panel) {
            this.emit('bindPanel', panel);
            this.leaflet.on('click', function () {
                panel.open();
            });
            return this;
        },
        leaflet: null,
        icon: null,
        initialize: function (opts) {
            MapMarker.init.call(this, opts);
        }
    });

    /**
     * Function to initialize any Yaga object
     * @static
     */
    MapMarker.init = function (opts) {
        opts = opts || {};

        opts.lat = opts.lat || 0;
        opts.lng = opts.lng || 0;

        if (Icon.isPrototypeOf(opts.icon)) {
            this.icon = opts.icon;
        } else {
            this.icon = Icon.create(opts.icon);
        }
        opts.icon = this.icon.leaflet;

        Yaga.init.call(this, opts);

        this.leaflet = L.marker([opts.lat, opts.lng], opts);
        //this.leaflet.setIcon()
    };
    /**
     * Assume a leaflet marker and make a Yaga-Object from it
     * @param {{}} leafletMarker - The original object that should be extended
     * @static
     * @returns {MapMarker}
     */

    MapMarker.assume = function (leafletMarker) {
        var obj;
        obj = MapMarker.create();
        obj.leaflet = leafletMarker;
        return obj;
    };
    /**
     * Instantiate Marker object by function
     * @static
     * @param opts
     * @returns {MapMarker}
     */
    MapMarker.create = function (opts) {
        return new MapMarker(opts);
    };

    return MapMarker;
});