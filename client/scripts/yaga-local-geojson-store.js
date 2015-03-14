/*globals define, window*/

define('yaga-local-geojson-store', ['yaga', 'EventEmitter', 'yaga-local-storage', 'yaga-geojson-layer'], function YagaLocalGeojsonStore(yaga, EventEmitter, LocalStorage, GeojsonLayer) {
    'use strict';
    var LocalGeojsonStore, document;

    document = window.document;

    LocalGeojsonStore = function YagaLocalGeojsonStore(opts) {
        var self;
        self = this;
        opts = opts || {};
        opts.name = opts.name || 'noname';

        LocalGeojsonStore.localGeojsonStore[opts.name] = this;

        this.store = yaga.LocalStorage.getStore(opts.name);
        if (this.store.data === null) {
            this.store.data = {};
        }
        this.store.data.name = opts.name;
        this.layer = yaga.GeojsonLayer.create(this.store.data);

        this.layer.on('change', function () {
            self.store.data = self.layer.getData();
            self.store.save();
        });
    };
    LocalGeojsonStore.prototype = new EventEmitter();
    LocalGeojsonStore.localGeojsonStore = {};
    LocalGeojsonStore.yagaExtensionName = 'LocalGeojsonStore';

    LocalGeojsonStore.create = function (opts) {
        return new LocalGeojsonStore(opts);
    };

    yaga.registerExtension(LocalGeojsonStore);
    return LocalGeojsonStore;
});