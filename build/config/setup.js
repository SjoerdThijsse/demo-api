"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _responseTime = require("response-time");

var _responseTime2 = _interopRequireDefault(_responseTime);

var _global = require("./global");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Setup = function Setup() {

  var connectMongoDB = function connectMongoDB() {
    _mongoose2.default.Promise = _global.global.Promise;
    _mongoose2.default.connect("mongodb://" + _global.global.dbHosts.join(",") + "/users", {
      db: {
        native_parser: true
      },
      replset: {
        rs_name: "users_repl",
        connectWithNoPrimary: true,
        readPreference: "nearest",
        strategy: "ping",
        socketOptions: {
          keepAlive: 1
        }
      },
      server: {
        readPreference: "nearest",
        strategy: "ping",
        socketOptions: {
          keepAlive: 1
        }
      }
    });
  };

  var setup = function setup(app, logger) {
    connectMongoDB();

    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(_bodyParser2.default.json());
    app.use((0, _compression2.default)({ threshold: 1400, level: 4, memLevel: 3 }));
    app.use((0, _responseTime2.default)());
    app.use(logger.expressLogger);
  };

  return { setup: setup };
};

exports.default = Setup;