function setupComments() {
    let commentArea = document.querySelector('#comment-area');

    function createComment(e) {
        let commentObj = {
            'text': commentArea.value,
            'author': 'Anonymous'
        };
        postRequest(window.location.href + '/comments', JSON.stringify(commentObj), data => {
            console.log('Comment created:', data);
            commentArea.value = '';
            addComment(JSON.parse(data));
        }, error => {
            commentArea.value = '';
            errorComment(error);
            console.log('Failed to create a comment:', error);
        });
    }

    function errorComment(errorObj) {
        openModal();
    }

    function addComment(commentObj) {
        if (commentObj) {
            let authorName = commentObj.author;
            if (!authorName) {
                authorName = 'Anonymouse user';
            }
            let commentContainer = document.querySelector('.comment-container');
            let commentBox = document.createElement('div');
            commentBox.classList.add('comment-box');
            commentBox.innerHTML =
                `<div class="comment-body">
                    <strong>${authorName}</strong>
                    <p class="pull-right">10 days ago</p>
                    <span class="tip tip-left"></span>
                    <div class="message">
                        <span>
                            ${commentObj.text}
                        </span>
                    </div>
                </div>`;
            console.log(commentBox);
            commentContainer.prepend(commentBox);

        }
    }
    let addCommentBtn = document.querySelector('#comment-add');
    addCommentBtn.addEventListener('click', createComment);
}