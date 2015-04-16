/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-map-icon', ['../test/yaga', 'mocha'], function (yagaTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-map-icon';
        require([targetName], function (target) {
            describe('MapIcon on ' + targetName, function () {
                var test = target.create();

                it('should set class name', function (done) {
                    test.setClassName('test');

                    if (test.getClassName() === 'test' && test.leaflet.className === 'test') {
                        return done();
                    }
                    return done(new Error('Class Name not set correctly!'));
                });
                it('should set class name', function (done) {
                    test.setClassName('test');

                    if (test.getClassName() === 'test' && test.leaflet.className === 'test') {
                        return done();
                    }
                    return done(new Error('Class Name not set correctly!'));
                });
                it('should set shadow url', function (done) {
                    test.setShadowUrl('test');

                    if (test.getShadowUrl() === 'test' && test.leaflet.shadowUrl === 'test') {
                        return done();
                    }
                    return done(new Error('Shadow URL not set correctly!'));
                });
                it('should set retina url', function (done) {
                    test.setRetinaUrl('test');

                    if (test.getRetinaUrl() === 'test' && test.leaflet.iconRetinaUrl === 'test') {
                        return done();
                    }
                    return done(new Error('Retina URL not set correctly!'));
                });
                it('should set retina shadow url', function (done) {
                    test.setShadowRetinaUrl('test');

                    if (test.getShadowRetinaUrl() === 'test' && test.leaflet.shadowRetinaUrl === 'test') {
                        return done();
                    }
                    return done(new Error('Retina URL not set correctly!'));
                });
                it('should set icon anchor', function (done) {
                    test.setAnchor([1, 2]);

                    if (test.getAnchor()[0] === 1 && test.getAnchor()[1] === 2 && test.leaflet.iconAnchor[0] === 1 && test.leaflet.iconAnchor[1] === 2) {
                        return done();
                    }
                    return done(new Error('Icon anchor not set correctly!'));
                });
                it('should set icon size', function (done) {
                    test.setSize([1, 2]);

                    if (test.getSize()[0] === 1 && test.getSize()[1] === 2 && test.leaflet.iconSize[0] === 1 && test.leaflet.iconSize[1] === 2) {
                        return done();
                    }
                    return done(new Error('Icon size not set correctly!'));
                });
                it('should set non-retina url', function (done) {
                    test.setUrl('test');

                    if (test.getUrl() === 'test' && test.leaflet.iconUrl === 'test') {
                        return done();
                    }
                    return done(new Error('Non-retina URL not set correctly!'));
                });
                it('should set popup anchor', function (done) {
                    test.setPopupAnchor([1, 2]);

                    if (test.getPopupAnchor()[0] === 1 && test.getPopupAnchor()[1] === 2 && test.leaflet.popupAnchor[0] === 1 && test.leaflet.popupAnchor[1] === 2) {
                        return done();
                    }
                    return done(new Error('Popup anchor not set correctly!'));
                });
                it('should set shadow anchor', function (done) {
                    test.setShadowAnchor([1, 2]);

                    if (test.getShadowAnchor()[0] === 1 && test.getShadowAnchor()[1] === 2 && test.leaflet.shadowAnchor[0] === 1 && test.leaflet.shadowAnchor[1] === 2) {
                        return done();
                    }
                    return done(new Error('Shadow anchor not set correctly!'));
                });
                it('should set shadow size', function (done) {
                    test.setShadowSize([1, 2]);

                    if (test.getShadowSize()[0] === 1 && test.getShadowSize()[1] === 2 && test.leaflet.shadowSize[0] === 1 && test.leaflet.shadowSize[1] === 2) {
                        return done();
                    }
                    return done(new Error('Shadow size not set correctly!'));
                });

                yagaTest(cb, targetName);
            });
        });
    };
});