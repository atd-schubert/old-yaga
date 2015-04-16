/*jslint browser: true*/
/*global require, define */

/**
 * @module app
 */
define('app', ['yaga', 'jquery', 'yaga-map', 'yaga-map-popup', 'yaga-ui-page', 'yaga-storage', 'yaga-storage-local', 'yaga-geo-json', 'yaga-layer-tile', 'yaga-ui-panel', 'yaga-map-marker', 'yaga-ui-splash-screen', 'yaga-map-icon'], function (Yaga, $, Map, Popup, Page, storage, ls, gj, tile, Panel, Marker, sc, Icon) {
    'use strict';
    window.Yaga = Yaga;
    window.Map = Map;
    window.Popup = Popup;
    window.Page = Page;
    window.Store = storage;
    window.ls = ls;
    window.gj = gj;
    window.tile = tile;
    window.Panel = Panel;
    window.Marker = Marker;
    window.Icon = Icon;
    window.sc = sc;
    sc.create();



    var map, page, osm, state;
    map = Map.create();
    map.activate();

    osm = tile.create();
    osm.show();

    state = gj.create({
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
    });

    state.show();

    page = Page.create({content: {content: map.domRoot}, title: 'YAGA - Yet another geo application'});

    window.document.body.appendChild(page.domRoot);
    $(window.document).ready(function () {
        page.open();
    });
});

require(['app']);