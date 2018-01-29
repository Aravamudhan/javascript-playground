const mongoose = require("mongoose");
// POST(like a blogpost)
const postSchema = new mongoose.Schema({
    title:String,
    content:String
});
let Post = mongoose.model("Post",postSchema);
// We can export only one thing. It could be an object, a function or single value
module.exports = Post;