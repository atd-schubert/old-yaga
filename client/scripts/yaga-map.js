/*globals define, window*/

define('yaga-map', ['yaga-core', 'leaflet', 'jquery', 'EventEmitter', 'jqueryMobile'], function YagaMap(yaga, L, $, EventEmitter) {
    var Map, document;

    document = window.document;

    Map = function YagaMap(opts) {
        var mkGetFn, mkSetFn, self;
        self = this;
        opts = opts || {};
        opts.style = opts.style || 'position:fixed; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%;';
        opts.leaflet = opts.leaflet || {};

        if (typeof opts.name === "string") {
            Map.map[opts.name] = this;
        }

        mkSetFn = function (name) {
            return function (value) {
                self.domRoot.setAttribute(name, value);
                return self;
            };
        };
        mkGetFn = function (name) {
            return function () {
                return self.domRoot.getAttribute(name);
            };
        };

        this.domRoot = document.createElement('div');
        this.domRoot._yagaExtension = this;

        this.map = L.map(this.domRoot, opts.leaflet);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.map.setView([51.505, -0.09], 13);


        this.setId = mkSetFn('id');
        this.getId = mkGetFn('id');
        this.setStyle = mkSetFn('style');
        this.getStyle = mkGetFn('style');

        this.setStyle(opts.style);

        this.activate = function () {
            if (Map.activeMap) {
                Map.activeMap.deactivate();
            }
            this.emit('activate');
            Map.activeMap = this;
        };
        this.deactivate = function () {
            this.emit('deactivate');
            Map.activeMap = null;
        };

        $(document).on('DOMNodeInserted', this.domRoot, function () {
            self.map.invalidateSize();
        });

    };
    Map.prototype = new EventEmitter();
    Map.create = function (opts) {
        return new Map(opts);
    };
    Map.activeMap = null;
    Map.map = {};
    Map.yagaExtensionName = 'Map';

    yaga.registerExtension(Map);
    return Map;
});