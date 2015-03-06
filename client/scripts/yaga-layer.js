/*globals define, window*/

define('yaga-layer', ['yaga-core', 'yaga-tile-layer'], function YagaLayer(yaga) {
    'use strict';
    var Layer;
    Layer = {
        yagaExtensionName: 'Layer',
        create: function (opts) {
            opts = opts || {};
            opts.layerType = opts.layerType || 'TileLayer';
            return yaga[opts.layerType].create(opts);
        }
    };
    yaga.registerExtension(Layer);
    return Layer;
});