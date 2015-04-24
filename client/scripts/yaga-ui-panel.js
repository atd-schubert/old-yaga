/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-ui-panel', ['yaga-ui', 'jquery', 'yaga-ui-page', 'yaga-ui-content', 'jqueryMobile'], function (UI, $, Page, Content) {
    'use strict';
    var Panel;
    Panel = new Class({
        Extends: UI,
        initialize: function (opts) {
            Panel.init.call(this, opts);
        },
        setPosition: function (value) {
            this.emit('setPosition', value);
            this.domRoot.setAttribute('data-position', value);
            if (value === 'right') {
                this.$domRoot.removeClass('ui-panel-position-left').addClass('ui-panel-position-right');
            } else if (value === 'left') {
                this.$domRoot.removeClass('ui-panel-position-right').addClass('ui-panel-position-left');
            }
            return this;
        },
        getPosition: function () {
            return this.domRoot.getAttribute('data-position');
        },
        setDisplay: function (value) {
            this.emit('setPosition', value);
            this.domRoot.setAttribute('data-display', value);
            return this;
        },
        getDisplay: function () {
            return this.domRoot.getAttribute('data-display');
        },
        setPositionFixed: function (value) {
            this.emit('setPositionFixed', value);
            this.domRoot.setAttribute('data-position-fixed', value);
            return this;
        },
        getPositionFixed: function () {
            return this.domRoot.getAttribute('data-position-fixed');
        },
        open: function (page) {
            this.emit('open');

            var activePage;
            activePage = page || null;
            if (!page && Page && typeof Page.getActivePage === 'function') {
                activePage = Page.getActivePage();
            }
            if (activePage) {
                activePage.domRoot.appendChild(this.domRoot);
            }

            //this.$domRoot.trigger('create');
            this.$domRoot.panel('open');

            this.emit('opened');
            return this;
        },
        close: function () {
            this.emit('close');
            this.$domRoot.panel('close');
            return this;
        },
        isActive: function () {
            return !this.$domRoot.hasClass('ui-panel-closed');
        },
        setPersistent: function (value) {
            throw new Error('not implemented'); // TODO:
        },
        getPersistent: function () {
            throw new Error('not implemented'); // TODO:
        },
        /**
         * Set content within content object
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {UI}
         */
        setContent: function setContentOfPanel(elem) {
            this.emit('setTitle', elem);
            this.content.setContent(elem);
            this.emit('changed');
            return this;
        },
        /**
         * Returns the content within content object
         * @returns {childNodes|*|NodeList}
         */
        getContent: function getContentOfPanel() {
            return this.content.getContent();
        },
        /**
         * Append content to the content object
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {UI}
         */
        appendContent: function appendContentOfPanel(elem) {
            this.emit('appendContent', elem);
            this.content.appendContent(elem);
            this.emit('changed');
            return this;
        },
        /**
         * Prepend content to the content object
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {UI}
         */
        prependContent: function prependContentOfPanel(elem) {
            this.emit('prependContent', elem);
            this.content.prependContent(elem);
            this.emit('changed');
            return this;
        },
        content: null
    });
    Panel.init = function (opts) {
        var self, isPersistent, innerClick;

        self = this;

        opts = opts || {};
        opts.position = opts.position || 'right';
        opts.display = opts.display || 'overlay';
        opts.positionFixed = opts.positionFixed || 'true';
        opts.style = opts.style || 'background-color: rgba(255,255,255,0.9);'; // TODO: exclude to css

        this.content = Content.create(); // Has to be created before UI.init()!

        UI.init.call(this, opts);

        this.domRoot.appendChild(this.content.domRoot);

        opts.domRoot.setAttribute('data-role', 'panel');
        this.domRoot.setAttribute('data-persistent', 'true');


        this.setPersistent = function (value) {
            this.emit('setPersistent', value);
            isPersistent = value;
            return this;
        };
        this.getPersistent = function () {
            return isPersistent;
        };

        if (opts.position) {
            this.setPosition(opts.position);
        }
        if (opts.display) {
            this.setDisplay(opts.display);
        }
        if (opts.positionFixed) {
            this.setPositionFixed(opts.positionFixed);
        }
        if (opts.persistent) {
            this.setPersistent(opts.persistent);
        }
        /* is already in yaga-ui
        if (opts.content) {
            this.setContent(opts.content);
        }*/

        this.$domRoot.panel().enhanceWithin();//('create');

        this.$domRoot.on('click', function () {
            innerClick = true;
        });
        $(window.document).on('click', function () {
            if (!innerClick && self.isActive() && !self.getPersistent()) {
                self.close();
            }
            innerClick = false;
        });

        window.document.body.appendChild(this.domRoot);
    };
    Panel.assume = function (domRoot) {
        var opts = {};
        if (domRoot.hasAttribute('data-position')) {
            opts.position = domRoot.getAttribute('data-position');
        }
        if (domRoot.hasAttribute('data-display')) {
            opts.display = domRoot.getAttribute('data-display');
        }
        if (domRoot.hasAttribute('data-position-fixed')) {
            opts.positionFixed = domRoot.getAttribute('data-position-fixed');
        }
        if (domRoot.hasAttribute('data-persistent')) {
            opts.persistent = domRoot.getAttribute('data-persistent');
        }
        if (domRoot.hasAttribute('style')) {
            opts.style = domRoot.getAttribute('style');
        }
        opts.domRoot = domRoot;
        return Panel.create(opts);
    };
    Panel.create = function (opts) {
        return new Panel(opts);
    };

    return Panel;
});