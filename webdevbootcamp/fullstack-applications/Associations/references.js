// ASSOCIATION BETWEEN OBJECTS THROUGH REFERENCE
const mongoose = require("mongoose"),
    Post = require("./model/post"),
    User = require("./model/user");
mongoose.connect("mongodb://localhost/association_demo_ref");

// SAVE A USER WITH MULTIPLE POSTS
let user = {
    name: "Hadrid",
    email: "hagrid@hogwarts.edu",
    posts: [

    ]
};
// SAVING 2 POSTS
const ran1 = Math.floor(Math.random() * 2000);
const ran2 = Math.floor(Math.random() * 2000);
let post1 = {
    title: "Ranging " + ran1,
    content: "Ranging is awesome. " + ran1
};
let post2 = {
    title: "Feeding Fang " + ran2,
    content: "Fang drinks whiskey once in every fortnight and chicken for dinner everyday. " + ran2
};
let createdUser;
Post.create([post1, post2], (err, resultArray) => {
    if (err) {
        console.error("Error saving", err);
    } else {
        // Extract the _id of the saved posts and push the values to the posts array of the user model
        user.posts.push(...resultArray.map(r => r._id));
        User.create(user, (err, data) => {
            if (err) {
                console.error("Error saving", err);
            } else {
                console.log("Sucessfully created a user!!!!");
                createdUser = data;
                User.findOne(createdUser._id, (err, userResult) => {
                    if (err) {
                        console.log("Some error happend during the delete", err);
                    } else {
                        userResult.remove();
                    }
                });
            }
        });
    }
});
// Create a new document
// And then add a sub document
let blogger = {
    name: "Dumbledore",
    email: "dd@hogwarts.edu",
    posts: [

    ]
};
// SAVING 2 POSTS
let post3 = {
    title: "Magic " + ran1,
    content: "Magic is awesome. Can't live without it." + ran1
};
let post4 = {
    title: "Transfiguration today " + ran2,
    content: "Transfiguration today is a great book." + ran2
};
// 1. Create one user 
// 2. Create two posts and then add those posts as references to the user
// 3. Remove the 1st post's reference from the user
User.create(blogger, (err, data) => {
    if (err) {
        console.error("Error saving", err);
    } else {
        console.log("Successfully created a blogger:", data);
        Post.create([post3, post4], (err, results) => {
            data.posts.push(...results.map(r => r._id));
            data.save(err => {
                if (err) {
                    console.log("Error adding posts to blogger");
                } else {
                    console.log("Successfully added posts:", data);
                    console.log("Now going to remove the post.........", data.posts[0]);
                    User.update(data, {
                        "$pull": {
                            "posts": data.posts[0]
                        }
                    }, (err, result) => {
                        if (err) {
                            console.log("Error removing the 1st item", err);
                        } else {
                            console.log("Successfully removed the 1st item");
                            User.findById(data._id, (err, finalResult) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Final result", finalResult);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
});