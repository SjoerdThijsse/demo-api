"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require("bcrypt-nodejs");

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, index: { unique: true } },
  username: { type: String, index: { unique: true } },
  password: String
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

  _bcryptNodejs2.default.genSalt(10, function (err, salt) {
    if (err) return next(err);

    _bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

var User = _mongoose2.default.model("User", UserSchema);

exports.default = User;