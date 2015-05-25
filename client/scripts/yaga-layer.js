/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-layer', ['yaga', 'yaga-map'], function (Yaga, Map) {
    'use strict';
    var Layer;

    /**
     * @name YagaLayer
     * @augments Yaga
     * @alias module:yaga-layer
     * @type {Class}
     */
    YagaLayer = new Class({
        Extends: Yaga,
        initialize: function (opts) {
            YagaLayer.init.call(this, opts);
        },
        /**
         * Get attribution of a layer
         * @methodOf YagaLayer#
         * @returns {string}
         */
        getAttribution: function () {
            throw new Error('not implemented');
        },
        /**
         * Set attribution of a layer
         * @methodOf YagaLayer#
         * @param {string} value
         * @returns {YagaLayer}
         */
        setAttribution: function (value) {
            throw new Error('not implemented');
        },
        getCaption: function () {
            throw new Error('not implemented');
        },
        setCaption: function () {
            throw new Error('not implemented');
        },
        getContainer: function () {
            throw new Error('not implemented');
        },
        redraw: function () {
            throw new Error('not implemented');
        },
        getProjection: function () {
            throw new Error('not implemented');
        },
        setProjection: function () {
            throw new Error('not implemented');
        },
        getTitle: function () {
            throw new Error('not implemented');
        },
        setTitle: function () {
            throw new Error('not implemented');
        },
        getZIndex: function () {
            throw new Error('not implemented');
        },
        setZIndex: function () {
            throw new Error('not implemented');
        },
        getOpacity: function () {
            throw new Error('not implemented');
        },
        setOpacity: function () {
            throw new Error('not implemented');
        },
        show: function (map) {
            map = map || Map.activeMap;
            this.emit('show', map);
            if (!map) {
                throw new Error('No map to show layer');
            }
            this.leaflet.addTo(map.leaflet);
        },
        hide: function (map) {
            map = map || Map.activeMap;
            this.emit('hide', map);
            if (!map) {
                throw new Error('No map to hide layer from');
            }
            map.leaflet.removeYagaLayer(this.leaflet);
        },
        leaflet: null
    });

    YagaLayer.init = function YagaLayer(opts) {
        var title, caption;
        opts = opts || {};

        Yaga.init.call(this, opts);

        this.getTitle = function () {
            return title;
        };
        this.setTitle = function (value) {
            this.emit('setTitle');
            title = value;
            return this;
        };

        this.getCaption = function () {
            return caption;
        };
        this.setCaption = function (value) {
            this.emit('setCaption');
            caption = value;
            return this;
        };

        if (opts.caption) {
            this.setCaption(opts.caption);
        }
        if (opts.title) {
            this.setTitle(opts.title);
        }
    };
    YagaLayer.assume = function () {
        throw new Error('not implemented');
    };
    YagaLayer.types = {};
    YagaLayer.registerType = function (name, layerType) {
        YagaLayer.types[name] = layerType;
    };
    YagaLayer.create = function (opts) {
        opts = opts || {};
        if (opts.type && YagaLayer.types[opts.type]) {
            return YagaLayer.types[opts.type].create(opts);
        }
        return new YagaLayer(opts);
    };

    return YagaLayer;
});
/**
 * @module yaga-layer
 * @returns {YagaLayer}
 */