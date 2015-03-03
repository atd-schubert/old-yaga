/*global define*/

define('yaga', ['jquery', 'jqueryMobile', 'openlayers'], function ($, jqm, ol) {
    'use strict';

    var yaga, map;

    // Settings
    //$('[data-role="footer"]').toolbar({ tapToggle: false});
    $('[data-role="header"], [data-role="footer"]').toolbar({ tapToggle: false});

    map = new ol.Map({
        target: 'yaga-map',
        layers: [
            new ol.layer.Tile({
                //source: new ol.source.MapQuest({layer: 'sat'})
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4
        })
    });

    map.on('drag', function(){
        console.log('drag');
    });
    map.on('dragend', function(){
        console.log('dragend');
    });
    map.on('click', function(){
        console.log('click');
    });
    map.on('change:size', function(){
        console.log('cs');
    });



    yaga = {
        // Instances:
        map: map
        // UI-Elements
    };

    return yaga;
});