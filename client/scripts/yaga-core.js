/*globals define*/
define('yaga-core', ['EventEmitter'], function (EventEmitter) {
    'use strict';
    var yaga = new EventEmitter();

    yaga.registerExtension = function (name, ext) {
        if (yaga[name]) {
            throw new Error('There is already an enxtension with the name "' + name + '"');
        }
        yaga[name] = ext;
        yaga.emit('registerExtension', {name: name, extension: ext});
    };
    return yaga;
});