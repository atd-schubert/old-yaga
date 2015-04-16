/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-ui-page', ['yaga-ui', 'jquery', 'yaga-ui-header-bar', 'yaga-ui-footer-bar', 'yaga-ui-content'], function (UI, $, HeaderBar, FooterBar, Content) {
    'use strict';
    var Page;
    Page = new Class({
        Extends: UI,
        open: function () {
            this.emit('open');
            $.mobile.changePage(this.$domRoot);
        },
        setTitle: function (value) {
            this.header.setTitle(value);
            return this;
        },
        getTitle: function () {
            return this.header.getTitle();
        },
        initialize: function (opts) {
            Page.init.call(this, opts);
        }
    });
    Page.init = function YagaPage(opts) {
        var self;

        self = this;

        opts = opts || {};
        opts.content = opts.content || '';

        opts.header = opts.header || {};
        opts.header.position = opts.header.position || 'fixed';
        opts.header.fullscreen = opts.header.fullscreen || 'true';

        opts.footer = opts.footer || {};
        opts.footer.position = opts.footer.position || 'fixed';
        opts.footer.fullscreen = opts.footer.fullscreen || 'true';

        UI.init.call(this, opts);

        this.domRoot.setAttribute('data-role', 'page');

        this.header = HeaderBar.create(opts.header);
        this.domRoot.appendChild(this.header.domRoot);

        this.content = Content.create(opts.content);
        this.domRoot.appendChild(this.content.domRoot);

        this.footer = FooterBar.create(opts.footer);
        this.domRoot.appendChild(this.footer.domRoot);

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.title) {
            this.setTitle(opts.title);
        }

        this.$domRoot.trigger('create');
        window.document.body.appendChild(this.domRoot);

        /* Bugfix for unstyled footer bar! */
        $(window.document).on('DOMNodeInserted', this.footer.domRoot, function () {
            if (self.footer.domRoot.parentNode !== self.domRoot) {
                self.domRoot.appendChild(self.footer.domRoot);
            }
        });
    };
    Page.getActivePage = function () {
        return $.mobile.activePage.get()[0].yagaElement;
    };
    Page.create = function (opts) {
        return new Page(opts);
    };

    return Page;
});