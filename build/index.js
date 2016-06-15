"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cluster = require("cluster");

var _cluster2 = _interopRequireDefault(_cluster);

var _domain = require("domain");

var _domain2 = _interopRequireDefault(_domain);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _global = require("./config/global");

var _logger = require("./config/logger");

var _logger2 = _interopRequireDefault(_logger);

var _routes = require("./config/routes");

var _routes2 = _interopRequireDefault(_routes);

var _setup = require("./config/setup");

var _setup2 = _interopRequireDefault(_setup);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = function Index() {

  var util = (0, _util2.default)();

  var startAPI = function startAPI() {
    var logger = (0, _logger2.default)(console);
    var app = (0, _express2.default)();

    (0, _setup2.default)().setup(app, logger);
    (0, _routes2.default)().routes(app);

    if (_cluster2.default.isMaster) {
      logger.reset();

      util.createTemp();

      for (var i = 0; i < Math.min(_os2.default.cpus().length, _global.global.workers); i++) {
        _cluster2.default.fork();
      }_cluster2.default.on("exit", function (worker) {
        util.onError("Worker '" + worker.process.pid + "' died, spinning up another!");
        _cluster2.default.fork();
      });

      if (_global.global.master) {
        var scope = _domain2.default.create();
        scope.run(function () {
          return console.log("API started");
        });
        scope.on("error", function (err) {
          return util.onError(err);
        });
      }
    } else {
      app.listen(_global.global.port);
    }
  };

  return { startAPI: startAPI };
};

Index().startAPI();

exports.default = Index;