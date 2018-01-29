// ASSOCIATION BETWEEN OBJECTS THROUGH REFERENCE
const mongoose = require("mongoose"),
      Post = require("./model/post"),
      User = require("./model/user");
mongoose.connect("mongodb://localhost/association_demo_ref");

// SAVE A USER WITH MULTIPLE POSTS
let user = {
  name:"Hadrid",
  email:"hagrid@hogwarts.edu",
  posts:[
     
    ]
};
// SAVING 2 POSTS
const ran1 = Math.floor(Math.random()*2000);
const ran2 = Math.floor(Math.random()*2000);
let post1 = {
         title:"Ranging "+ran1,
         content:"Ranging is awesome. "+ran1
};
let post2 = {
         title:"Feeding Fang "+ran2,
         content:"Fang drinks whiskey once in every fortnight and chicken for dinner everyday. "+ran2
};
Post.create([post1,post2],(err,resultArray)=>{
    if(err){
        console.error("Error saving",err);
    }else{
        // Extract the _id of the saved posts and push the values to the posts array of the user model
        user.posts.push(...resultArray.map(r=>r._id));
        User.create(user,(err,data)=>{
            if(err){
                console.error("Error saving",err);
            }else{
                console.log("Sucessfully created a user!!!!");
                console.log(data);
            }
        });
    }
});
