const Importer = require('../importer');
const config = require('../../config/config');

let mockFs = null;
let mockEventEmitter = null;
let mockPJ = null;

console.log = jest.fn();

describe('Importer', () => {
  beforeEach(() => {
    mockFs = {
      readFile: jest.fn(),
      readFileSync: jest.fn(),
    };
    mockEventEmitter = {
      on: jest.fn(),
    };
    mockPJ = {
      render: jest.fn(),
    }
  });

  describe('Injected', () => {
    test('Importer should be injected', () => {
      const spyInject = jest.spyOn(Importer, 'inject');
      Importer.inject(config, mockFs, mockEventEmitter, mockPJ);

      expect(spyInject).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    let importer = null;

    beforeEach(() => {
      importer = Importer.inject(config, mockFs, mockEventEmitter, mockPJ);
    });

    describe('listen()', () => {
      test('EventEmitter should be called', () => {
        importer.listen();

        expect(mockEventEmitter.on).toHaveBeenCalled();
        expect(mockEventEmitter.on).toHaveBeenCalledWith(config.eventName, importer.import);
      });
    });

    describe('import()', () => {
      test('should be called once', () => {
        importer.import([
          'test'
        ]);

        expect(mockFs.readFile).toHaveBeenCalled();
        expect(mockFs.readFile).toHaveBeenCalledTimes(1);
      });

      test('should be throw Error', () => {
        mockFs.readFile = jest.fn(() => {
          throw new Error();
        });
        const spy = jest.spyOn(importer, 'import');

        importer.import([
          'test'
        ]);

        expect(mockFs.readFile).toHaveBeenCalled();
        expect(spy).toThrow();
      });
    });

    describe('importSync()', () => {
      test('should be called', () => {
        importer.importSync([
          'test'
        ]);

        expect(mockFs.readFileSync).toHaveBeenCalled();
      });
    });
  });
});