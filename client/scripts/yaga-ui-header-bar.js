/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-ui-header-bar', ['yaga-ui', 'jquery', 'jqueryMobile'], function (UI, $) {
    'use strict';
    var HeaderBar;
    HeaderBar = new Class({
        Extends: UI,
        /**
         *
         * @param {boolean} bool
         * @returns {HeaderBar}
         */
        setFullscreen: function (bool) {
            this.emit('setFullscreen', bool);
            if (bool) {
                this.domRoot.setAttribute('data-fullscreen', 'true');
                this.addClass('ui-header-fullscreen');
            } else {
                this.domRoot.removeAttribute('data-fullscreen');
                this.removeClass('ui-header-fullscreen');
            }
            return this;
        },
        getFullscreen: function () {
            return this.domRoot.hasAttribute('data-fullscreen') && this.domRoot.getAttribute('data-fullscreen') === 'true';
        },
        activateTapToggle: function () {
            this.$domRoot.attr('data-tap-toggle', 'true');
            return this;
        },
        deactivateTapToggle: function () {
            this.$domRoot.attr('data-tap-toggle', 'false');
            return this;
        },
        setTapToggle: function (bool) {
            if (bool) {
                return this.activateTapToggle();
            }
            return this.deactivateTapToggle();
        },
        getTapToggle: function () {
            return this.$domRoot.attr('data-tap-toggle').toLowerCase() === 'false';
        },
        setFixed: function (bool) {
            this.emit('setFixed', bool);
            if (bool) {
                this.domRoot.setAttribute('data-position', 'fixed');
                this.addClass('ui-header-fixed slidedown');
            } else {
                this.domRoot.removeAttribute('data-position');
                this.removeClass('ui-header-fixed');
            }
            return this;
        },
        getFixed: function () {
            return this.domRoot.hasAttribute('data-position') && this.domRoot.getAttribute('data-position') === 'fixed';
        },
        setTitle: function (title) {
            this.emit('setTitle', title);
            $(this.titleElem).text(title);
            return this;
        },
        getTitle: function () {
            return $(this.titleElem).text();
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
            HeaderBar.init.call(this, opts);
        }
    });
    HeaderBar.init = function YagaHeaderBar(opts) {
        opts = opts || {};
        if (!opts.hasOwnProperty('fixed')) {
            opts.fixed = true;
        }

        UI.init.call(this, opts);

        this.domRoot.setAttribute('data-role', 'header');
        this.titleElem = window.document.createElement('h2');

        this.domRoot.appendChild(this.titleElem);

        if (opts.fullscreen) {
            this.setFullscreen(opts.fullscreen);
        }
        if (opts.fixed) {
            this.setFixed(opts.fixed);
        }
        if (opts.title) {
            this.setTitle(opts.title);
        }
        this.$domRoot.toolbar({ tapToggle: false });
    };
    HeaderBar.create = function (opts) {
        return new HeaderBar(opts);
    };

    return HeaderBar;
});