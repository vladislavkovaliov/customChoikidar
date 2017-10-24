module.exports.inject = (config, fs, EventEmitter, PrettyJson) => {
  return class Importer {
    static listen() {
      const { eventName } = config;

      EventEmitter.on(eventName, this.import)
    }

    static import(paths) {
      const array = paths.map(file => {
        return new Promise((res, rej) => {
          fs.readFile(file, { encoding: config.encoding }, (err, data) => {
            if (err) {
              throw new Error('Async read error.');
            }

            res(data);
          });
        });
      });

      Promise.all(array)
        .then((data) => {
          console.log(PrettyJson.render(data.join()));

          return data.join();
        })
    }

    static importSync(paths) {
      const results = [];

      paths.forEach(path => {
         results.push(fs.readFileSync(path, { encoding: config.encoding }));
      });

      console.log(PrettyJson.render(results.join()));

      return results.join();
    }
  };
};