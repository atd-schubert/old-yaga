/*jslint browser: true*/
/*globals window, define, Class*/
/**
 *
 */
define('yaga-map-icon', ['yaga', 'leaflet'], function (Yaga, L) {
    'use strict';
    var MapIcon;
    MapIcon = new Class({
        Extends: Yaga,
        /**
         * set icon class
         * @param {String} value
         * @returns {MapIcon}
         */
        setClassName: function setIconClassName(value) {
            this.emit('setClassName', value);
            this.leaflet.className = value;
            this.emit('changed');
            return this;
        },
        /**
         * get icon class
         * @returns {string}
         */
        getClassName: function getIconClassName() {
            return this.leaflet.className;
        },
        /**
         * Set anchor
         * @param {L.Icon.Default.options.iconAnchor|*|o.Icon.Default.options.iconAnchor|number[]} value
         * @returns {MapIcon}
         */
        setAnchor: function setIconAnchor(value) {
            this.emit('setAnchor', value);
            this.leaflet.iconAnchor = value;
            this.emit('changed');
            return this;
        },
        /**
         *
         * @returns {L.Icon.Default.options.iconAnchor|*|o.Icon.Default.options.iconAnchor|number[]}
         */
        getAnchor: function getIconAnchor() {
            return this.leaflet.iconAnchor;
        },
        /**
         * Set retina URL
         * @param {string} value
         * @returns {MapIcon}
         */
        setRetinaUrl: function setIconRetinaUrl(value) {
            this.emit('setRetinaUrl', value);
            this.leaflet.iconRetinaUrl = value;
            this.emit('changed');
            return this;
        },
        /**
         * Get retina url
         * @returns {string}
         */
        getRetinaUrl: function getIconRetinaUrl() {
            return this.leaflet.iconRetinaUrl;
        },
        /**
         * Set display size of icon
         * @param {L.Icon.Default.options.iconSize|*|L.DivIcon.options.iconSize|o.DivIcon.options.iconSize|o.Icon.Default.options.iconSize} value
         * @returns {MapIcon}
         */
        setSize: function setIconSize(value) {
            this.emit('setSize', value);
            this.leaflet.iconSize = value;
            this.emit('changed');
            return this;
        },
        /**
         *
         * @returns {L.Icon.Default.options.iconSize|*|L.DivIcon.options.iconSize|o.DivIcon.options.iconSize|o.Icon.Default.options.iconSize}
         */
        getSize: function getIconSize() {
            return this.leaflet.iconSize;
        },
        /**
         * Set URL of icon
         * @param {string} value
         * @returns {MapIcon}
         */
        setUrl: function setIconUrl(value) {
            this.emit('setUrl', value);
            this.leaflet.iconUrl = value;
            this.emit('changed');
            return this;
        },
        /**
         * Get URL of an icon
         * @returns {string|*}
         */
        getUrl: function getIconUrl() {
            return this.leaflet.iconUrl;
        },
        /**
         * Set anchor position for popups
         * @param {L.Icon.Default.options.popupAnchor|*|o.Icon.Default.options.popupAnchor} value
         * @returns {MapIcon}
         */
        setPopupAnchor: function setIconPopupAnchor(value) {
            this.emit('setPopupAnchor', value);
            this.leaflet.popupAnchor = value;
            this.emit('changed');
            return this;
        },
        /**
         * Get popup anchor of an icon
         * @returns {L.Icon.Default.options.popupAnchor|*|o.Icon.Default.options.popupAnchor}
         */
        getPopupAnchor: function getIconPopupAnchor() {
            return this.leaflet.popupAnchor;
        },
        /**
         * Set anchor position of the shadow
         * @param {L.Icon.Default.options.iconAnchor|*|o.Icon.Default.options.iconAnchor|number[]} value
         * @returns {MapIcon}
         */
        setShadowAnchor: function getIconPopupAnchor(value) {
            this.emit('setShadowAnchor', value);
            this.leaflet.shadowAnchor = value;
            this.emit('changed');
            return this;
        },
        /**
         * Get the anchor position of shadow
         * @returns {L.Icon.Default.options.iconAnchor|*|o.Icon.Default.options.iconAnchor|number[]}
         */
        getShadowAnchor: function getIconShadowAnchor() {
            return this.leaflet.shadowAnchor;
        },
        /**
         * Set shadow URL for retina devices
         * @param {string} value
         * @returns {MapIcon}
         */
        setShadowRetinaUrl: function setIconShadowRetinaUrl(value) {
            this.emit('setShadowRetinaUrl', value);
            this.leaflet.shadowRetinaUrl = value;
            this.emit('changed');
            return this;
        },
        /**
         * Get shadow url for retina devices
         * @returns {string}
         */
        getShadowRetinaUrl: function getIconShadowRetinaUrl() {
            return this.leaflet.shadowRetinaUrl;
        },
        /**
         * Set size of shadow
         * @param {L.Icon.Default.options.shadowSize|*|o.Icon.Default.options.shadowSize} value
         * @returns {MapIcon}
         */
        setShadowSize: function getIconShadowRetinaUrl(value) {
            this.emit('setShadowSize', value);
            this.leaflet.shadowSize = value;
            this.emit('changed');
            return this;
        },
        /**
         * Get size of shadow
         * @returns {L.Icon.Default.options.shadowSize|*|o.Icon.Default.options.shadowSize}
         */
        getShadowSize: function getIconShadowSize() {
            return this.leaflet.shadowSize;
        },
        /**
         * Set shadow URL
         * @param {string} value
         * @returns {MapIcon}
         */
        setShadowUrl: function setIconShadowUrl(value) {
            this.emit('setShadowUrl', value);
            this.leaflet.shadowUrl = value;
            this.emit('changed');
            return this;
        },
        /**
         * get shadow URL
         * @returns {string}
         */
        getShadowUrl: function getIconShadowUrl() {
            return this.leaflet.shadowUrl;
        },
        initialize: function initializeIcon(opts) {
            MapIcon.init.call(this, opts);
        }
    });
    MapIcon.init = function (opts) {
        opts = opts || {};

        opts.options = opts.options || {};

        Yaga.init.call(this, opts);

        if (opts.shadowUrl) {
            this.setShadowUrl(opts.shadowUrl);
        }
        if (opts.shadowUrl) {
            this.setShadowUrl(opts.shadowUrl);
        }

        this.leaflet = L.icon(opts);
        this.leaflet.yagaElement = this;
    };
    MapIcon.assume = function (leafletIcon) {
        if (MapIcon.isPrototypeOf(leafletIcon.yagaElement)) {
            return leafletIcon.yagaElement;
        }
        var obj;
        obj = MapIcon.create();
        obj.leaflet = leafletIcon;
        obj.leaflet.yagaElement = obj;
        return obj;
    };
    MapIcon.create = function (opts) {
        return new MapIcon(opts);
    };

    return MapIcon;
});