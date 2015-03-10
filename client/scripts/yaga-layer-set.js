/*globals define*/

define('yaga-layer-set', ['yaga', 'yaga-wms-layer'], function (yaga) {
    'use strict';
    yaga.Layer.create({
        url: 'http://www.wms.nrw.de/geobasis/wms_nw_dtk?', // ?REQUEST=GetCapabilities&SERVICE=WMS
        layers: ['nw_dtk_pan', 'nw_dtk_col'],
        format: 'image/png',
        transparent: true,
        maxZoom: 20, //default is 18
        attribution: "&copy Geobasis NRW",
        name: 'WMS',
        caption: 'WMS NRW'
    });


    yaga.Layer.create({
        url: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
        name: 'opnv',
        attribution: '&copy; <a href="http://öpnvkarte.de/?zoom=7&lat=51.935&lon=9.01&layers=TBTTT">ÖPNV-Karte</a>',
        caption: 'ÖPNV Karte'
    });
    yaga.Layer.create({
        url: 'http://mt.google.com/vt/x={x}&y={y}&z={z}',
        name: 'googlemaps',
        attribution: '&copy; <a href="http://maps.google.com">Google Maps</a>',
        caption: 'Google-Maps'
    });
    yaga.Layer.create({
        url: 'http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        name: 'googlesatelite',
        attribution: '&copy; <a href="http://maps.google.com">Google Maps</a>',
        caption: 'Google Satelite'
    });
    yaga.Layer.create({
        url: 'http://mt.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
        name: 'googleterrain',
        attribution: '&copy; <a href="http://maps.google.com">Google Maps</a>',
        caption: 'Google Terrain'
    });
    yaga.Layer.create({
        url: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        name: 'osmde',
        attribution: '<a href="http://openstreetmap.de">OpenStreetMapDE |</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        caption: 'OpenStreetMap Deutschland'
    });
    yaga.Layer.create({
        url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png',
        name: 'osmint',
        attribution: '<a href="http://openstreetmap.org">OpenStreetMap |</a> Mitwirkende: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        caption: 'OpenStreetMap International'
    });
    yaga.Layer.create({
        url: 'http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
        name: 'cycle',
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
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
    yaga.Layer.create({
        url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
        name: 'landscape',
        caption: 'Landscape'
    });
    yaga.Layer.create({
        url: 'http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
        name: 'landscape',
        caption: 'Hillshade'
    });
    yaga.Layer.create({
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg',
        name: 'esri',
        caption: 'ESRI ArealOverlay',
        attribution: '© Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    yaga.Layer.create({
        url: 'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        name: 'openTopo',
        caption: 'OpenTopo Map',
        attribution: 'Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, <a href="http://viewfinderpanoramas.org">SRTM</a> | Kartendarstellung: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

});