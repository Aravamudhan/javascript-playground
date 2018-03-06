const express = require('express'),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    router = express.Router({
        mergeParams: true
    }),
    loginMiddleWare = require("./loginUtility");

function createComment(req, res) {
    console.log('Creating a new comment ', req.body);
    let id = req.params.id;
    let comment = req.body;
    let commentResponse = {};
    Campground.findById(id, (err, campgroundResult) => {
        let errorMsg;
        if (!campgroundResult) {
            errorMsg = `Can not find the campground with id: ${id}`;
            console.log(errorMsg);
            commentResponse.error = errorMsg;
            res.status(404).json(commentResponse);
        } else if (err) {
            errorMsg = `Error in finding the campground with id: ${id}`;
            console.log(errorMsg);
            commentResponse.error = err;
            res.status(500).json(commentResponse);
        }
        Comment.create(comment, function (err, commentResult) {
            if (err || !commentResult) {
                errorMsg = `Error creating the comment: ${comment}`;
                console.log(errorMsg);
                console.log(err);
                commentResponse.error = err;
                res.status(500).json(commentResponse);
            } else {
                campgroundResult.comments.push(commentResult._id);
                campgroundResult.save();
                console.log("Created new comment and added to the campground", commentResult);
                res.json(commentResult);
            }
        });
    });
}
router.post("/", loginMiddleWare.isLoggedInAjax, createComment);
module.exports = router;