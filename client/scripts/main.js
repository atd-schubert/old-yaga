/*jslint browser: true*/
/*global require, define, console */
require.config({
    paths: {
        EventEmitter: 'vendor/eventEmitter/EventEmitter.min',
        jquery: 'vendor/jquery/jquery.min',
        jqueryMobile: 'vendor/jquery-mobile-bower/js/jquery.mobile-1.4.5.min',
        underscore: 'vendor/underscore-amd/underscore',
        openlayers: 'http://openlayers.org/en/v3.2.1/build/ol'
    }
});

require(['yaga'], function () {
    'use strict';
    console.log('Yaga is started...');
});