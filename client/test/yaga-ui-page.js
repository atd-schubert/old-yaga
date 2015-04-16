/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-ui-page', ['../test/yaga-ui', 'mocha'], function (uiTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-ui-page';
        require([targetName], function (target) {
            describe('Page on ' + targetName, function () {
                var first;
                first = target.create();
                it('should set and get title', function (done) {
                    first.setTitle('title test');

                    if (first.getTitle() === 'title test') {
                        return done();
                    }
                    return done(new Error('Wrong title!'));
                });
                it('should have a header', function (done) {
                    if (typeof first.header === 'object' && first.$domRoot.find(first.header.domRoot).length === 1) {
                        return done();
                    }
                    return done(new Error('No header'));
                });
                it('should have a footer', function (done) {
                    if (typeof first.footer === 'object' && first.$domRoot.find(first.footer.domRoot).length === 1) {
                        return done();
                    }
                    return done(new Error('No footer'));
                });
                it('should have a content', function (done) {
                    if (typeof first.content === 'object' && first.$domRoot.find(first.content.domRoot).length === 1) {
                        return done();
                    }
                    return done(new Error('No content'));
                });
                uiTest(cb, targetName);
            });
        });
    };
});