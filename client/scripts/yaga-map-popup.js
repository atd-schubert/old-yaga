/*globals window, define, Class*/

/**
 * LatLng object with two numbers
 * @name LatLng
 * @type {{}}
 * @property number lat
 * @property number lng
 * @property function equals
 * @property function toString
 * @property function distanceTo
 */

/**
 * Yaga class for leaflet popups
 *
 * @module yaga-map-popup
 */
define('yaga-map-popup', ['yaga-ui', 'leaflet', 'yaga-map'], function (UI, L, Map) {
    'use strict';
    var MapPopup;
    /**
     * @name MapPopup
     * @alias yaga-map-popup
     * @augments UI
     * @constructor
     * @type {Class}
     */
    MapPopup = new Class({
        Extends: UI,
        /**
         * Change the position on map
         * @type function
         * @param {Number[]} latlng - latlng
         * @returns {MapPopup}
         */
        setLatLng: function setPopupLatLng(latlng) {
            this.emit('setLatLng', latlng);
            this.leaflet.setLatLng(latlng);
            this.emit('changed');
            return this;
        },
        /**
         * Get the position on map
         * @type function
         * @returns {LatLng}
         */
        getLatLng: function getPopupLatLng() {
            return this.leaflet.getLatLng();
        },
        /**
         * Open the popup on active or specified map
         * @type function
         * @param {Map} [map]
         * @returns {MapPopup}
         */
        open: function openPopup(map) {
            this.emit('open');
            map = map || Map.activeMap;
            this.leaflet.openOn(map.leaflet);
            this.emit('changed');
            return this;
        },
        /**
         * Open the popup on active or specified map
         * @type function
         * @param {Map} [map]
         * @returns {MapPopup}
         */
        close: function closePopup(map) {
            this.emit('close');
            map = map || Map.activeMap;
            map.leaflet.removeLayer(this.leaflet);
            this.emit('changed');
            return this;
        },
        /**
         * @type {{}}
         */
        leaflet: null,
        initialize: function (opts) {
            MapPopup.init.call(this, opts);
        }
    });
    MapPopup.init = function (opts) {
        opts = opts || {};
        opts.latlng = opts.latlng || [0, 0];

        UI.init.call(this, opts);

        this.leaflet = L.popup(this.domRoot, opts.leaflet);
        this.leaflet.yagaElement = this;
        this.leaflet.setContent(this.domRoot);

        if (opts.content) {
            this.setContent(opts.content);
        }
        if (opts.latlng) {
            this.setLatLng(opts.latlng);
        }
    };
    MapPopup.assume = function (leafletPopup) {
        var obj;
        obj = MapPopup.create();
        obj.leaflet = leafletPopup;
        return obj;
    };
    /**
     * Instantiate a popup from leaflet object
     * @static
     * @param opts
     * @returns {MapPopup}
     */
    MapPopup.create = function (opts) {
        return new MapPopup(opts);
    };

    return MapPopup;
});