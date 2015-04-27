/*jslint browser: true*/
/*global require, define */

/**
 * @module app
 */
define('app', ['yaga', 'jquery', 'yaga-map', 'yaga-map-popup', 'yaga-ui-page', 'yaga-storage', 'yaga-storage-local', 'yaga-geo-json', 'yaga-layer-tile', 'yaga-ui-panel', 'yaga-map-marker', 'yaga-ui-splash-screen', 'yaga-map-icon'], function (Yaga, $, Map, Popup, Page, Storage, ls, GeoJson, Tile, Panel, Marker, SplashScreen, Icon) {
    'use strict';
    var app, map, page, osm, state, marker, panel, point;
    app = {};

    app.splashScreen = SplashScreen.create();
    app.map = {
        main: Map.create().activate()
    };
    app.layer = {
        osm: Tile.create().show()
    };
    app.panel = {
        drachenfels: Panel.create({content: 'Das ist der Drachenfels...'})
    };
    app.marker = {
        drachenfels: Marker.create({lat: 50.6650948, lng: 7.2102715}).bindPanel(app.panel.drachenfels).show()
    };
    app.area = {
        state: GeoJson.create({
            "type": "Feature",
            "properties": {"party": "Republican"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-104.05, 48.99],
                    [-97.22,  48.98],
                    [-96.58,  45.94],
                    [-104.03, 45.94],
                    [-104.05, 48.99]
                ]]
            }
        }).show()
    };

    //Marker.create({lat: 50, lng: 7, icon: {dir: 'icons/gray/'}}).show();
    //Marker.create({lat: 51, lng: 8, icon: marker.icon}).show();

    app.page = {
        main: Page.create({content: {content: app.map.main.domRoot}, title: 'YAGA - Yet another geo application'})
    };

    $(window.document).ready(function () {
        app.page.main.open();
    });
    window.app = app;
});

require(['app']);