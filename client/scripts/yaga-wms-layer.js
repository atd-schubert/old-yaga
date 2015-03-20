/*globals define, window*/

define('yaga-wms-layer', ['yaga-core', 'EventEmitter', 'leaflet', 'yaga-layer'], function YagaWmsLayer(yaga, EventEmitter, L, Layer) {
    'use strict';
    var WmsLayer;

    WmsLayer = function YagaWmsLayer(opts) {
        var self;
        self = this;
        opts = { // opts ||
            url: 'http://www.wms.nrw.de/geobasis/wms_nw_dtk?', // ?REQUEST=GetCapabilities&SERVICE=WMS
            layers: ['nw_dtk_pan', 'nw_dtk_col'],
            format: 'image/png',
            transparent: true,
            maxZoom: 20, //default is 18
            attribution: "&copy Geobasis NRW",
            name: 'WMS',
            caption: 'WMS NRW'
        };
        /*"http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
         layers: 'nexrad-n0r-900913',
         format: 'image/png',
         transparent: true,
         attribution: "Weather data © 2012 IEM Nexrad"*/

        if (!opts.url) {
            throw new Error('You have to specify an url of an wms-layer');
        }
        opts.caption = opts.caption || opts.name || 'Unknown Tile layer "' + opts.url + '"';

        if (typeof opts.name === "string") {
            WmsLayer.wmsLayer[opts.name] = this;
        }

        this.caption = opts.caption;
        this.leaflet = new L.TileLayer.WMS(opts.url, opts);

        this.setOpacity = function (value) {
            this.leaflet.setOpacity(value);
            return this;
        };

        this.show = function (res) {
            res = res || yaga.Map.activeMap;
            if (!res) {
                return;
            }
            this.emit('show', res);
            this.leaflet.addTo(res.leaflet);
        };
        this.hide = function (res) {
            res = res || yaga.Map.activeMap;
            if (!res) {
                return;
            }
            this.emit('hide', res);
            res.leaflet.removeLayer(this.leaflet);
        };
    };
    WmsLayer.prototype = new EventEmitter();
    WmsLayer.wmsLayer = {};
    WmsLayer.yagaExtensionName = 'WmsLayer';

    WmsLayer.create = function (opts) {
        return new WmsLayer(opts);
    };

    Layer.registerLayerType(WmsLayer);
    return WmsLayer;
});