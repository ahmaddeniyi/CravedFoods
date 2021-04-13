const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: "Name must be entered" },
  phoneNo: { type: Number, required: "Your phone number is needed" },
  state: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: "Email must be entered" },
  isAdmin: {type: Boolean, default: false},
  password: String
});

UserSchema.methods.validPassword = function (password) {
  return (this.password === password);
};

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);