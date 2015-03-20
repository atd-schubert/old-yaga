/*globals define, window*/

define('yaga-layer', ['yaga-core', 'yaga-hash-command', 'yaga-map'], function YagaLayer(yaga) {
    'use strict';
    var Layer;

    Layer = {
        yagaExtensionName: 'Layer',
        layer: {},
        layerType: {},
        registerLayerType: function (layerType) {
            this.layerType[layerType.yagaExtensionName] = layerType;
        },
        create: function (opts) {
            opts = opts || {};
            opts.layerType = opts.layerType || 'TileLayer';

            var layer = Layer.layerType[opts.layerType].create(opts);

            if (typeof opts.name === "string") {
                Layer.layer[opts.name] = layer;
                yaga.HashCommand.create({
                    command: function (hash) {
                        hash = hash.substr(13); // #:layer.show:name

                        if (yaga.Map.activeMap) {
                            if (Layer.layer[hash] && Layer.layer[hash].show) {
                                Layer.layer[hash].show();
                            }

                        }
                    },
                    regExp: /^\#\:layer\.show\:/i
                });
                yaga.HashCommand.create({
                    command: function (hash) {
                        hash = hash.substr(13); // #:layer.show:name

                        if (yaga.Map.activeMap) {
                            if (Layer.layer[hash] && Layer.layer[hash].show) {
                                Layer.layer[hash].hide();
                            }

                        }
                    },
                    regExp: /^\#\:layer\.hide\:/i
                });
            }

            return layer;
        }
    };
    yaga.registerExtension(Layer);
    return Layer;
});