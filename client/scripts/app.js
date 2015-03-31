/*jslint browser: true*/
/*global require, define */

/**
 * @module app
 */
define('app', ['yaga'], function (Yaga) {
    'use strict';
    window.Yaga = Yaga;
});

require(['app']);