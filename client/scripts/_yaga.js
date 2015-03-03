/*global define*/

define('yaga', ['jquery', 'underscore', 'leaflet', 'yaga-panel'], function ($, _, L, Panel) {
    'use strict';

    var Marker, yaga, layerPanel, map, tileLayers = {};

    Marker = function (latlon, opts) {
        var self;

        self = this;
        opts = opts || {};
        _.extend(this, opts);
        _.extend(this, L.marker(latlon));

        this.panel = undefined;

        this.bindPanel = function (content, opts) {
            opts = opts || {};
            this.panel = new Panel(content, opts);
            this.on('click', function (event) {
                self.openPanel();
            });
            return this;
        };
        this.openPanel = function (id) {
            this.panel.show(id);
            return this;
        };
        this.closePanel = function (id) {
            this.panel.close(id);
            return this;
        };
    };

    layerPanel = new Panel('Empty');
    layerPanel.on('show', function () {
        var hash, content;

        content = ['<h3>Layers</h3>', '<ul data-role="listview">'];
        for (hash in tileLayers) {
            content.push('<li><a data-show-tile-layer="' + tileLayers[hash].name + '">' + tileLayers[hash].caption || tileLayers[hash].name + '</a></li>');
        }
        content.push('</ul>');
        layerPanel.setContent(content.join(''));
    });
    $(window.document).on('click', '*[href="#layer-tree-panel"]', function () {
        layerPanel.show();
    });
    window.layerPanel = layerPanel;

    yaga = {
        // Instances:
        map: map,
        // UI-Elements
        layerPanel: layerPanel,
        // UI-Layer
        popup: function () {
            return L.popup();
        },
        createMarker: function (latlon, opts) {
            return new Marker(latlon, opts);
        },
        // Raster layers
        createTileLayer: function (url, opts) {
            var tile = L.tileLayer(url, opts);
            if (!opts.name) {
                throw new Error('Your tile layer has to have a name in options');
            }
            tile.name = opts.name;
            tile.caption = opts.caption;
            tile.displayed = false;

            tile.show = function () {
                this.addTo(yaga.map);
                this.displayed = true;
            };
            tile.hide = function () {
                yaga.map.removeLayer(this);
                this.displayed = false;
            };

            tileLayers[opts.name] = tile;
            return tile;
        },
        removeTileLayer: function (tile) {
            if (typeof tile === 'string') {
                if (tileLayers[tile].displayed) {
                    yaga.hideTileLayer(tileLayers[tile]);
                }
                delete tileLayers[tile];
            } else if (typeof tile === 'object' && typeof tile.name === 'string') {
                if (tile.displayed) {
                    yaga.hideTileLayer(tile);
                }
                delete tileLayers[tile.name];
            }
        },
        createWMSLayer: function (url, opts) {
            var tile = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
                layers: 'nexrad-n0r-900913',
                format: 'image/png',
                transparent: true,
                attribution: "Weather data © 2012 IEM Nexrad"
            });

            var tile = L.tileLayer(url, opts);
            if (!opts.name) {
                throw new Error('Your tile layer has to have a name in options');
            }
        },
        createWMSAutoLayers: function (url, opts) {
            // Automatically fetch capabilities and create (all) layers, excerpts them on opts.excerpts:[String]
        }
    };

    $(window.document).on('click', '*[data-show-tile-layer]', function(event) {
        console.log(window.g = event.target);
        tileLayers[event.target.getAttribute('data-show-tile-layer')].show();
    });

    $(window.document).ready(function(){
        L.Icon.Default.imagePath = 'styles/images';

        yaga.map = L.map('map', {
            center: [52.5377, 13.3958],
            zoom: 4
        });

        var x = yaga.createTileLayer('http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
            name: 'opnv',
            caption: 'ÖPNV Karte'
        });
        x.show();
        yaga.createTileLayer('http://mt.google.com/vt/x={x}&y={y}&z={z}', {
            name: 'googlemaps',
            caption: 'Google-Maps'
        });
        yaga.createTileLayer('http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            name: 'googlesatelite',
            caption: 'Google Satelite'
        });
        yaga.createTileLayer('http://mt.google.com/vt/lyrs=t&x={x}&y={y}&z={z}', {
            name: 'googleterrain',
            caption: 'Google Terrain'
        });
        yaga.createTileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            name: 'osmde',
            caption: 'OpenStreetMap Deutschland'
        });
        yaga.createTileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            name: 'osmint',
            caption: 'OpenStreetMap International'
        });
        yaga.createTileLayer('http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
            name: 'cycle',
            caption: 'OpenCycleMap'
        });
        yaga.createTileLayer('http://tiles1.skobbler.net/osm_tiles2/{z}/{x}/{y}.png', {
            name: 'skobber',
            caption: 'Skobber'
        });
        yaga.createTileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png', {
            name: 'hikebike',
            caption: 'Hike and Bike'
        });

        yaga.createMarker([50, 10]).bindPanel('<h1>Hallo Steve</h1><p>Das ist stupider Inhalt</p>').addTo(yaga.map);
        return;

        // ÖPNV:            http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png
        // google map:      http://mt.google.com/vt/x={x}&y={y}&z={z}
        // google satelite: http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}
        // google terrain:  http://mt.google.com/vt/lyrs=t&x={x}&y={y}&z={z}
        // OSM de:          http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png
        // OSM int:         http://tile.openstreetmap.org/{z}/{x}/{y}.png
        // Fahrrad:         http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png
        // Skobbler:        http://tiles1.skobbler.net/osm_tiles2/{z}/{x}/{y}.png
        // Hike and Bike:   http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png

        L.tileLayer('http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', { //'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'
            minZoom: 0,
            maxZoom: 18,
            attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
        }).addTo(map);


        L.marker([52.5, 13.4]).addTo(map);
    });

    return yaga;
});