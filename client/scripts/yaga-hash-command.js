/*globals define, window*/

define('yaga-hash-command', ['yaga-core', 'EventEmitter'], function YagaDummy(yaga, EventEmitter, L) {
    'use strict';
    var HashCommand, commands;
    commands = [];

    HashCommand = function YagaHashCommand(opts) {
        commands.push(this);
        opts = opts || {};
        if (!opts.regExp || typeof opts.regExp.test !== 'function') {
            throw new Error('YagaHashCommand has to have a regExp as RegExp within its argument object.');
        }
        if (typeof opts.command !== 'function') {
            throw new Error('YagaHashCommand has to have a command as Function within its argument object.');
        }

        if (opts.name) {
            HashCommand.hashCommand[opts.name] = this;
        }

        this.run = function (hash) {
            if (this.regExp.test(hash)) {
                this.emit('run', hash);
                this.command(hash, this);
            }
        };
        this.command = opts.command;
        this.regExp = opts.regExp;
    };
    HashCommand.prototype = new EventEmitter();
    HashCommand.hashCommand = {};
    HashCommand.yagaExtensionName = 'HashCommand';

    HashCommand.create = function (opts) {
        return new HashCommand(opts);
    };

    window.addEventListener('hashchange', function () {
        var i;
        for (i = 0; i < commands.length; i += 1) {
            commands[i].run(window.location.hash);
        }
    }, false);

    yaga.registerExtension(HashCommand);
    return HashCommand;
});