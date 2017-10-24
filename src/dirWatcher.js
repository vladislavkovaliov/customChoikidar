const isEmptyArray = require('./shared/isEmptyArray');

module.exports.inject = (config, fs, EventEmitter, Path) => {
  const defaultDelay = 1000;

  return class DirWatcher {
    static watch(options) {
      const {
        path,
        delay = defaultDelay
      } = options;

      if (this.isValidPath(path)) {
        setTimeout(() => {
          fs.watch(path, this.onWatch(path, delay));
        }, delay);

        return true;
      }

      return false;
    }

    static isValidPath(path) {
      return path !== false;
    }

    static onWatch(path, delay) {
      return (event, file) => {
        if (event !== 'rename') throw new Error('Watch directory error.');

        if (file) {
          fs.readdir(path, this.onReadDir(path, delay));
        }
      }
    }

    static onReadDir(path, delay) {
      return (err, files) => {
        if (err) throw new Error('Read directory error.');

        if (isEmptyArray(files)) {
          const mapFiles = files.map(file => Path.resolve(path, file));

          EventEmitter.emit(config.eventName, mapFiles);
        } else {
          console.log('Directory is empty');
        }
      };
    }
  }
};
