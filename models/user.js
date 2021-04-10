const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: "Name must be entered" },
  phoneNo: { type: Number, required: "Your phone number is needed" },
  state: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: "Email must be entered" },
  password: String,
});

// const AdminUserSchema = new mongoose.Schema({
//     username: {type:String, required: true},
//     employeeId: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required:true}
// });

UserSchema.methods.validPassword = function (password) {
  return (this.password === password);
};
UserSchema.plugin(passportLocalMongoose);
// AdminUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
// module.exports = mongoose.model('AdminUser', AdminUserSchema);

// module.exports = {User, AdminUser};
