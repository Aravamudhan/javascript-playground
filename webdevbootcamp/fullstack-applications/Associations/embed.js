// ASSOCIATION BETWEEN OBJECTS THROUGH EMBEDDING
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/association_demo");
// POST(like a blogpost)
const postSchema = new mongoose.Schema({
    title:String,
    content:String
});
let Post = mongoose.model("Post",postSchema);
// USER
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    posts:[postSchema]
});
let User = mongoose.model("User",userSchema);
// SAVE A USER WITH MULTIPLE POSTS
let user = {
  name:"Reubus",
  email:"hagrid@hogwarts.edu",
  posts:[
     {
         title:"Ranging the forbidden forrest",
         content:"Ranging the forbidden forrest is a simple matter of taking Fang and annoucing to centaurs and"+
            "and other friends like Aragog's family"
     },
     {
         title:"Feeding Fang",
         content:"Fang drinks whiskey once in every fortnight and chicken for dinner everyday"
     }
    ]
};
User.create(user,(err,data)=>{
    if(err){
        console.error("Error saving",err);
    }else{
        console.log("Sucessfully created a user!!!!");
        console.log(data);
    }
});
