/*globals define, window*/

define('yaga-geojson-layer', ['yaga-core', 'EventEmitter', 'leaflet'], function YagaGeojsonFeature(yaga, EventEmitter, L) {
    'use strict';
    var GeojsonFeature;


    GeojsonFeature = function YagaGeojsonFeature(opts /*geojson, leafletElement*/) {
        var name;

        if (!opts.leaflet) {
            throw new Error('You have to connect a Feature with a Leaflet geojson feature!');
        }
        opts = opts || {};


        if (typeof opts.name === "string") {
            name = opts.name;
            GeojsonFeature.geojsonFeature[opts.name] = this;
        }

        this.leaflet = opts.leaflet;
        this.data = geojson;
        this.hide = function () {
            self.leaflet.removeLayer(leafletElement);
            return this;
        };
        this.show = function () {
            leafletElement.addTo(self.leaflet);
            return this;
        };
        this.setDraggable = function (value) {
            if (value) {
                this.leaflet.dragging.enable();
            } else {
                this.leaflet.dragging.disable();
            }
        };
        this.remove = function () { // TODO: create remove fn
            self.removeFeature(this);

        };
        this.bindPanel = function (content) {
            this.leaflet.on('click', function () {
                self.featurePanel.setContent(content);
                self.featurePanel.open();
            });
        };
        this.bindPopup = function (content, opts) {
            this.leaflet.bindPopup(content, opts);
        };

        if (geojson && geojson.properties) {
            if (geojson.properties._yagaPanelContent) {
                this.bindPanel(geojson.properties._yagaPanelContent);
            }
            if (geojson.properties._yagaPopupContent) {
                this.bindPopup(geojson.properties._yagaPopupContent);
            }
        }

        this.leaflet.on('dragend', function () {
            this.emit('change');
            self.emit('change', this);
        });
        //this.getDraggable = function () {};
    };

    GeojsonFeature.prototype = new EventEmitter();
    GeojsonFeature.geojsonFeature = {};
    GeojsonFeature.yagaExtensionName = 'GeojsonFeature';

    GeojsonFeature.create = function (opts) {
        return new GeojsonFeature(opts);
    };

    yaga.registerExtension(GeojsonFeature);
    return GeojsonFeature;
});