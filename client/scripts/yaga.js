/*global define, window*/

define('yaga', ['jquery', 'jqueryMobile', 'leaflet'], function ($, jqm, L) {
    'use strict';

    var yaga, map, document, Toolbar;
    document = window.document;
    // Settings
    //$('[data-role="footer"]').toolbar({ tapToggle: false});
    map = L.map('yaga-map');
    $(document).ready(function () {
        $('[data-role="header"], [data-role="footer"]').toolbar({tapToggle: false});
        map.setView([51.505, -0.09], 13);

        L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    });

    map.on('dragstart', function () {
        if (yaga.Toolbar.toolsbars.header.status === "hide") {
            return;
        }
        yaga.Toolbar.toolsbars.header.hide();
        yaga.Toolbar.toolsbars.footer.hide();
        map.once('dragend', function () {
            yaga.Toolbar.toolsbars.header.show();
            yaga.Toolbar.toolsbars.footer.show();
        });
    });
    map.on('click', function () {
        yaga.Toolbar.toolsbars.header.toggle();
        yaga.Toolbar.toolsbars.footer.toggle();
    });

    Toolbar = function (name, elem) {
        Toolbar.toolsbars[name] = this;
        var $elem = $(elem);
        this.status = "show";
        this.show = function () {
            $elem.toolbar('show');
            this.status = "show";
        };
        this.hide = function () {
            $elem.toolbar('hide');
            this.status = "hide";
        };
        this.toggle = function () {
            $elem.toolbar('toggle');
            this.status = this.status === "show" ? "hide" : "show";
        };
        this.setElement = function (elem) {
            $elem = $(elem);
        };
    };
    Toolbar.toolsbars = {};

    new Toolbar('header', '#yaga-header');
    new Toolbar('footer', '#yaga-footer');

    yaga = {
        // Instances:
        map: map,
        Toolbar: Toolbar
        // UI-Elements
    };

    return yaga;
});