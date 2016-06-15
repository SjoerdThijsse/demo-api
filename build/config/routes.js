"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require("../controllers/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = function Routes() {

  var users = (0, _users2.default)();

  var routes = function routes(app) {
    app.post("/", users.postUser);
    app.get("/:username", users.getUser);
    app.put("/:username", users.putUser);
    app.delete("/:username", users.deleteUser);
  };

  return { routes: routes };
};

exports.default = Routes;