/*jslint browser: true*/
/*globals window, define, Class */

/**
 * @module yaga-ui
 */
define('yaga-ui', ['yaga', 'jquery'], function (Yaga, $) {
    'use strict';
    var UI;
    /**
     * Basic UI super class for yaga
     *
     * @alias yaga-ui
     * @name UI
     * @constructor
     * @augments Yaga
     * @type {Class}
     */
    UI = new Class({
        Extends: Yaga,
        initialize: function (opts) {
            UI.init.call(this, opts);
        },

        setId: function (value) {
            this.emit('setTitle', value);
            this.domRoot.setAttribute('id', value);
            return this;
        },
        getId: function () {
            return this.domRoot.getAttribute('id');
        },
        setClass: function (value) {
            this.emit('setClass', value);
            this.domRoot.setAttribute('class', value);
            return this;
        },
        hasClass: function (value) {
            return this.$domRoot.hasClass(value);
        },
        addClass: function (value) {
            this.emit('addClass', value);
            this.$domRoot.addClass(value);
            return this;
        },
        removeClass: function (value) {
            this.emit('removeClass', value);
            this.$domRoot.removeClass(value);
            return this;
        }
    });

    /**
     * Constructor to initialize any UI object
     * @static
     */
    UI.init = function (opts) {
        Yaga.init.call(this, opts);
        opts = opts || {};
        opts.domRoot = opts.domRoot || window.document.createElement(opts.domRootTagName || 'div');
        this.domRoot = opts.domRoot;
        this.$domRoot = $(this.domRoot);
        this.domRoot.yagaElement = this;

        if (opts.id) {
            this.setId(opts.id);
        }
        if (opts.style) {
            this.domRoot.setAttribute('style', opts.style);
        }
    };

    /**
     * Assume an object and make a Yaga-Object from it
     * @param {Node} domRoot
     * @static
     * @returns {UI}
     */
    UI.assume = function (domRoot) {
        return UI.create({domRoot: domRoot});
    };
    /**
     * Instantiate UI object by function
     * @static
     * @param opts
     * @returns {UI}
     */
    UI.create = function (opts) {
        return new UI(opts);
    };

    return UI;
});