const mongoose = require('mongoose');
const Comment = require("./comment");
const campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});
// Middleware that gets called after the remove function
// This is necessary to perform "cascade delete" of a campground
// when ever a campground gets removed all the comments in that campground should also be removed
campgroundSchema.post("remove", function (campground) {
    campground.comments.forEach(comment => {
        Comment.findByIdAndRemove(comment, err => {
            if (err) {
                console.log("Error in removing the %s comment:[%s]", comment, err);
            }
        });
    });
});
const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;