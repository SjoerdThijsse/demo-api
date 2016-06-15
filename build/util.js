"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _global = require("./config/global");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Util = function Util() {

  var createEmptyFile = function createEmptyFile(path) {
    return _fs2.default.createWriteStream(path).end();
  };

  var createTemp = function createTemp() {
    if (!_fs2.default.existsSync(_global.global.tempDir)) _fs2.default.mkdirSync(_global.global.tempDir);
    if (_fs2.default.existsSync(_global.global.tempDir)) resetTemp();
  };

  var resetTemp = function resetTemp() {
    var tmpPath = arguments.length <= 0 || arguments[0] === undefined ? _global.global.tempDir : arguments[0];

    var files = _fs2.default.readdirSync(tmpPath);
    files.forEach(function (file) {
      var stats = _fs2.default.statSync(_path2.default.join(tmpPath, file));
      if (stats.isDirectory()) {
        resetTemp(file);
      } else if (stats.isFile()) {
        _fs2.default.unlinkSync(_path2.default.join(tmpPath, file));
      }
    });
  };

  var onError = function onError(errorMessage) {
    console.error(errorMessage);
    return new Error(errorMessage);
  };

  var search = function search(key, value) {
    return function (element) {
      return element[key] === value;
    };
  };

  return { createTemp: createTemp, onError: onError, search: search };
}; // Import the neccesary modules.


exports.default = Util;