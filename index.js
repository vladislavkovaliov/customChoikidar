const fs = require('fs');
const { EventEmitter } = require('events');
const path = require('path');
const prettyjson = require('prettyjson');

const config = require('./config/config');

const eventEmitter = new EventEmitter();
const DirWatcher = require('./src/dirWatcher').inject(config, fs, eventEmitter, path);
DirWatcher.watch({
  path: './data'
});

const Importer = require('./src/importer').inject(config, fs, eventEmitter, prettyjson);

Importer.listen();


