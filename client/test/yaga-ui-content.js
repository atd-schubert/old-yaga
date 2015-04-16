/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-ui-content', ['../test/yaga-ui', 'mocha'], function (uiTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-ui-content';
        require([targetName], function (target) {
            describe('Content on ' + targetName, function () {
                var first;
                first = target.create();
                it('should have a data-role attribute', function (done) {
                    if (first.domRoot.getAttribute('data-role') === 'content') {
                        return done();
                    }
                    return done('Element do not have the correct data-role');
                });
                uiTest(cb, targetName);
            });
        });
    };
});