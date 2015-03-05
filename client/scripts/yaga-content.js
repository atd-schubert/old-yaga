/*globals define, window*/
define('yaga-content', ['jquery'], function ($) {
    'use strict';
    var Content;

    Content = function YagaContent(opts) {
        var mkGetFn, mkSetFn, self;
        self = this;
        opts = opts || {};

        if (typeof opts.name === "string") {
            Content.contents[opts.name] = this;
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
        this.domRoot.setAttribute('data-role', 'content');

        this.setId = mkSetFn('id');
        this.getId = mkGetFn('id');
        this.setStyle = mkSetFn('style');
        this.getStyle = mkGetFn('style');


        this.setContent = function (elem) {
            var $domRoot = $(this.domRoot);
            $domRoot.html('');
            $domRoot.append(elem);
            return self;
        };
        this.getContent = function () {
            return this.domRoot.childNodes;
        };

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.content) {
            this.setContent(opts.content);
        }
        if (opts.style) {
            this.setStyle(opts.style);
        }
    };
    Content.contents = {};
    Content.create = function (opts) {
        return new Content(opts);
    };

    return Content;
});