const mongoose = require("mongoose");
// USER
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    // We are saying that there is a property named posts and 'posts' is an array of object ids
    posts:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
});
let User = mongoose.model("User",userSchema);
module.exports = User;