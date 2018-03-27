const express = require('express'),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    router = express.Router({
        mergeParams: true
    }),
    middlewares = require("../middleware");

function createComment(req, res) {
    console.log("Creating a new comment");
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
        comment.author = {
            username: req.user.username,
            id: req.user._id
        };
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
                console.log("Created new comment and added to the campground");
                res.status(200).json(commentResult);
            }
        });
    });
}

function getComments(req, res) {
    let id = req.params.id;
    Campground.findById(id).populate("comments").exec((err, campground) => {
        if (err || !campground) {
            errorMsg = "Error finding the comments and campground";
            console.log(err);
            let commentResponse = {
                error: err
            };
            res.status(404).json(commentResponse);
        } else {
            let comments = campground.comments.map(comment => {
                let result = {
                    author: {
                        username: comment.author.username
                    },
                    _id: comment._id,
                    text: comment.text
                };
                return result;
            });
            // We are sending the current logged-in user's username along with the response
            // This is needed to check the ownership and enable/disable the edit,update buttons of the comments
            let currentUser;
            if (res.locals.currentUser) {
                currentUser = res.locals.currentUser.username;
            }
            let responseObj = {
                comments,
                currentUser
            }
            res.status(200).json(responseObj);
        }
    });
}

function updateComment(req, res) {
    let commentObj = req.body;
    Comment.findByIdAndUpdate(commentObj._id, {
        text: commentObj.text
    }, {
        new: true // This option must be set to return the modified document rather than the original
    }, (err, updatedComment) => {
        if (err || !updatedComment) {
            errorMsg = "Error finding the comments and campground";
            console.log(err);
            let commentResponse = {
                error: err
            };
            res.status(404).json(commentResponse);
        }
        console.log("Updated comment ", updatedComment);
        let commentResult = {
            author: {
                username: updatedComment.author.username
            },
            _id: updatedComment._id,
            text: updatedComment.text
        };
        res.status(200).json(commentResult);
    });
}

function deleteComment(req, res) {
    let commentId = req.body._id;
    let campgroundId = req.params.id;
    // 1. Find the campground and make sure there is no error
    // 2. Remove the commentId from the campground
    // 3. When the commentId reference is removed from the campground successfully, now the remove
    // the actual document from the database
    Campground.findById(campgroundId, (err, result) => {
        // (1)
        if (err) {
            console.log(err);
            errorMsg = "Error finding the campground to delete the comment";
            let commentResponse = {
                error: errorMsg
            };
            res.status(404).json(commentResponse);
        } else {
            // (2)
            Campground.update(result, {
                "$pull": {
                    "comments": commentId
                }
            }, (err, updatedCampground) => {
                if (err) {
                    console.log(err);
                    errorMsg = "Error in deleting the comment from the campground";
                    let commentResponse = {
                        error: err
                    };
                    res.status(500).json(commentResponse);
                } else {
                    // (3)
                    Comment.findByIdAndRemove(commentId, err => {
                        if (err) {
                            console.log(err);
                            errorMsg = "Error finding and deleting the comment";
                            let commentResponse = {
                                error: err
                            };
                            res.status(404).json(commentResponse);
                        }
                        res.status(200).json({
                            message: "Comment deleted successfully and removed from the campground"
                        });
                    });
                }
            });
        }
    });
}

router.post("/", middlewares.isLoggedInAjax, createComment);
router.put("/", middlewares.checkCommentAuthorization, updateComment);
router.get("/", getComments);
router.delete("/", middlewares.checkCommentAuthorization, deleteComment);
module.exports = router;