"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressWinston = require("express-winston");

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _sprintf = require("sprintf");

var _sprintf2 = _interopRequireDefault(_sprintf);

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _global = require("./global");

var _package = require("../../package.json");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = function Logger(console) {

  if (!_fs2.default.existsSync(_global.global.tempDir)) _fs2.default.mkdirSync(_global.global.tempDir);

  var checkEmptyMessage = function checkEmptyMessage(args) {
    if (args.message === "" && Object.keys(args.meta).length !== 0) args.message = JSON.stringify(args.meta);

    return args;
  };

  var consoleFormatter = function consoleFormatter(args) {
    var levelColor = "";
    switch (args.level) {
      case "error":
        levelColor = "\x1b[31m";
        break;
      case "warn":
        levelColor = "\x1b[33m";
        break;
      case "info":
        levelColor = "\x1b[36m";
        break;
      case "debug":
        levelColor = "\x1b[34m";
        break;
      default:
        levelColor = "\x1b[36m";
        break;
    }

    args = checkEmptyMessage(args);
    return (0, _sprintf2.default)("\u001b[0m[%s] " + levelColor + "%5s:\u001b[0m %2s/%d: \u001b[36m%s\u001b[0m", new Date().toISOString(), args.level.toUpperCase(), _package2.default.name, process.pid, args.message);
  };

  var fileFormatter = function fileFormatter(args) {
    args = checkEmptyMessage(args);
    return JSON.stringify({
      name: _package2.default.name,
      pid: process.pid,
      level: args.level,
      msg: args.message,
      time: new Date().toISOString()
    });
  };

  var logger = new _winston2.default.Logger({
    transports: [new _winston2.default.transports.Console({
      name: _package2.default.name,
      formatter: consoleFormatter,
      handleExceptions: true,
      prettyPrint: true
    }), new _winston2.default.transports.File({
      filename: _global.global.tempDir + "/" + _package2.default.name + ".log",
      level: "warn",
      json: false,
      formatter: fileFormatter,
      maxsize: 5242880,
      handleExceptions: true
    })],
    exitOnError: false
  });

  var expressLogger = new _expressWinston2.default.logger({ winstonInstance: logger, expressFormat: true });

  console.log = function (msg) {
    return logger.info(msg);
  };
  console.error = function (msg) {
    return logger.error(msg);
  };
  console.warn = function (msg) {
    return logger.warn(msg);
  };
  console.info = function (msg) {
    return logger.info(msg);
  };
  console.debug = function (msg) {
    return logger.debug(msg);
  };

  var reset = function reset() {
    if (_fs2.default.existsSync(_global.global.tempDir + "/" + _package2.default.name + ".log")) _fs2.default.unlinkSync(_global.global.tempDir + "/" + _package2.default.name + ".log");
  };

  return { expressLogger: expressLogger, logger: logger, reset: reset };
};

exports.default = Logger;