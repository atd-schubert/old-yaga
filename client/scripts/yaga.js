/*global define*/

define('yaga', ['openlayers', 'jquery', 'jqueryMobile'], function (ol) {
    'use strict';

    var yaga, map;

    map = new ol.Map({
        target: 'yaga-map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.MapQuest({layer: 'sat'})
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4
        })
    });

    yaga = {
        // Instances:
        map: map
        // UI-Elements
    };

    return yaga;
});