/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-layer-tile', ['../test/yaga-layer', 'mocha'], function (layerTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-layer-tile';
        require([targetName], function (target) {
            describe('TileLayer on ' + targetName, function () {
                var first;
                first = target.create();
                it('should set and get url', function (done) {
                    first.setUrl('http://url/test/{x}/{y}/{z}');

                    if (first.getUrl() === 'http://url/test/{x}/{y}/{z}') {
                        return done();
                    }
                    return done(new Error('Wrong url!'));
                });
                layerTest(cb, targetName);
            });
        });
    };
});