/*globals define, window*/

define('yaga-geojson-layer', ['yaga-core', 'EventEmitter', 'leaflet'], function YagaGeojsonLayer(yaga, EventEmitter, L) {
    'use strict';
    var GeojsonLayer;


    GeojsonLayer = function YagaGeojsonLayer(opts) {
        var self, Feature, name, caption;
        self = this;
        opts = opts || {};

        opts.type = 'FeatureCollection';
        opts.features = opts.features || [
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        7.2501258,
                        50.6639399
                    ]
                },
                "type": "Feature",
                "properties": {
                    _yagaPopupContent: 'Löwenburg',
                    _yagaPanelContent: 'Das ist die Löwenburg... <img src="http://www.rheindrache.de/images/750px_loewenburg6.jpg"/>'

                },
                "id": 51
            }
            /*, {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9983545,
                        39.7502833
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 52
            }, {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9963919,
                        39.7444271
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 54
            }, {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9960754,
                        39.7498956
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 55
            }, {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9933717,
                        39.7477264
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 57
            }, {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9913392,
                        39.7432392
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 58
            }, {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9788452,
                        39.6933755
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 74
            }, {
                "type": "Feature",
                "properties": {
                    "popupContent": "Coors Field"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-104.99404191970824, 39.756213909328125]
                }
            }, {
                "type": "Feature",
                "properties": {
                    "popupContent": "This is the Auraria West Campus",
                    "style": {
                        weight: 2,
                        color: "#999",
                        opacity: 1,
                        fillColor: "#B0DE5C",
                        fillOpacity: 0.8
                    }
                },
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            [
                                [-105.00432014465332, 39.74732195489861],
                                [-105.00715255737305, 39.74620006835170],
                                [-105.00921249389647, 39.74468219277038],
                                [-105.01067161560059, 39.74362625960105],
                                [-105.01195907592773, 39.74290029616054],
                                [-105.00989913940431, 39.74078835902781],
                                [-105.00758171081543, 39.74059036160317],
                                [-105.00346183776855, 39.74059036160317],
                                [-105.00097274780272, 39.74059036160317],
                                [-105.00062942504881, 39.74072235994946],
                                [-105.00020027160645, 39.74191033368865],
                                [-105.00071525573731, 39.74276830198601],
                                [-105.00097274780272, 39.74369225589818],
                                [-105.00097274780272, 39.74461619742136],
                                [-105.00123023986816, 39.74534214278395],
                                [-105.00183105468751, 39.74613407445653],
                                [-105.00432014465332, 39.74732195489861]
                            ],[
                            [-105.00361204147337, 39.74354376414072],
                            [-105.00301122665405, 39.74278480127163],
                            [-105.00221729278564, 39.74316428375108],
                            [-105.00283956527711, 39.74390674342741],
                            [-105.00361204147337, 39.74354376414072]
                        ]
                        ],[
                            [
                                [-105.00942707061768, 39.73989736613708],
                                [-105.00942707061768, 39.73910536278566],
                                [-105.00685214996338, 39.73923736397631],
                                [-105.00384807586671, 39.73910536278566],
                                [-105.00174522399902, 39.73903936209552],
                                [-105.00041484832764, 39.73910536278566],
                                [-105.00041484832764, 39.73979836621592],
                                [-105.00535011291504, 39.73986436617916],
                                [-105.00942707061768, 39.73989736613708]
                            ]
                        ]
                    ]
                }
            }*/
        ];
        caption = opts.caption = opts.caption || opts.name || 'Unknown GeoJson layer';

        Feature = function YagaGeojsonFeature(geojson, leafletElement) {
            this.leaflet = leafletElement;
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
        Feature.prototype = new EventEmitter()
        Feature.create = function (geojson, leafletElement) {
            var rg = new Feature(geojson, leafletElement);
            self.emit('Feature.create', rg);
            return rg;
        };

        this.features = [];

        if (typeof opts.name === "string") {
            name = opts.name;
            GeojsonLayer.geojsonLayer[opts.name] = this;
        }

        this.caption = opts.caption;
        this.leaflet = new L.geoJson(opts, {
            onEachFeature: function (geojson, leafletElement) {
                self.features.push(Feature.create(geojson, leafletElement));
            }
        });

        this.addData = function (data) {
            this.emit('setData', data);
            this.leaflet.addData(data);
            return this;
        };
        this.addPoint = function (latlng, properties) {
            var data;
            if (!latlng) {
                if (yaga.Map.activeMap) {
                    latlng = [yaga.Map.activeMap.leaflet.getCenter().lat, yaga.Map.activeMap.leaflet.getCenter().lng];
                } else {
                    latlng = [0, 0];
                }
            }
            data = {
                "geometry": {"type": "Point", "coordinates": latlng},
                "type": "Feature",
                "properties": {}
            };
            this.emit('addPoint', data);

            data.geometry = data.geometry || {};
            data.geometry.type = 'Point';
            // TODO: return point!

            return this.addData(data);
        };

        this.getData = function (onlyDisplayed) {
            var i, rg;
            this.emit('getData', onlyDisplayed);
            if (onlyDisplayed) {
                return this.leaflet.toGeoJSON();
            }
            rg = {type: "FeatureCollection", features: []};
            for (i = 0; i < this.features.length; i += 1) {
                rg.features.push(this.features[i].leaflet.toGeoJSON());
            }
            rg.caption = caption;
            rg.name = name;
            return rg;
        };
        this.removeFeature = function (feature) {
            this.features.splice(this.features.indexOf(feature), 1);
            return this;
        };

        this.show = function (res) {
            res = res || yaga.Map.activeMap;
            if (!res) {
                return;
            }
            this.emit('show', res);
            this.leaflet.addTo(res.leaflet);
            return this;
        };
        this.hide = function (res) {
            res = res || yaga.Map.activeMap;
            if (!res) {
                return;
            }
            this.emit('hide', res);
            res.leaflet.removeLayer(this.leaflet);
            return this;
        };
        // TODO: the following functions...
        this.setOpacity = function (value) {
            return this;
        };
        this.getOpacity = function () {
            return null;
        };
        this.enablePopups = function() {};
        this.disablePopups = function() {};
        this.enablePanels = function() {};
        this.disablePanels = function() {};

        // TODO: maybe exclude to own ext

        this.featurePanel = yaga.Panel.create({name: 'geojsonFeaturePanel'});
        this.on('Feature.create', function (feat) {
            // self.on('change', check for panelContent)
            if (feat.data.properties.panelContent) {
                //feat.
                self.featurePanel.setContent(feat.data.properties.panelContent);
            }
        });
    };
    GeojsonLayer.prototype = new EventEmitter();
    GeojsonLayer.geojsonLayer = {};
    GeojsonLayer.yagaExtensionName = 'GeojsonLayer';

    GeojsonLayer.create = function (opts) {
        return new GeojsonLayer(opts);
    };

    yaga.registerExtension(GeojsonLayer);
    return GeojsonLayer;
});