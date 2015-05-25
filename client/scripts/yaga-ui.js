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
        /**
         * Set id of ui-element
         * @param {String} value
         * @returns {UI}
         */
        setId: function setIdOfUIElement(value) {
            this.emit('setTitle', value);
            this.domRoot.setAttribute('id', value);
            this.emit('changed');
            return this;
        },
        /**
         * Get id of ui-element
         * @returns {string}
         */
        getId: function getIdOfUIElement() {
            return this.domRoot.getAttribute('id');
        },
        /**
         * Set class
         * @param {String} value
         * @returns {UI}
         */
        setClass: function setClassOfUIElement(value) {
            this.emit('setClass', value);
            this.domRoot.setAttribute('class', value);
            this.emit('changed');
            return this;
        },
        /**
         * Get complete class string of ui-element
         * @returns {string}
         */
        getClass: function setClassOfUIElement() {
            return this.domRoot.getAttribute('class');
        },
        /**
         * Proofs for class on ui-element
         * @param value
         * @returns {bool}
         */
        hasClass: function hasClassOnUIElement(value) {
            return this.$domRoot.hasClass(value);
        },
        /**
         * Add a class on ui-element
         * @param {string} value
         * @returns {UI}
         */
        addClass: function addClassOnUIElement(value) {
            this.emit('addClass', value);
            this.$domRoot.addClass(value);
            this.emit('changed');
            return this;
        },
        /**
         * Removes a class from ui-element
         * @param value
         * @returns {UI}
         */
        removeClass: function removeClassOnUIElement(value) {
            this.emit('removeClass', value);
            this.$domRoot.removeClass(value);
            this.emit('changed');
            return this;
        },
        /**
         * Set content of ui-element
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {UI}
         */
        setContent: function setContentOfUIElement(elem) {
            this.emit('setContent', elem);
            this.$domRoot.html('');
            this.$domRoot.append(elem);
            this.emit('changed');
            return this;
        },
        /**
         * Returns the content of the ui-element
         * @returns {childNodes|*|NodeList}
         */
        getContent: function getContentOfUIElement() {
            return this.domRoot.childNodes;
        },
        /**
         * Append content to the ui-element dom-root
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {UI}
         */
        appendContent: function appendContentOfUIElement(elem) {
            this.emit('appendContent', elem);
            this.$domRoot.append(elem);
            this.emit('changed');
            return this;
        },
        /**
         * Prepend content to the ui-element dom-root
         * @param {Node|childNodes|NodeList|String} elem
         * @returns {UI}
         */
        prependContent: function prependContentOfUIElement(elem) {
            this.emit('prependContent', elem);
            this.$domRoot.prepend(elem);
            this.emit('changed');
            return this;
        },
        /**
         * DOM-Element of ui-element
         * @tyoe {Node}
         */
        domRoot: null,
        /**
         * JQueryized version of domRoot
         * @type {{}}
         */
        $domRoot: null
    });

    /**
     * Constructor to initialize any UI object
     * @static
     */
    UI.init = function (opts) {
        var self = this;
        Yaga.init.call(this, opts);
        opts = opts || {};
        opts.domRoot = opts.domRoot || window.document.createElement(opts.domRootTagName || 'div');
        this.domRoot = opts.domRoot;
        this.$domRoot = $(this.domRoot);
        this.domRoot.getYagaElement = function () {
            return self;
        };

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