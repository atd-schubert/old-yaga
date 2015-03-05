map.on('dragstart', function () {
    if (yaga.Toolbar.toolsbars.header.status === "hide") {
        return;
    }
    yaga.Toolbar.toolsbars.header.hide();
    yaga.Toolbar.toolsbars.footer.hide();
    map.once('dragend', function () {
        yaga.Toolbar.toolsbars.header.show();
        yaga.Toolbar.toolsbars.footer.show();
    });
});
map.on('click', function () {
    yaga.Toolbar.toolsbars.header.toggle();
    yaga.Toolbar.toolsbars.footer.toggle();
});