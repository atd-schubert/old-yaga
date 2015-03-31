/*jslint browser: true*/
/*global require, define */
require.config({
    paths: {
        EventEmitter: 'vendor/eventEmitter/EventEmitter',
        jquery: 'vendor/jquery/jquery',
        jqueryMobile: 'vendor/jquery-mobile-bower/jquery.mobile-1.4.5',
        leaflet: 'vendor/leaflet/leaflet-src',
        mootools: 'vendor/mootools/mootools-core'
    },
    baseUrl: 'scripts/'
});

require(['app']);