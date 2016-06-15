"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = function users() {

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET http://127.0.0.1:5001/{username}
  var getUser = function getUser(req, res) {
    var username = req.params.username;
    _User2.default.findOne({ username: username }).exec().then(function (user) {
      if (!user) return res.send("Found no user with username: '" + username + "'.");
      return res.json(user);
    }).catch(function (err) {
      return res.json(err);
    });
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X POST -d @demo-api-user1.json http://127.0.0.1:5001/
  var postUser = function postUser(req, res) {
    var _req$body = req.body;
    var first_name = _req$body.first_name;
    var last_name = _req$body.last_name;
    var email = _req$body.email;
    var username = _req$body.username;
    var password = _req$body.password;

    new _User2.default({ first_name: first_name, last_name: last_name, email: email, username: username, password: password }).save().then(function (user) {
      return res.send("Created user with username: '" + username + "'.");
    }).catch(function (err) {
      return res.status(500).json(err);
    });
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X PUT -d @demo-api-user2.json http://127.0.0.1:5001/{username}
  var putUser = function putUser(req, res) {
    var usernameToUpdate = req.params.username;
    var _req$body2 = req.body;
    var first_name = _req$body2.first_name;
    var last_name = _req$body2.last_name;
    var email = _req$body2.email;
    var username = _req$body2.username;
    var password = _req$body2.password;


    _User2.default.update({
      username: usernameToUpdate
    }, {
      first_name: first_name, last_name: last_name, email: email, username: username, password: password
    }).exec().then(function (user) {
      return res.send("Updated user with username: '" + usernameToUpdate + "'.");
    }).catch(function (err) {
      return res.status(500).json(err);
    });
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X DELETE http://127.0.0.1:5001/{username}
  var deleteUser = function deleteUser(req, res) {
    var username = req.params.username;
    _User2.default.remove({ username: username }).exec().then(function (user) {
      return res.send("Removed user with username: '" + username + "'.");
    }).catch(function (err) {
      return res.status(500).json(err);
    });
  };

  return {
    getUser: getUser,
    postUser: postUser,
    putUser: putUser,
    deleteUser: deleteUser
  };
};

exports.default = users;