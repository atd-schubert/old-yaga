/*global define, window*/

define('yaga', ['jquery', 'jqueryMobile', 'leaflet'], function ($, jqm, L) {
    'use strict';

    var yaga, map, document, Toolbar, Panel;
    document = window.document;
    // Settings
    //$('[data-role="footer"]').toolbar({ tapToggle: false});
    map = L.map('yaga-map', {zoomControl: false});
    $(document).ready(function () {

        new Toolbar('header', '#yaga-header');
        new Toolbar('footer', '#yaga-footer');

        new Panel('settings', '#settings-panel');
        new Panel('tools', '#tools-panel');

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

    Panel = function (name, elem) {
        Panel.panels[name] = this;
        var $elem = $(elem);
        this.open = function () {
            $elem.panel('open');
        };
        this.close = function () {
            $elem.panel('close');
        };
        this.toggle = function () {
            $elem.panel('toggle');
        };

    };
    Panel.panels = {};

    Toolbar = function (name, elem) {
        var $elem = $(elem);

        Toolbar.toolsbars[name] = this;
        $elem.toolbar({tapToggle: false});

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


    yaga = {
        // Instances:
        map: map,
        Toolbar: Toolbar,
        Panel: Panel
        // UI-Elements
    };

    return yaga;
});