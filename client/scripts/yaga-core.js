/*globals define*/
define('yaga-core', ['EventEmitter'], function (EventEmitter) {
    'use strict';
    var yaga = new EventEmitter();

    yaga.registerExtension = function (name, classFn) {

    };
    return yaga;
});