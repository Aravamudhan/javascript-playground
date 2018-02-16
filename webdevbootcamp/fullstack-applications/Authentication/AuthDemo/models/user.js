const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
// This line basically adds functionality to the userSchema object
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);