/*jslint browser: true*/
/*globals window, define, Class */

define('yaga-ui', ['yaga', 'jquery'], function (Yaga, $) {
    'use strict';
    var YagaUI;
    /**
     * Basic UI super class for yaga
     * @alias module:yaga-ui
     * @name YagaUI
     * @constructor
     * @augments Yaga
     * @param {{}} [opts] - Object for configuration
     */
    YagaUI = new Class({
        Extends: Yaga,
        initialize: function (opts) {
            YagaUI.init.call(this, opts);
            /**
             * Event that fires everytime something changed on this element
             * @event changed
             * @memberOf YagaUI#
             */
        },
        /**
         * Set id of dom-element
         * @memberOf YagaUI#
         * @method setId
         * @param {String} value - New id to set on dom element
         * @fires YagaUI#setId
         * @fires YagaUI#changed
         * @returns {self}
         */
        setId: function setIdOfUIElement(value) {
            /**
             * Event fires after setting id to new value
             * @event YagaUI#setId
             */
            this.emit('setId', value);
            this.domRoot.setAttribute('id', value);
            this.emit('changed');
            return this;
        },
        /**
         * Get id of ui-element
         * @memberOf YagaUI#
         * @method getId
         * @returns {string}
         */
        getId: function getIdOfUIElement() {
            return this.domRoot.getAttribute('id');
        },
        /**
         * Set class attribute of dom element
         * @param {String} value - New class attribute value
         * @memberOf YagaUI#
         * @returns {self}
         */
        setClass: function setClassOfUIElement(value) {
            this.emit('setClass', value);
            this.domRoot.setAttribute('class', value);
            this.emit('changed');
            return this;
        },
        /**
         * Get complete class string of ui-element
         * @memberOf YagaUI#
         * @returns {string}
         */
        getClass: function setClassOfUIElement() {
            return this.domRoot.getAttribute('class');
        },
        /**
         * Proofs for class on ui-element
         * @memberOf YagaUI#
         * @param value
         * @returns {bool}
         */
        hasClass: function hasClassOnUIElement(value) {
            return this.$domRoot.hasClass(value);
        },
        /**
         * Add a class on ui-element
         * @memberOf YagaUI#
         * @param {string} value
         * @returns {self}
         */
        addClass: function addClassOnUIElement(value) {
            this.emit('addClass', value);
            this.$domRoot.addClass(value);
            this.emit('changed');
            return this;
        },
        /**
         * Removes a class from ui-element
         * @memberOf YagaUI#
         * @param value
         * @returns {self}
         */
        removeClass: function removeClassOnUIElement(value) {
            this.emit('removeClass', value);
            this.$domRoot.removeClass(value);
            this.emit('changed');
            return this;
        },
        /**
         * Set content of ui-element
         * @memberOf YagaUI#
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {self}
         */
        setContent: function setContentOfUIElement(elem) {
            this.emit('setContent', elem);
            this.$domRoot.html('');
            this.$domRoot.append(elem);
            this.emit('changed');
            return this;
        },
        /**
         * @memberOf YagaUI#
         * Returns the content of the ui-element
         * @returns {childNodes|*|NodeList}
         */
        getContent: function getContentOfUIElement() {
            return this.domRoot.childNodes;
        },
        /**
         * Append content to the ui-element dom-root
         * @memberOf YagaUI#
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {self}
         */
        appendContent: function appendContentOfUIElement(elem) {
            this.emit('appendContent', elem);
            this.$domRoot.append(elem);
            this.emit('changed');
            return this;
        },
        /**
         * Prepend content to the ui-element dom-root
         * @memberOf YagaUI#
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {self}
         */
        prependContent: function prependContentOfUIElement(elem) {
            this.emit('prependContent', elem);
            this.$domRoot.prepend(elem);
            this.emit('changed');
            return this;
        },
        /**
         * DOM-Element of ui-element
         * @memberOf YagaUI#
         * @type {Node}
         */
        domRoot: null,
        /**
         * JQueryized version of domRoot
         * @memberOf YagaUI#
         * @type {jQuery}
         */
        $domRoot: null
    });

    /**
     * Constructor to initialize any YagaUI object
     * @static
     * @memberOf YagaUI
     */
    YagaUI.init = function (opts) {
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
        if (opts.content) {
            this.setContent(opts.content);
        }
    };

    /**
     * Assume a dom element to a yaga-ui element
     * @param {Node} domRoot - DOM element to assume
     * @static
     * @memberOf YagaUI
     * @returns {YagaUI}
     */
    YagaUI.assume = function (domRoot) {
        return YagaUI.create({domRoot: domRoot});
    };
    /**
     * Instantiate YagaUI object by function
     * @static
     * @memberOf YagaUI
     * @param {{}} opts - Configuration object
     * @config domRoot - Root element to use for ui-element
     * @returns {YagaUI}
     */
    YagaUI.create = function (opts) {
        return new YagaUI(opts);
    };

    return YagaUI;
});

/**
 * This is a module for basic user interface elements in yaga applications.
 * Condition for a yaga-ui element is a DOM element.
 * @module yaga-ui
 * @returns YagaUI
 */