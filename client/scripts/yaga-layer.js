/*globals define, window*/

define('yaga-layer', ['yaga-core', 'yaga-tile-layer'], function YagaLayer(yaga) {
    'use strict';
    var Layer;
    Layer = {
        yagaExtensionName: 'Layer',
        layer: {},
        create: function (opts) {
            opts = opts || {};

            if (typeof opts.name === "string") {
                Layer.layer[opts.name] = this;
            }

            opts.layerType = opts.layerType || 'TileLayer';
            return yaga[opts.layerType].create(opts);
        }
    };
    yaga.registerExtension(Layer);
    return Layer;
});