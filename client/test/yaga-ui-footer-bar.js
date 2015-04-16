/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-ui-footer-bar', ['../test/yaga-ui', 'mocha'], function (uiTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-ui-footer-bar';
        require([targetName], function (target) {
            describe('FooterBar on ' + targetName, function () {
                var first;
                first = target.create();
                it('should set and get Fullscreen', function (done) {
                    first.setFullscreen(true);
                    if (first.getFullscreen() === true) {
                        first.setFullscreen(false);
                        if (first.getFullscreen() === false) {
                            return done();
                        }
                    }
                    done(new Error('Wrong fullscreen value'));
                });
                it('should set and get fixed', function (done) {
                    first.setFixed(true);
                    if (first.getFixed() === true) {
                        first.setFixed(false);
                        if (first.getFixed() === false) {
                            return done();
                        }
                    }
                    done(new Error('Wrong fixed value'));
                });
                uiTest(cb, targetName);
            });
        });
    };
});