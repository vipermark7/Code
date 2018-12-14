'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStandaloneBuilds = undefined;

let getStandaloneBuilds = exports.getStandaloneBuilds = (() => {
  var _ref = _asyncToGenerator(function* ({ id, platform, limit, slug }) {
    const user = yield (_User || _load_User()).default.ensureLoggedInAsync();
    const api = (_ApiV || _load_ApiV()).default.clientForUser(user);
    const params = { id, slug, platform, limit, status: 'finished' };
    const { builds } = yield api.getAsync('standalone-build/get', params);
    return id || limit === 1 ? (_lodash || _load_lodash()).default.first(builds) : builds;
  });

  return function getStandaloneBuilds(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash;

function _load_lodash() {
  return _lodash = _interopRequireDefault(require('lodash'));
}

var _ApiV;

function _load_ApiV() {
  return _ApiV = _interopRequireDefault(require('./ApiV2'));
}

var _User;

function _load_User() {
  return _User = _interopRequireDefault(require('./User'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=__sourcemaps__/StandaloneBuild.js.map
