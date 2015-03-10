/*globals define, window*/

define('yaga-map', ['yaga-core', 'leaflet', 'jquery', 'EventEmitter', 'yaga-hash-command','jqueryMobile'], function YagaMap(yaga, L, $, EventEmitter, HashCommand) {
    var Map, document;

    document = window.document;

    Map = function YagaMap(opts) {
        var mkGetFn, mkSetFn, self;
        self = this;
        opts = opts || {};
        opts.style = opts.style || 'position:fixed; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%;';
        opts.layers = opts.layers || [
            {
                layerType: 'yaga-tile-layer'
            }
        ];
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

        this.leaflet = L.map(this.domRoot, opts.leaflet);

        /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.leaflet);*/

        this.leaflet.setView([0, 0], 1);

        // pipe events
        this.leaflet.on('click', function (event) {
            self.emit('click', event);
        });
        this.leaflet.on('dblclick', function (event) {
            self.emit('dblclick', event);
        });
        this.leaflet.on('mousedown', function (event) {
            self.emit('mousedown', event);
        });
        this.leaflet.on('mouseup', function (event) {
            self.emit('mouseup', event);
        });
        this.leaflet.on('mouseover', function (event) {
            self.emit('mouseover', event);
        });
        this.leaflet.on('mouseout', function (event) {
            self.emit('mouseout', event);
        });
        this.leaflet.on('mousemove', function (event) {
            self.emit('mousemove', event);
        });
        this.leaflet.on('contextmenu', function (event) {
            self.emit('contextmenu', event);
        });
        this.leaflet.on('focus', function (event) {
            self.emit('focus', event);
        });
        this.leaflet.on('blur', function (event) {
            self.emit('blur', event);
        });
        this.leaflet.on('preclick', function (event) {
            self.emit('preclick', event);
        });
        this.leaflet.on('load', function (event) {
            self.emit('load', event);
        });
        this.leaflet.on('unload', function (event) {
            self.emit('unload', event);
        });
        this.leaflet.on('viewreset', function (event) {
            self.emit('viewreset', event);
        });
        this.leaflet.on('movestart', function (event) {
            self.emit('movestart', event);
        });
        this.leaflet.on('move', function (event) {
            self.emit('move', event);
        });
        this.leaflet.on('moveend', function (event) {
            self.emit('moveend', event);
        });
        this.leaflet.on('dragstart', function (event) {
            self.emit('dragstart', event);
        });
        this.leaflet.on('drag', function (event) {
            self.emit('drag', event);
        });
        this.leaflet.on('dragend', function (event) {
            self.emit('dragend', event);
        });
        this.leaflet.on('zoomstart', function (event) {
            self.emit('zoomstart', event);
        });
        this.leaflet.on('zoomend', function (event) {
            self.emit('zoomend', event);
        });
        this.leaflet.on('zoomlevelschange', function (event) {
            self.emit('zoomlevelschange', event);
        });
        this.leaflet.on('resize', function (event) {
            self.emit('resize', event);
        });
        this.leaflet.on('autopanstart', function (event) {
            self.emit('autopanstart', event);
        });
        this.leaflet.on('layeradd', function (event) {
            self.emit('layeradd', event);
        });
        this.leaflet.on('layerremove', function (event) {
            self.emit('layerremove', event);
        });
        this.leaflet.on('baselayerchange', function (event) {
            self.emit('baselayerchange', event);
        });
        this.leaflet.on('overlayadd', function (event) {
            self.emit('overlayadd', event);
        });
        this.leaflet.on('overlayremove', function (event) {
            self.emit('overlayremove', event);
        });
        this.leaflet.on('locationfound', function (event) {
            self.emit('locationfound', event);
        });
        this.leaflet.on('locationerror', function (event) {
            self.emit('locationerror', event);
        });
        this.leaflet.on('popupopen', function (event) {
            self.emit('popupopen', event);
        });
        this.leaflet.on('popupclose', function (event) {
            self.emit('popupclose', event);
        });


        this.setId = mkSetFn('id');
        this.getId = mkGetFn('id');
        this.setStyle = mkSetFn('style');
        this.getStyle = mkGetFn('style');

        this.setStyle(opts.style);

        this.activate = function () {
            if (Map.activeMap && Map.activeMap !== this) {
                Map.activeMap.deactivate();
            }
            this.emit('activate');
            Map.activeMap = this;
            return this;
        };
        this.deactivate = function () {
            this.emit('deactivate');
            Map.activeMap = null;
            return this;
        };

        $(document).on('DOMNodeInserted', this.domRoot, function () {
            self.leaflet.invalidateSize();
        });

        this.on('focus', function () {
            this.activate();
        });

    };
    Map.prototype = new EventEmitter();
    Map.create = function (opts) {
        return new Map(opts);
    };
    Map.activeMap = null;
    Map.map = {};
    Map.yagaExtensionName = 'Map';

    HashCommand.create({
        command: function (hash) {
            var arr, i;
            hash = hash.substr(18); // #:activemap.panto:53.12,10.2,12
            arr = hash.split(',');

            for (i = 0; i < arr.length; i += 1) {
                arr[i] = parseFloat(arr[i]);
            }

            if (Map.activeMap && arr.length >= 2) {

                Map.activeMap.leaflet.panTo([arr[0], arr[1]]);
                if (arr[2]) {
                    Map.activeMap.leaflet.setZoom(arr[2]);
                }
            }
        },
        regExp: /^\#\:activemap\.panto\:/i
    });

    HashCommand.create({
        command: function (hash) {
            hash = parseInt(hash.substr(17), 10); // #:activemap.zoom:53.12,10.2,12

            if (Map.activeMap && hash >= 0) {
                Map.activeMap.leaflet.setZoom(hash);
            }
        },
        regExp: /^\#\:activemap\.zoom\:/i
    });

    yaga.registerExtension(Map);
    return Map;
});