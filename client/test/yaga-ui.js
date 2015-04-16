/*jslint browser: true*/
/*globals window, define, require, describe, it */


define('../test/yaga-ui', ['../test/yaga', 'mocha'], function (yagaTest) {
    'use strict';
    return function (cb, targetName) {
        //cb = cb || function () {};
        targetName = targetName || 'yaga-ui';
        require([targetName], function (target) {
            describe('UI on ' + targetName, function () {
                var testUI = target.create();
                it('should create a domRoot and a handle for jQuery', function (done) {
                    var x = target.create();
                    if (x.domRoot.nodeName === 'DIV' && x.$domRoot) {
                        return done();
                    }
                    return done(new Error('This is not a div DOM element!'));
                });
                it('should set a class and get it with hasClass', function (done) {
                    testUI.setClass('settest another');
                    if (testUI.getClass('settest another')) {
                        return done();
                    }
                    return done(new Error('There is not class test on domRoot!'));
                });
                it('should add a class and get it with hasClass', function (done) {
                    testUI.addClass('addtest');
                    if (testUI.hasClass('addtest')) {
                        return done();
                    }
                    return done(new Error('There is not class test on domRoot!'));
                });
                it('should remove a class again', function (done) {
                    testUI.addClass('removetest');
                    testUI.removeClass('removetest');
                    if (testUI.hasClass('addtest') && !testUI.hasClass('removetest')) {
                        return done();
                    }
                    console.warn(testUI.hasClass('addtest') , !testUI.hasClass('removetest'));
                    return done(new Error('Has not removed class!'));
                });
                it('should set and get ID', function (done) {
                    testUI.setId('testID');
                    if (testUI.getId() === 'testID') {
                        return done();
                    }
                    return done(new Error('Wrong id!'));
                });
                it('should set content on ui-elemnt', function (done) {
                    var domElement = document.createElement('span');
                    testUI.setContent(domElement);
                    if (testUI.$domRoot.find(domElement).get().length === 1) {
                        return done();
                    }
                    return done(new Error('Wrong content!'));
                });
                it('should get content on ui-elemnt', function (done) {
                    if (testUI.getContent()[0] === testUI.domRoot.firstChild) {
                        return done();
                    }
                    return done(new Error('Wrong element!'));
                });
                it('should append content on ui-elemnt', function (done) {
                    var domElement = document.createElement('span');
                    testUI.appendContent(domElement);
                    if (testUI.$domRoot.find(domElement).get().length === 1) {
                        return done();
                    }
                    return done(new Error('Wrong content!'));
                });
                it('should prepend content on ui-elemnt', function (done) {
                    var domElement = document.createElement('span');
                    testUI.prependContent(domElement);
                    if (testUI.$domRoot.find(domElement).get().length === 1) {
                        return done();
                    }
                    return done(new Error('Wrong content!'));
                });
                yagaTest(cb, targetName);
            });
        });
    };
});