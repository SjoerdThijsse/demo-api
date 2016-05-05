import bcrypt from "bcrypt"
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String
});

UserSchema.pre("save", function(next) {
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  this.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
