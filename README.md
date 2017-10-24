# Custom Chokidar
The purpose of this repositories is to demonstrate one of ways how to do homework.

### Installation
Dillinger requires [Node.js](https://nodejs.org/) v7+ to run.
Install the dependencies and devDependencies and start.

```sh
$ cd customChokidar
$ npm install
$ npm start
```

For test...

```sh
$ npm test
```

For test coverage...

```sh
$ npm test:coverage
```

### Coverage
```
Ran all test suites matching /.\/src\/test\/importer.test.js/i.
--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
All files     |    73.68 |        0 |    77.78 |    73.68 |                |
 config       |      100 |      100 |      100 |      100 |                |
  config.js   |      100 |      100 |      100 |      100 |                |
 src          |    72.22 |        0 |    77.78 |    72.22 |                |
  importer.js |    72.22 |        0 |    77.78 |    72.22 | 13,14,17,24,26 |
--------------|----------|----------|----------|----------|----------------|

Ran all test suites matching /.\/src\/test\/dirWatcher.test.js/i.
------------------|----------|----------|----------|----------|----------------|
File              |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------------|----------|----------|----------|----------|----------------|
All files         |    88.89 |    72.73 |       90 |    95.83 |                |
 config           |      100 |      100 |      100 |      100 |                |
  config.js       |      100 |      100 |      100 |      100 |                |
 src              |     87.5 |    72.73 |    88.89 |    95.24 |                |
  dirWatcher.js   |     87.5 |    72.73 |    88.89 |    95.24 |             15 |
 src/shared       |      100 |      100 |      100 |      100 |                |
  isEmptyArray.js |      100 |      100 |      100 |      100 |                |
------------------|----------|----------|----------|----------|----------------|
```

## NON PRODUCTION

