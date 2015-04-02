/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga', ['mocha'], function () {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga';
        require([targetName], function (target) {
            describe('Yaga-Core functions on ' + targetName, function () {
                it('should have an event emitter', function (done) {
                    var obj = target.create();
                    obj.on('test', function (fn) {
                        fn();
                    });
                    obj.emit('test', done);
                });
            });
            return cb();
        });
    };
});