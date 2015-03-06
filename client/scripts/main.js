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

require(['yaga'], function (yaga) {
    'use strict';
    console.warn('Globel export of yaga!', window.yaga = yaga);
    console.log('Yaga is started...');
    var p = yaga.Page.create({name: 'test', header: {title: 'Yaga for my Draga'}, content: {content: yaga.Map.create({name: 'test'}).domRoot}});
    p.open();
    console.log(yaga.Map.map.test);
});