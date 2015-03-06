/*globals define*/
define('yaga-core', ['EventEmitter'], function (EventEmitter) {
    'use strict';
    var yaga = new EventEmitter();

    yaga.registerExtension = function (ext) {
        if (yaga[ext.yagaExtensionName]) {
            throw new Error('There is already an enxtension with the name "' + ext.yagaExtensionName + '"');
        }
        yaga[ext.yagaExtensionName] = ext;
        yaga.emit('registerExtension', ext);
    };
    return yaga;
});