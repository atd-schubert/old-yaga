/*globals define, window*/
define('yaga-panel', ['jquery', 'EventEmitter'], function ($, EventEmitter) {
    'use strict';
    var Panel;
    Panel = function (opts) {
        opts = opts || {};
        opts.position = opts.position || 'right';
        opts.display = opts.display || 'overlay';
        opts.positionFixed = opts.positionFixed || 'true';
        opts.content = opts.content || '';
        // opts.name
        // opts.id

        if (typeof opts.name === "string") {
            Panel.panels[opts.name] = this;
        }
        EventEmitter.call(this);

        this.domRoot = window.document.create('div');
        this.domRoot.setAttribute('data-role', 'panel');

        this.setPosition = function (value) {
            this.domRoot.setAttribute('data-position', value);
            return this;
        };
        this.getPosition = function () {
            return this.domRoot.getAttribute('data-position');
        };
        this.setDisplay = function (value) {
            this.domRoot.setAttribute('data-display', value);
            return this;
        };
        this.getDisplay = function () {
            return this.domRoot.getAttribute('data-display');
        };
        this.setPositionFixed = function (value) {
            this.domRoot.setAttribute('data-position-fixed', value);
            return this;
        };
        this.getPositionFixed = function () {
            return this.domRoot.getAttribute('data-position-fixed');
        };
        this.setId = function (value) {
            if (value) {
                this.domRoot.setAttribute('id', value);
            } else {
                this.domRoot.removeAttribute('id');
            }
            return this;
        };
        this.getId = function () {
            return this.domRoot.getAttribute('id');
        };

        this.open = function () {
            this.emit('open');
            var $panel;
            $panel = $(this.domRoot);
            $panel.trigger('create');
            $panel.panel('open');
        };
        this.close = function () {
            this.emit('close');
            var $panel;
            $panel = $(this.domRoot);
            $panel.panel('close');
        };

        this.setPosition(opts.position);
        this.setDisplay(opts.display);
        this.setPositionFixed(opts.positionFixed);
        this.setContent(opts.content);
        this.setId(opts.id);
    };
    Panel.prototype = new EventEmitter();
    Panel.panels = {};
    Panel.create = function (opts) {
        return new Panel(opts);
    }
    return Panel;
});