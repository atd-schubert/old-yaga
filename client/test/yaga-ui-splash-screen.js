/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-ui-splash-screen', ['../test/yaga-ui', 'mocha'], function (uiTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-ui-splash-screen';
        require([targetName], function (target) {
            describe('SplashScreen on ' + targetName, function () {
                var first, elem;
                elem = window.document.createElement('div');
                elem.setAttribute('id', 'splash-screen');
                document.body.appendChild(elem);
                first = target.create();

                it('should use an element with id splash-screen', function (done) {

                    if (first.domRoot === elem) {
                        return done();
                    }
                    return done(new Error('Wrong dom element!'));
                });

                it('should not instantiate again', function (done) {
                    if (first === target.create()) {
                        return done();
                    }
                    return done(new Error('Create another instance!'));
                });

                document.body.removeChild(elem);
                /*var first;
                first = target.create();
                it('should set and get title', function (done) {
                    first.setTitle('title test');

                    if (first.getTitle() === 'title test') {
                        return done();
                    }
                    return done(new Error('Wrong title!'));
                });*/
                uiTest(cb, targetName);
            });
        });
    };
});