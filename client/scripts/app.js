/*global define */
define('app', ['yaga', 'yaga-layer-tree-tool'], function (yaga, LayerTreeTool) {
    'use strict';
    var map, page;
    //console.warn('Globel export of yaga!', window.yaga = yaga);
    console.log('Yaga is started...');

    map = yaga.Map.create({name: 'test'});


    page = yaga.Page.create({name: 'test', header: {title: 'Yaga for my Draga'}, content: {content: map.domRoot}});
    page.on('open', function () {
        map.activate();
    });
    page.open();

    yaga.Layer.create({
        url: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
        name: 'opnv',
        caption: 'ÖPNV Karte'
    });
    yaga.Layer.create({
        url: 'http://mt.google.com/vt/x={x}&y={y}&z={z}',
        name: 'googlemaps',
        caption: 'Google-Maps'
    });
    yaga.Layer.create({
        url: 'http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        name: 'googlesatelite',
        caption: 'Google Satelite'
    });
    yaga.Layer.create({
        url: 'http://mt.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
        name: 'googleterrain',
        caption: 'Google Terrain'
    });
    yaga.Layer.create({
        url: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        name: 'osmde',
        caption: 'OpenStreetMap Deutschland'
    });
    yaga.Layer.create({
        url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png',
        name: 'osmint',
        caption: 'OpenStreetMap International'
    });
    yaga.Layer.create({
        url: 'http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
        name: 'cycle',
        caption: 'OpenCycleMap'
    });
    yaga.Layer.create({
        url: 'http://tiles1.skobbler.net/osm_tiles2/{z}/{x}/{y}.png',
        name: 'skobber',
        caption: 'Skobber'
    });
    yaga.Layer.create({
        url: 'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png',
        name: 'hikebike',
        caption: 'Hike and Bike'
    });

    LayerTreeTool.create({name:'layertree'});

});