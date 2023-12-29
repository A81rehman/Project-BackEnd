var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
Name: String,
Email: String,
UserName: String,
Password: String,
DateofBirth: Date,
role:{
    type: String,
    default: "user",
},
});

UserSchema.methods.generateHashedPassword = async function(){
    let salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password,salt);
};
var Users = mongoose.model("User", UserSchema);
module.exports = { Users };
