/*globals window, define, Class*/

/**
 * @module yaga-map
 */
define('yaga-map', ['yaga-ui', 'jquery', 'leaflet'], function (UI, $, L) {
    'use strict';
    var Map;
    /**
     * @name Map
     * @alias yaga-map
     * @augments UI
     * @type {Class}
     */
    Map = new Class({
        Extends: UI,
        /**
         * Set this map as active map
         * @type function
         * @name Map.activate
         * @returns {Map}
         */
        activate: function activateMap() {
            this.emit('activate');
            if (Map.activeMap && Map.activeMap !== this) {
                Map.activeMap.deactivate();
            }
            Map.activeMap = this;
            this.emit('changed');
            return this;
        },
        /**
         * Deactivate this map as active map
         * @type function
         * @name Map.activate
         * @returns {Map}
         */
        deactivate: function deactivateMap() {
            this.emit('deactivate');
            if (Map.activeMap !== this) {
                return this;
            }
            Map.activeMap = null;
            this.emit('changed');
            return this;
        },
        getLayers: function () {
            var arr, hash, leafletLayers;
            leafletLayers = this.getLeafletElement()._layers;
            arr = [];
            for (hash in leafletLayers) {
                arr.push((leafletLayers[hash].getYagaElement && leafletLayers[hash].getYagaElement()) || leafletLayers[hash]); // TODO: implement assume
            }
            return arr;
        },
        getLeafletElement: function () {
            throw new Error('not implemented');
        },
        initialize: function initializeMap(opts) {
            Map.init.call(this, opts);
        }
    });

    /**
     * Function to initialize any YagaMap object
     * @type function
     * @static
     */
    Map.init = function (opts) {
        var self, leafletElement;
        self = this;

        opts = opts || {};
        opts.leaflet = opts.leaflet || {};
        opts.center = opts.center || [0, 0];
        opts.zoomLevel = opts.zoomLevel || 1;
        opts.style = opts.style || 'position:fixed; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%;';

        UI.init.call(this, opts);

        leafletElement = L.map(this.domRoot, opts.leaflet);
        this.getLeafletElement = function () {
            return leafletElement;
        };
        leafletElement.getYagaElement = function () {
            return self;
        };
        leafletElement.setView(opts.center, opts.zoomLevel);
        this.domRoot.setAttribute('style', opts.style); // overwrite leaflet inline-css

        $(window.document).on('DOMNodeInserted', this.domRoot, function (event) {
            leafletElement.invalidateSize();
        });

        /*this.leaflet.on('focus', function () {
         self.activate();
         });*/
    };
    /**
     * Current active map with focus
     * @type {null | Map}
     */
    Map.activeMap = null;

    /**
     * Assume leaflet map and make a Yaga-Object from it
     * @param {{}} leafletMap - The original leaflet map object that should be extended
     * @static
     * @returns Yaga
     */
    Map.assume = function (leafletMap) {
        var obj, domRoot;
        domRoot = leafletMap.getContainer();

        obj = Map.create();
        obj.getLeafletElement = function () {
            return leafletMap;
        };
        leafletMap.getYagaElement = function () {
            return obj;
        };
        UI.init.call(this, {domRoot: domRoot});

        $(window.document).on('DOMNodeInserted', domRoot, function () {
            leafletMap.invalidateSize();
        });
        return obj;
    };
    /**
     * Instantiate map by function
     * @param {{}} [opts] - Optional settings
     * @static
     * @returns {Map}
     */
    Map.create = function (opts) {
        return new Map(opts);
    };

    return Map;
});