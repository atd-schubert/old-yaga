/*jslint browser: true*/
/*global require, define, console */
require.config({
    paths: {
        EventEmitter: 'vendor/eventEmitter/EventEmitter.min',
        jquery: 'vendor/jquery/jquery.min',
        jqueryMobile: 'vendor/jquery-mobile-bower/js/jquery.mobile-1.4.5.min',
        underscore: 'vendor/underscore-amd/underscore',
        leaflet: 'vendor/leaflet/dist/leaflet-src'
    },
    baseUrl: 'scripts/'
});

define('main', ['yaga', 'yaga-layer-tree-tool', 'yaga-layer-set', 'yaga-local-storage', 'yaga-local-geojson-store'], function (yaga, LayerTreeTool) {
    'use strict';
    var map, page;
    console.warn('Globel export of yaga!', window.yaga = yaga);
    console.log('Yaga is started...');

    map = yaga.Map.create({name: 'test'});


    page = yaga.Page.create({name: 'test', header: {title: 'Yaga for my Draga'}, content: {content: map.domRoot}});
    page.on('open', function () {
        map.activate();
    });
    page.open();

    yaga.LocalGeojsonStore.create({name: 'draga'});

    LayerTreeTool.create({name: 'layertree', layers: [yaga.LocalGeojsonStore.localGeojsonStore.draga.layer, yaga.Layer.layer.opnv, yaga.Layer.layer.osmde, yaga.Layer.layer.googlesatelite]});
    var a = document.createElement('a');
    a.appendChild(document.createTextNode('layertree'));
    a.setAttribute('class', 'ui-btn ui-btn-icon-notext ui-icon-grid');
    $(a).on('click', function () {
        setTimeout(function () {
            yaga.Panel.panel.layertree.open();
        }, 10);

    });
    $(yaga.Page.page.test.footer.domRoot).html('').append(a);

    //yaga.Layer.layer.osmde.show();

});