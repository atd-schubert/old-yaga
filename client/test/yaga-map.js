/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-map', ['../test/yaga-ui', 'yaga-map', 'mocha'], function (uiTest, Map) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-map';
        require([targetName], function (target) {
            describe('Map on ' + targetName, function () {
                var first, second;
                first = target.create();
                second = target.create();
                it('should set active-map on activation', function (done) {
                    first.activate();

                    if (Map.activeMap === first) {
                        return done();
                    }
                    return done(new Error('Map was not set as active map!'));
                });
                it('should deactivate active map on activation of another', function (done) {
                    first.on('deactivate', function () {
                        return done();
                    });
                    second.activate();
                });
                it('should have set other map as active map', function (done) {
                    if (Map.activeMap === second) {
                        return done();
                    }
                    return done(new Error('Other map was not set as active map!'));
                });
                it('should get layers', function (done) {
                    var testObj = target.create();
                    testObj.leaflet = {
                        _layers: {one: {leaflet: {test: 'getLayer test'}}},
                        invalidateSize: function () {}
                    };
                    if (testObj.getLayers().length === 1 || testObj.getLayers()[0].test === 'getLayer test') {
                        return done();
                    }
                    return done(new Error('Wrong set of layers!'));
                });
                it('should only call invalidate size on insert of domRoot to parent', function (done) {
                    var testObj = target.create();
                    testObj.leaflet = {
                        invalidateSize: function () {
                            done(new Error('Call invalidateSize before!'));
                        }
                    };
                    setTimeout(function () {
                        testObj.leaflet = {
                            invalidateSize: function () {
                                done();
                            }
                        };
                        window.document.body.appendChild(testObj.domRoot);
                        testObj.leaflet = {
                            invalidateSize: function () {}
                        };
                        window.document.body.removeChild(testObj.domRoot);
                    }, 10);
                });
                /*it('should not deactivate unactivated map', function (done) {
                    console.log('asd')
                    if (Map.activeMap === second) {
                        first.deactivate();

                        if (Map.activeMap === second) {
                            console.log('oK');
                            return done();
                        }
                        console.log('asdsd');
                        return done(new Error('Activated unactivated map!'));
                    }
                    return done(new Error('Tests are not in correct order!'));
                });*/
                uiTest(cb, targetName);
            });
        });
    };
});