/*jslint browser: true*/
/*globals window, define, Class*/

define('yaga-ui-content', ['yaga-ui', 'jqueryMobile'], function (UI) {
    'use strict';
    var Content;
    Content = new Class({
        Extends: UI,
        initialize: function (opts) {
            Content.init.call(this, opts);
        }
    });
    Content.init = function (opts) {
        opts = opts || {};

        UI.init.call(this, opts);

        opts.domRoot.setAttribute('data-role', 'content');
    };
    Content.assume = function (domRoot) {
        if (Content.isPrototypeOf(domRoot.yagaElement)) {
            return domRoot.yagaElement;
        }
        return Content.create({domRoot: domRoot});
    };
    Content.create = function (opts) {
        return new Content(opts);
    };

    return Content;
});