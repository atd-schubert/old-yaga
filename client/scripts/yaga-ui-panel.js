/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-ui-panel', ['yaga-ui', 'jquery', 'yaga-ui-page', 'jqueryMobile'], function (UI, $, Page) {
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
        }
    });
    Panel.init = function (opts) {
        var self, isPersistent, innerClick;

        self = this;

        opts = opts || {};
        opts.position = opts.position || 'right';
        opts.display = opts.display || 'overlay';
        opts.positionFixed = opts.positionFixed || 'true';
        opts.content = opts.content || {};
        opts.style = opts.style || 'background-color: rgba(255,255,255,0.9);'; // TODO: exclude to css

        UI.init.call(this, opts);

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
        if (opts.content) {
            this.setContent(opts.content);
        }

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
    Panel.create = function (opts) {
        return new Panel(opts);
    };

    return Panel;
});