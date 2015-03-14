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
        this.store.data.name = opts.name;
        this.layer = yaga.GeojsonLayer.create(this.store.data);

        this.layer.on('change', function () {
            console.log("change", self.store.data.features[0].geometry.coordinates);
            self.store.data = self.layer.getData();
            console.log("change", self.store.data.features[0].geometry.coordinates);
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