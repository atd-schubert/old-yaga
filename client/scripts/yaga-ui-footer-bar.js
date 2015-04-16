/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-ui-footer-bar', ['yaga-ui', 'jqueryMobile'], function (UI) {
    'use strict';
    var FooterBar;

    FooterBar = new Class({
        Extends: UI,
        setFullscreen: function (bool) {
            this.emit('setFullscreen', bool);
            if (bool) {
                this.domRoot.setAttribute('data-fullscreen', 'true');
                this.addClass('ui-footer-fullscreen');
            } else {
                this.domRoot.removeAttribute('data-fullscreen');
                this.removeClass('ui-footer-fullscreen');
            }
            return this;
        },
        getFullscreen: function () {
            return this.domRoot.hasAttribute('data-fullscreen') && this.domRoot.getAttribute('data-fullscreen') === 'true';
        },
        setFixed: function (bool) {
            this.emit('setFixed', bool);
            if (bool) {
                this.domRoot.setAttribute('data-position', 'fixed');
                this.addClass('ui-footer-fixed slideup');
            } else {
                this.domRoot.removeAttribute('data-position');
                this.removeClass('ui-footer-fixed slideup');
            }
            return this;
        },
        getFixed: function () {
            return this.domRoot.hasAttribute('data-position') && this.domRoot.getAttribute('data-position') === 'fixed';
        },
        show: function () {
            this.emit('show');
            this.$domRoot.toolbar('show');
            return this;
        },
        hide: function () {
            this.emit('hide');
            this.$domRoot.toolbar('hide');
            return this;
        },
        toggle: function () {
            this.emit('toggle');
            this.$domRoot.toolbar('toggle');
            return this;
        },
        getStatus: function () {
            if (this.hasClass('ui-fixed-hidden')) {
                return 'hidden';
            }
            return 'shown';
        },
        initialize: function (opts) {
            FooterBar.init.call(this, opts);
        }
    });

    FooterBar.init = function (opts) {
        opts = opts || {};

        UI.init.call(this, opts);

        if (!opts.hasOwnProperty('fixed')) {
            opts.fixed = true;
        }
        this.domRoot.setAttribute('data-role', 'footer');

        if (opts.fullscreen) {
            this.setFullscreen(opts.fullscreen);
        }
        if (opts.fixed) {
            this.setFixed(opts.fixed);
        }
        this.$domRoot.toolbar({ tapToggle: false });
    };

    FooterBar.create = function (opts) {
        return new FooterBar(opts);
    };

    return FooterBar;
});