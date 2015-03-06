/*globals define, window*/

define('yaga-panel', ['yaga-core', 'EventEmitter', 'yaga-content', 'jquery', 'leaflet', 'jqueryMobile'], function YagaPanel(yaga, EventEmitter, Content, $, L) {
    'use strict';
    var Panel, document;

    document = window.document;

    Panel = function YagaPanel(opts) {
        var self;
        self = this;
        opts = opts || {};
        opts.position = opts.position || 'right';
        opts.display = opts.display || 'overlay';
        opts.positionFixed = opts.positionFixed || 'true';
        opts.content = opts.content || {};
        opts.style = opts.style || 'background-color: rgba(255,255,255,0.9);';

        if (typeof opts.name === "string") {
            Panel.panels[opts.name] = this;
        }

        this.domRoot = document.createElement('div');
        this.domRoot.setAttribute('data-role', 'panel');
        this.domRoot._yagaExtension = this;

        this.content = Content.create(opts.content);
        this.domRoot.appendChild(this.content.domRoot);

        /*this.setContent = function (value) {
            this.emit('setContent', value);
            var $domRoot = $(this.domRoot);
            $domRoot.html('');
            $domRoot.append(value);
            return this;
        };
        this.getContent = function () {
            return this.domRoot.childNodes;
        };*/
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
            if (value) {
                this.domRoot.setAttribute('data-persistent', 'true');
            } else {
                this.domRoot.removeAttribute('data-persistent');
            }
            return this;
        };
        this.getPersistent = function () {
            return this.domRoot.hasAttribute('data-persistent');
        };

        this.open = function () {
            this.emit('open');
            var $panel, onClickOutside;
            $panel = $(this.domRoot);
            $panel.trigger('create');
            $panel.panel('open');

            onClickOutside = function (event) {
                var target = event.target;
                if (target === self.domRoot) {
                    return $(document).one('click', onClickOutside);
                }
                while (target.parentNode) {
                    target = target.parentNode;
                    if (target === self.domRoot) {
                        return $(document).one('click', onClickOutside);
                    }
                }
                return self.close();
            };

            if (!this.getPersistent()) {
                $(document).one('click', onClickOutside);
            }
        };
        this.close = function () {
            this.emit('close');
            var $panel;
            $panel = $(this.domRoot);
            $panel.panel('close');
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

        $(this.domRoot).panel().enhanceWithin();//('create');

        $(document).on('DOMNodeInserted', this.domRoot, function () {
            //this.dummy(); // make a resize or something else
        });

        document.body.appendChild(this.domRoot);
    };
    Panel.prototype = new EventEmitter();
    Panel.dummies = {};
    Panel.yagaExtensionName = 'Panel';

    Panel.create = function (opts) {
        return new Panel(opts);
    };
    // yaga-panel ui-panel ui-panel-position-left  ui-panel-display-overlay ui-body-inherit ui-panel-fixed ui-panel-animate ui-panel-open
    //            ui-panel ui-panel-position-right ui-panel-display-overlay ui-body-inherit ui-panel-fixed ui-panel-animate ui-panel-open

    yaga.registerExtension(Panel);
    return Panel;
});