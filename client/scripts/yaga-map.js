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
            leafletLayers = this.leaflet._layers;
            arr = [];
            for (hash in leafletLayers) {
                arr.push(leafletLayers[hash].yagaElement || leafletLayers[hash]); // TODO: implement assume
            }
            return arr;
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
        var self;
        self = this;

        opts = opts || {};
        opts.leaflet = opts.leaflet || {};
        opts.center = opts.center || [0, 0];
        opts.zoomLevel = opts.zoomLevel || 1;
        opts.style = opts.style || 'position:fixed; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%;';

        UI.init.call(this, opts);

        this.leaflet = L.map(this.domRoot, opts.leaflet);
        this.leaflet.yagaElement = this;

        this.leaflet.setView(opts.center, opts.zoomLevel);
        this.domRoot.setAttribute('style', opts.style); // overwrite leaflet inline-css

        $(window.document).on('DOMNodeInserted', this.domRoot, function (event) {
            if (event.target === self.domRoot) {
                window.setTimeout(function () {
                    self.leaflet.invalidateSize();
                }, 1);
            }
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
        obj.leaflet = leafletMap;
        obj.leaflet.yagaElement = obj;
        UI.init.call(this, {domRoot: domRoot});

        $(window.document).on('DOMNodeInserted', domRoot, function () {
            obj.leaflet.invalidateSize();
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