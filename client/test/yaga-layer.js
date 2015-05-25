/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-layer', ['../test/yaga', 'mocha'], function (yagaTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-layer';
        require([targetName], function (target) {
            describe('Layer on ' + targetName, function () {
                var first;
                first = target.create();
                it('should set and get title', function (done) {
                    first.setTitle('title test');

                    if (first.getTitle() === 'title test') {
                        return done();
                    }
                    return done(new Error('Wrong title!'));
                });
                it('should set and get caption', function (done) {
                    first.setCaption('caption test');

                    if (first.getCaption() === 'caption test') {
                        return done();
                    }
                    return done(new Error('Wrong caption!'));
                });
                if (targetName === 'yaga-layer') {
                    return yagaTest(cb, targetName);
                }
                it('should set and get zIndex', function (done) {
                    first.setZIndex('zIndex test');

                    if (first.getZIndex() === 'zIndex test') {
                        return done();
                    }
                    return done(new Error('Wrong zIndex!'));
                });
                it('should set and get opacity', function (done) {
                    first.setOpacity(0.5);

                    if (first.getOpacity() === 0.5) {
                        return done();
                    }
                    return done(new Error('Wrong opacity!'));
                });
                it('should get object within leaflet object', function (done) {
                    if (first.getLeafletElement().getYagaElement() === first) {
                        return done();
                    }
                    return done(new Error('Yaga-element not linked correctly in leaflet!'));
                });
                yagaTest(cb, targetName);
            });
        });
    };
});