const mongoose = require("mongoose");
const Post = require("./post");
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
userSchema.post("remove",function(doc){
    console.log("%s has been removed*******",doc.name);
    doc.posts.forEach(post=>{
        Post.findByIdAndRemove(post,err=>{
            if(err){
                console.log("A post is not removed");
            }else{
                console.log("Post is removed");
            }
        });
    });
});
let User = mongoose.model("User",userSchema);
module.exports = User;