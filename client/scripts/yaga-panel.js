/*globals define, window*/

define('yaga-panel', ['yaga-core', 'EventEmitter', 'yaga-content', 'yaga-hash-command', 'jquery', 'leaflet', 'jqueryMobile'], function YagaPanel(yaga, EventEmitter, Content, HashCommand, $, L) {
    'use strict';
    var Panel, document;

    document = window.document;

    Panel = function YagaPanel(opts) {
        var self, isPersistent, innerClick;
        self = this;
        opts = opts || {};
        opts.position = opts.position || 'right';
        opts.display = opts.display || 'overlay';
        opts.positionFixed = opts.positionFixed || 'true';
        opts.content = opts.content || {};
        opts.style = opts.style || 'background-color: rgba(255,255,255,0.9);';

        if (typeof opts.name === "string") {
            Panel.panel[opts.name] = this;
            HashCommand.create({
                command: function () {
                    self.open();
                },
                regExp: {
                    test: function (path) {
                        return path === ('#:panel.open:' + opts.name);
                    }
                }
            });
        }

        this.domRoot = document.createElement('div');
        this.domRoot.setAttribute('data-role', 'panel');
        this.domRoot.setAttribute('data-persistent', 'true');
        this.domRoot._yagaExtension = this;

        this.setContent = function (value) {
            this.emit('setContent', value);
            var $domRoot = $(this.domRoot);
            $domRoot.html('');
            $domRoot.append(value);
            return this;
        };
        this.getContent = function () {
            return this.domRoot.childNodes;
        };
        this.setId = function (value) {
            this.emit('setId', value);
            this.domRoot.setAttribute('id', value);
            return this;
        };
        this.getId = function () {
            this.domRoot.getAttribute('id');
            return this;
        };
        this.setStyle = function (value) {
            this.emit('setStyle', value);
            this.domRoot.setAttribute('style', value);
            return this;
        };
        this.getStyle = function () {
            return this.domRoot.getAttribute('style');
        };
        this.setPosition = function (value) {
            this.emit('setPosition', value);
            this.domRoot.setAttribute('data-position', value);
            return this;
        };
        this.getPosition = function () {
            return this.domRoot.getAttribute('data-position');
        };
        this.setDisplay = function (value) {
            this.emit('setPosition', value);
            this.domRoot.setAttribute('data-display', value);
            return this;
        };
        this.getDisplay = function () {
            return this.domRoot.getAttribute('data-display');
        };
        this.setPositionFixed = function (value) {
            this.emit('setPositionFixed', value);
            this.domRoot.setAttribute('data-position-fixed', value);
            return this;
        };
        this.getPositionFixed = function () {
            return this.domRoot.getAttribute('data-position-fixed');
        };
        this.setPersistent = function (value) {
            this.emit('setPersistent', value);
            isPersistent = value;
            return this;
        };
        this.getPersistent = function () {
            return isPersistent;
        };

        this.open = function () {
            var $panel, activePage;
            this.emit('open');
            activePage = null;
            if (yaga.Page && typeof yaga.Page.getActivePage === 'function') {
                activePage = yaga.Page.getActivePage();
            }
            if (activePage) {
                activePage.domRoot.appendChild(this.domRoot);
            }
            $panel = $(this.domRoot);
            $panel.trigger('create');
            $panel.panel('open');

            this.emit('opened');
        };
        this.close = function () {
            this.emit('close');
            var $panel;
            $panel = $(this.domRoot);
            $panel.panel('close');
        };
        this.isActive = function () {
            return !$(this.domRoot).hasClass('ui-panel-closed');
        };

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.style) {
            this.setStyle(opts.style);
        }

        if (opts.position) {
            this.setPosition(opts.position);
        }
        if (opts.display) {
            this.setDisplay(opts.display);
        }
        if (opts.positionFixed) {
            this.setPositionFixed(opts.positionFixed);
        }
        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.persistent) {
            this.setPersistent(opts.persistent);
        }
        if (opts.content) {
            this.setContent(opts.content);
        }

        $(this.domRoot).panel().enhanceWithin();//('create');

        $(this.domRoot).on('click', function () {
            innerClick = true;
        });
        $(document).on('click', function () {
            if (!innerClick && self.isActive() && !self.getPersistent()) {
                self.close();
            }
            innerClick = false;
        });

        document.body.appendChild(this.domRoot);
    };
    Panel.prototype = new EventEmitter();
    Panel.panel = {};
    Panel.yagaExtensionName = 'Panel';

    Panel.create = function (opts) {
        return new Panel(opts);
    };
    // yaga-panel ui-panel ui-panel-position-left  ui-panel-display-overlay ui-body-inherit ui-panel-fixed ui-panel-animate ui-panel-open
    //            ui-panel ui-panel-position-right ui-panel-display-overlay ui-body-inherit ui-panel-fixed ui-panel-animate ui-panel-open

    yaga.registerExtension(Panel);
    return Panel;
});