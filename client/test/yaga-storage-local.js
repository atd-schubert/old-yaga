/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-storage-local', ['../test/yaga-storage', 'mocha'], function (storageTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-storage-local';
        require([targetName], function (target) {
            describe('LocalStorage on ' + targetName, function () {
                var first;
                first = target.create();
                it('should save to localStorage', function (done) {
                    first.setData('save test');
                    first.saveById('save');
                    if (window.localStorage.getItem('save') === JSON.stringify('save test')) {
                        return done();
                    }
                    return done(new Error('Not saved to local storage'));
                });
                storageTest(cb, targetName);
            });
        });
    };
});