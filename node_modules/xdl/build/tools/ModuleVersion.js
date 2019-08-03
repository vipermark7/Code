'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModuleVersionChecker = undefined;

var _latestVersion;

function _load_latestVersion() {
  return _latestVersion = _interopRequireDefault(require('latest-version'));
}

var _pTimeout;

function _load_pTimeout() {
  return _pTimeout = _interopRequireDefault(require('p-timeout'));
}

var _semver;

function _load_semver() {
  return _semver = _interopRequireDefault(require('semver'));
}

var _FsCache;

function _load_FsCache() {
  return _FsCache = require('./FsCache');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function createModuleVersionChecker(name, currentVersion) {
  let checkAsync = (() => {
    var _ref2 = _asyncToGenerator(function* () {
      const { latestVersion } = yield UpdateCacher.getAsync();
      return {
        updateIsAvailable: (_semver || _load_semver()).default.gt(latestVersion, currentVersion),
        latest: latestVersion,
        current: currentVersion
      };
    });

    return function checkAsync() {
      return _ref2.apply(this, arguments);
    };
  })();

  const UpdateCacher = new (_FsCache || _load_FsCache()).Cacher(_asyncToGenerator(function* () {
    return { latestVersion: yield (0, (_pTimeout || _load_pTimeout()).default)((0, (_latestVersion || _load_latestVersion()).default)(name), 2000) };
  }), `${name}-updates.json`, 24 * 60 * 60 * 1000 // one day
  );

  return { checkAsync };
}

exports.createModuleVersionChecker = createModuleVersionChecker;
//# sourceMappingURL=../__sourcemaps__/tools/ModuleVersion.js.map
