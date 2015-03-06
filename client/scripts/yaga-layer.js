/*globals define, window*/

define('yaga-layer', ['yaga-core', 'yaga-tile-layer'], function YagaLayer(yaga) {
    'use strict';
    var Layer;
    Layer = {
        yagaExtensionName: 'Layer',
        layer: {},
        create: function (opts) {
            opts = opts || {};
            opts.layerType = opts.layerType || 'TileLayer';

            var layer = yaga[opts.layerType].create(opts);

            if (typeof opts.name === "string") {
                Layer.layer[opts.name] = layer;
            }

            return layer;
        }
    };
    yaga.registerExtension(Layer);
    return Layer;
});