const DirWatcher = require('../dirWatcher');
const config = require('../../config/config');

let mockFs = null;
let mockEventEmitter = null;
let mockPJ = null;
let mockPath = null;

console.log = jest.fn();

describe('DirWatcher', () => {
  beforeEach(() => {
    mockFs = {
      readFile: jest.fn(),
      readFileSync: jest.fn(),
      readdir: jest.fn(),
      watch: jest.fn(),
    };
    mockEventEmitter = {
      on: jest.fn(),
      emit: jest.fn(),
    };
    mockPJ = {
      render: jest.fn(),
    }

    mockPath = {
      resolve: jest.fn(),
    };
  });


  describe('Injected', () => {
    test('DirWatcher should be injected', () => {
      const spyInject = jest.spyOn(DirWatcher, 'inject');
      DirWatcher.inject(config, mockFs, mockEventEmitter, mockPath);

      expect(spyInject).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    let dirWatcher = null;


    beforeEach(() => {
      dirWatcher = DirWatcher.inject(config, mockFs, mockEventEmitter, mockPath);
    });

    describe('watch()', () => {
      test('should be called', () => {
        const spy = jest.spyOn(dirWatcher, 'isValidPath');

        dirWatcher.watch({
          path: './data',
        });

        // TODO: jest.runTimersToTime() needs investigate

        expect(spy).toHaveBeenCalled();
      });

      test('should return false if path is invalid', () => {
        const spy = jest.spyOn(dirWatcher, 'isValidPath');

        dirWatcher.watch({
          path: false,
        });

        // TODO: jest.runTimersToTime() needs investigate

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('isValidPath()', () => {
      test('should return true if path is valid', () => {
        const isValid = dirWatcher.isValidPath('./data');

        expect(isValid).toBeTruthy();
      })

      test('should return false if path is invalid', () => {
        const isValid = dirWatcher.isValidPath(false);

        expect(isValid).toBeFalsy();
      })
    });

    describe('onWatch()', () => {
      test('should return function', () => {
        const watch = dirWatcher.onWatch('./path', 1000);
        watch('rename', 'file');

        expect(watch).toBeInstanceOf(Function);
        expect(mockFs.readdir).toHaveBeenCalled();
      });
    });

    describe('onReadDir()', () => {
      test('should return function', () => {
        const watch = dirWatcher.onReadDir('./path', 1000);
        watch(null, [1,2,3,4]);

        expect(watch).toBeInstanceOf(Function);
        expect(mockPath.resolve).toHaveBeenCalled();
        expect(mockEventEmitter.emit).toHaveBeenCalled();
      });

      test('should call console.log', () => {
        const watch = dirWatcher.onReadDir('./path', 1000);
        watch(null, []);

        expect(watch).toBeInstanceOf(Function);
        expect(console.log).toHaveBeenCalled();
      });
    });
  });
});