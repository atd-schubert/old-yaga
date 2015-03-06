/*globals define, window*/

define('yaga-toolbar', ['yaga-core', 'jquery', 'EventEmitter', 'jqueryMobile'], function (yaga, $, EventEmitter) {
    'use strict';
    var Toolbar;

    Toolbar = function YagaToolbar(opts) {
        var mkGetFn, mkSetFn, titleElem, titleText, self, document;
        self = this;
        opts = opts || {};
        opts.role = opts.role || 'header';

        document = window.document;

        if (typeof opts.name === "string") {
            Toolbar.toolsbars[opts.name] = this;
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
        titleElem = document.createElement('h2');
        titleText = document.createTextNode('');
        titleElem.appendChild(titleText);
        this.domRoot.appendChild(titleElem);

        this.setRole = mkSetFn('data-role');
        this.getRole = mkGetFn('data-role');

        this.setFullscreen = function (bool){
            if (bool) {
                this.domRoot.setAttribute('data-fullscreen', 'true');
                $(this.domRoot).addClass('ui-' + this.getRole() + '-fullscreen');
            } else {
                this.domRoot.removeAttribute('data-fullscreen');
                $(this.domRoot).removeClass('ui-' + this.getRole() + '-fullscreen');
            }
        };

        this.getFullscreen = mkGetFn('data-fullscreen');

        this.setPosition = mkSetFn('data-position');
        this.getPosition = mkGetFn('data-position');



        this.setTitle = function (title){
            titleText.nodeValue = title;
            return self;
        };
        this.getTitle = function () {
            return titleText.nodeValue;
        };



        this.addMenuEntry = function () {};



        this.show = function () {
            this.emit('show');
            $(this.domRoot).toolbar('show');
            return this;
        };
        this.hide = function () {
            this.emit('hide');
            $(this.domRoot).toolbar('hide');
            return this;
        };
        this.toggle = function () {
            $elem.toolbar('toggle');
            return this;
        };

        this.getStatus = function () {
            if ($(this.domRoot).hasClass('ui-fixed-hidden')) {
                return 'hidden';
            } else {
                return 'shown';
            }
        };

        this.setRole(opts.role);
        if (opts.fullscreen) {
            this.setFullscreen(opts.fullscreen);
        }
        if (opts.position) {
            this.setPosition(opts.position);
        }
        if (opts.title) {
            this.setTitle(opts.title);
        }
        $(this.domRoot).toolbar({ tapToggle: false });
    };
    Toolbar.prototype = new EventEmitter();
    Toolbar.toolsbars = {};
    Toolbar.create = function (opts) {
        return new Toolbar(opts);
    };

    yaga.registerExtension('Toolbar', Toolbar);
    return Toolbar;
});