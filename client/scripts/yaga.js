/*global define, window*/

define('yaga', ['yaga-page', 'yaga-panel', 'yaga-map', 'yaga-toolbar'], function (Page, Panel, Map, Toolbar) {
    'use strict';
    var yaga, createEnviroment;

    createEnviroment = function createYagaEnviroment (opts) {

    };

    yaga = {
        // Instances:
        Map: Map,
        Page: Page,
        Panel: Panel,
        Toolbar: Toolbar,
        createEnviroment: createEnviroment
        // UI-Elements
    };

    return yaga;
});