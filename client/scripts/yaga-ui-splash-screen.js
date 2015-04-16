/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-ui-splash-screen', ['yaga-ui', 'yaga-ui-page'], function (UI, Page) {
    'use strict';
    var SplashScreen;
    SplashScreen = new Class({
        Extends: Page,
        initialize: function (opts) {
            SplashScreen.init.call(this, opts);
        }
    });
    SplashScreen.init = function YagaSplashScreen(opts) {
        var self;

        self = this;

        opts = opts || {};
        opts.domRoot = opts.domRoot || window.document.getElementById('splash-screen') || undefined;

        UI.init.call(this, opts); // Do not call Page here, because we don't need toolbars

        SplashScreen.handle = this;
    };
    SplashScreen.handle = null;
    SplashScreen.create = function (opts) {
        if (SplashScreen.handle) {
            return SplashScreen.handle;
        }
        return new SplashScreen(opts);
    };

    return SplashScreen;
});