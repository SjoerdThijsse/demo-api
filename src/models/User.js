import bcrypt from "bcrypt-nodejs"
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {type: String, index: {unique: true}},
  username: {type: String,index: {unique: true}},
  password: String
});

UserSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

export default User;
