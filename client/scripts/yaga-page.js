/*globals define, window*/
define('yaga-page', ['yaga-core', 'yaga-toolbar', 'yaga-content', 'yaga-map', 'jquery', 'EventEmitter', 'jqueryMobile'], function (yaga, Toolbar, Content, Map, $, EventEmitter) {
    'use strict';
    var Page;
    Page = function YagaPage(opts) {
        var self, mkSetFn, mkGetFn, document;
        self = this;
        opts = opts || {};
        opts.position = opts.position || 'right';
        opts.display = opts.display || 'overlay';
        opts.positionFixed = opts.positionFixed || 'true';
        opts.content = opts.content || '';

        opts.header = opts.header || {};
        opts.header.role = opts.header.role || 'header';
        opts.header.position = opts.header.position || 'fixed';
        opts.header.fullscreen = opts.header.fullscreen || 'true';

        opts.footer = opts.footer || {};
        opts.footer.role = opts.footer.role || 'footer';
        opts.footer.position = opts.footer.position || 'fixed';
        opts.footer.fullscreen = opts.footer.fullscreen || 'true';

        if (!(opts.hasOwnProperty('map'))) {
            opts.map = {


            };
        }
        // opts.name
        // opts.id

        document = window.document;

        if (typeof opts.name === "string") {
            Page.pages[opts.name] = this;
        }

        mkSetFn = function (name) {
            return function (value) {
                self.domRoot.setAttribute(name, value);
                return self;
            };
        };
        mkGetFn = function (name) {
            return function () {
                return self.domRoot.getAttribute(name);
            };
        };

        this.domRoot = document.createElement('div');
        this.domRoot._yagaExtension = this;
        this.domRoot.setAttribute('data-role', 'page');

        this.header = Toolbar.create(opts.header);
        this.domRoot.appendChild(this.header.domRoot);

        this.content = Content.create(opts.content)
        this.domRoot.appendChild(this.content.domRoot);

        this.footer = Toolbar.create(opts.footer);
        this.domRoot.appendChild(this.footer.domRoot);

        this.setId = function (value) {
            if (value) {
                this.domRoot.setAttribute('id', value);
            } else if (this.domRoot.hasAttribute('id')) {
                this.domRoot.removeAttribute('id');
            }
        };
        this.getId = function () {
            if (this.domRoot.hasAttribute('id')) {
                return this.domRoot.getAttribute('id');
            }
            return undefined;
        };

        this.open = function () {
            this.emit('open');
            var $page;
            $page = $(this.domRoot);

            $.mobile.changePage($page);
        };

        //this.setPosition(opts.position);
        //this.setDisplay(opts.display);
        //this.setPositionFixed(opts.positionFixed);
        if (opts.id) {
            this.setId(opts.id);
        }

        $(this.domRoot).trigger('create');
        document.body.appendChild(this.domRoot);


        $(document).on('DOMNodeInserted', this.footer.domRoot, function () {
            if (self.footer.domRoot.parentNode !== self.domRoot) {
                self.domRoot.appendChild(self.footer.domRoot);
            }
        });

    };
    Page.prototype = new EventEmitter();
    Page.pages = {};
    Page.create = function (opts) {
        return new Page(opts);
    };
    Page.yagaExtensionName = 'Page';

    yaga.registerExtension(Page);
    return Page;
});