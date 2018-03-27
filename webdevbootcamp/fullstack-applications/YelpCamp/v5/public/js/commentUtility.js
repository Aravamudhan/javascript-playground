let currentLoggedInUser;

function getAllComments() {
    getRequest(window.location.href + "/comments", (response) => {
        let responseObject = JSON.parse(response);
        let comments = responseObject.comments;
        currentLoggedInUser = responseObject.currentUser;
        comments.forEach(function (obj) {
            createCommentBlock(obj);
        });
    }, (error) => {
        console.log(error);
    });
}

function setupComments() {
    let commentArea = document.querySelector('#comment-area');

    function saveComment(e) {
        let commentObj = {
            'text': commentArea.value,
        };
        postRequest(window.location.href + '/comments', JSON.stringify(commentObj), data => {
            console.log('Comment created:', data);
            commentArea.value = '';
            createCommentBlock(JSON.parse(data));
        }, error => {
            commentArea.value = '';
            errorComment(error);
            console.log('Failed to create a comment:', error);
        });
    }

    function errorComment(errorObj) {
        openLoginModal();
    }
    let addCommentBtn = document.querySelector('#comment-add');
    addCommentBtn.addEventListener('click', saveComment);
}

function createCommentBlock(commentObj) {
    if (commentObj) {
        let authorName = commentObj.author ? commentObj.author.username : "Anonymous user";
        let commentContainer = document.querySelector('.comment-container');
        let commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');
        let editButton = "",
            deleteButton = "",
            updateButton = "",
            cancelButton = "";
        // Enabling the buttons only when the current logged-in user matches 
        // the author name of a particular comment
        if (currentLoggedInUser && currentLoggedInUser == authorName) {
            editButton = "<a class='btn btn-warning edit-comment-btn'>Edit</a>";
            deleteButton = "<a class='btn btn-danger delete-comment-btn'>Delete</a>";
            updateButton = "<a class='btn btn-primary update-comment-btn'>Update</a>";
            cancelButton = "<a class='btn btn-warning cancel-comment-btn'>Cancel</a>";
        }
        commentBox.innerHTML =
            `<div class="comment-body">
                <span class="tip tip-left"></span>
                <div class="message">
                    <div class="message-info">
                        <strong>${authorName}</strong>
                        ${editButton}
                        ${deleteButton}
                        ${updateButton}
                        ${cancelButton}
                        <p class="pull-right">10 days ago</p>
                    </div>
                    <span class="display-comment" data-id="${commentObj._id}">${commentObj.text}</span>
                    <textarea class="form-control .form-control-lg edit-comment" id="comment-area-edit" rows="3" placeholder="Add your review"></textarea>
                </div>
            </div>`;
        commentContainer.prepend(commentBox);
    }
}

function setupCommentButtons() {
    liveByClass("edit-comment-btn", "click", function (e) {
        let editArea;
        let displayArea;
        this.parentNode.parentNode.childNodes.forEach(function (node) {
            if (node && node.classList && node.classList.contains("edit-comment")) {
                editArea = node;
                editArea.style.display = "inline-block";
            } else if (node && node.classList && node.classList.contains("display-comment")) {
                displayArea = node;
                displayArea.style.display = "none";
            }
        });
        editArea.value = displayArea.innerHTML;
        console.log(editArea.innerHTML, displayArea.innerHTML);
        let deleteButton = this.nextElementSibling;
        // Enable the update button
        let updateButton = this.nextElementSibling.nextElementSibling;
        updateButton.style.display = "inline-block";
        let cancelButton = updateButton.nextElementSibling;
        cancelButton.style.display = "inline-block";
        // Disable the edit and delete buttons
        this.style.display = "none";
        deleteButton.style.display = "none";
    });
    liveByClass("update-comment-btn", "click", function (e) {
        let editArea;
        let displayArea;
        this.parentNode.parentNode.childNodes.forEach(function (node) {
            if (node && node.classList && node.classList.contains("edit-comment")) {
                editArea = node;
                editArea.style.display = "none";
            } else if (node && node.classList && node.classList.contains("display-comment")) {
                displayArea = node;
                displayArea.style.display = "inline-block";
            }
        });
        editComment(editArea.value, displayArea);
        editArea.innerHTML = "";
        editArea.value = "";
        let deleteButton = this.previousElementSibling;
        let updateButton = deleteButton.previousElementSibling;
        let cancelButton = this.nextElementSibling;
        deleteButton.style.display = "inline-block";
        updateButton.style.display = "inline-block";
        cancelButton.style.display = "none";
        this.style.display = "none";
    });
    liveByClass("delete-comment-btn", "click", function (e) {
        let displayArea;
        this.parentNode.parentNode.childNodes.forEach(function (node) {
            if (node && node.classList && node.classList.contains("display-comment")) {
                displayArea = node;
            }
        });
        deleteComment(displayArea);
    });
    liveByClass("cancel-comment-btn", "click", function (e) {
        let editArea;
        let displayArea;
        this.parentNode.parentNode.childNodes.forEach(function (node) {
            if (node && node.classList && node.classList.contains("edit-comment")) {
                editArea = node;
                editArea.style.display = "none";
            } else if (node && node.classList && node.classList.contains("display-comment")) {
                displayArea = node;
                displayArea.style.display = "inline-block";
            }
        });
        editArea.innerHTML = "";
        let updateButton = this.previousElementSibling;
        let deleteButton = updateButton.previousElementSibling;
        let editButton = deleteButton.previousElementSibling;
        deleteButton.style.display = "inline-block";
        editButton.style.display = "inline-block";
        this.style.display = "none";
        updateButton.style.display = "none";
    });
}

function editComment(comment, displayArea) {
    let commentObj = {
        _id: displayArea.dataset.id,
        text: comment
    };
    putRequest(window.location.href + '/comments', JSON.stringify(commentObj), data => {
        console.log('Comment created:', data);
        let comment = JSON.parse(data);
        displayArea.innerHTML = comment.text;
    }, error => {
        console.log('Failed to create a comment:', error);
    });
}

function deleteComment(displayArea) {
    let commentObj = {
        _id: displayArea.dataset.id
    }
    deleteRequest(window.location.href + '/comments', JSON.stringify(commentObj), data => {
        let commentBody = displayArea.parentNode.parentNode;
        let commentBox = commentBody.parentNode;
        commentBox.removeChild(commentBody);
    }, error => {
        console.log(error);
    });
}