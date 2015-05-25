/*jslint browser: true*/
/*globals window, define, Class*/

/**
 * @module yaga-layer
 */
define('yaga-layer', ['yaga', 'yaga-map'], function (Yaga, Map) {
    'use strict';
    var Layer;

    /**
     * @name Layer
     * @augments Yaga
     * @alias yaga-layer
     * @type {Class}
     */
    Layer = new Class({
        Extends: Yaga,
        initialize: function (opts) {
            Layer.init.call(this, opts);
        },
        /**
         * Get attribution of a layer
         * returns {string}
         */
        getAttribution: function () {
            throw new Error('not implemented');
        },
        /**
         * Set attribution of a layer
         * @param {string} value
         * @returns {Layer}
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
            this.getLeafletElement().addTo(map.getLeafletElement());
        },
        hide: function (map) {
            map = map || Map.activeMap;
            this.emit('hide', map);
            if (!map) {
                throw new Error('No map to hide layer from');
            }
            map.getLeafletElement().removeLayer(this.getLeafletElement());
        },
        getLeafletElement: function () {
            throw new Error('not implemented');
        }
    });

    Layer.init = function YagaLayer(opts) {
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
    Layer.assume = function () {
        throw new Error('not implemented');
    };
    Layer.types = {};
    Layer.registerType = function (name, layerType) {
        Layer.types[name] = layerType;
    };
    Layer.create = function (opts) {
        opts = opts || {};
        if (opts.type && Layer.types[opts.type]) {
            return Layer.types[opts.type].create(opts);
        }
        return new Layer(opts);
    };

    return Layer;
});