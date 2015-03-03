/*globals define, window*/
define('yaga-layer-tree-panel', ['jquery', 'yaga-panel'], function ($, Panel) {
    'use strict';
    var layerPanel = new Panel();
    layerPanel.on('show', function () {
        var hash, content;

        content = ['<h3>Layers</h3>', '<ul data-role="listview">'];
        for (hash in tileLayers) {
            content.push('<li><a data-show-tile-layer="' + tileLayers[hash].name + '">' + tileLayers[hash].caption || tileLayers[hash].name + '</a></li>');
        }
        content.push('</ul>');
        layerPanel.setContent(content.join(''));
    });
    $(window.document).on('click', '*[href="#layer-tree-panel"]', function () {
        layerPanel.show();
    });
    return layerPanel;
});