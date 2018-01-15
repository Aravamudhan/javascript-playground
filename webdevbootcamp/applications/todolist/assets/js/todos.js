// Check off
// on will add event listeners to the future events too
// But a listener should be added to an existing tag
// ul exists at the start. Here we are asking to add
// listeners to the children of ul which are li
$('ul').on('click', 'li', function(e) {
    // if li is gray make it black
    $(this).toggleClass('completed');

});
// Click on X to delete a todo
$('ul').on('click', 'li span', function(e) {
    $(this).parent('li').fadeOut(500, function() {
        $(this).remove();
    })
    e.stopPropagation();
});
$('input[type="text"]').keypress(function(e) {
    if (e.which === 13) {
        let todoTask = $(this).val();
        $(this).val("");
        $('ul').append(`<li><span><i class="fa fa-trash"></i></span>${todoTask}</li>`);

    }
});
$('h1 i').on('click', function() {
    $('input[type="text"]').toggleClass('hide');
    if (document.querySelector('.fa-plus')) {
        this.classList.remove('fa-plus');
        this.classList.add('fa-minus');
    } else {
        this.classList.remove('fa-minus');
        this.classList.add('fa-plus');
    }
});