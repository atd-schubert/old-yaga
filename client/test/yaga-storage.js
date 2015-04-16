/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-storage', ['../test/yaga', 'mocha'], function (yagaTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-storage';
        require([targetName], function (target) {
            describe('Storage on ' + targetName, function () {
                var first, second;
                first = target.create();
                second = target.create();
                it('should set and get data', function (done) {
                    first.setData('data test');

                    if (first.getData() === 'data test') {
                        return done();
                    }
                    return done(new Error('Wrong data!'));
                });
                it('should load and save data by id', function (done) {
                    first.setData('loadSave test');
                    first.saveById('loadSave');
                    first.setData('different');
                    first.loadById('loadSave');

                    if (first.getData() === 'loadSave test') {
                        return done();
                    }
                    return done(new Error('Wrong data!'));
                });
                it('should export data', function (done) {
                    first.setData('export test');
                    first.exportTo(second);

                    if (second.getData() === 'export test') {
                        return done();
                    }
                    return done(new Error('Wrong data!'));
                });
                it('should import data', function (done) {
                    second.setData('import test');
                    first.importFrom(second);

                    if (first.getData() === 'import test') {
                        return done();
                    }
                    return done(new Error('Wrong data!'));
                });
                yagaTest(cb, targetName);
            });
        });
    };
});