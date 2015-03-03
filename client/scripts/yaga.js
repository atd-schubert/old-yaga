/*global define*/

define('yaga', ['jquery', 'jqueryMobile', 'leaflet'], function ($, jqm, L) {
    'use strict';

    var yaga, map;

    // Settings
    //$('[data-role="footer"]').toolbar({ tapToggle: false});
    $('[data-role="header"], [data-role="footer"]').toolbar({ tapToggle: false});

    map = L.map('yaga-map').setView([51.505, -0.09], 13);



    yaga = {
        // Instances:
        map: map
        // UI-Elements
    };

    return yaga;
});