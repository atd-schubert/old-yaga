/*globals define*/
define('yaga-panel', ['jquery', 'EventEmitter'], function ($, EventEmitter) {
    'use strict';
    var Panel;
    Panel = function (content, opts) {
        opts = opts || {};
        EventEmitter.call(this);

        opts.defaultPanel = opts.defaultPanel || 'frontend-panel';
        // maybe create a panel with this fn
        this.show = function (id) {
            this.emit('show', id);
            var $panel;
            id = id || opts.defaultPanel;
            $panel = $('#' + id + '.yaga-panel');
            $panel.html('');
            $panel.append(content);
            $panel.trigger('create');
            $panel.panel('open');

        };
        this.close = function (id) {
            this.emit('close', id);
            var $panel;

            id = id || 'frontend-panel';
            $panel = $('#' + id + '.yaga-panel');
            $panel.panel('close');
        };
        this.setContent = function (c) {
            this.emit('setContent', c);
            content = c;
        };
        this.setLatLng = function(){};
        this.getLatLng = function(){};
    };
    Panel.prototype = new EventEmitter();
    return Panel;
});