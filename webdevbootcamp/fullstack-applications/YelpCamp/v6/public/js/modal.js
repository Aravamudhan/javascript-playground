let modal = document.querySelector(".modal");
let close = document.querySelector(".close");

function setupFailureModal() {
    close.addEventListener("click", function (e) {
        modal.style.display = "none";
    });
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function openLoginModal() {
    modal.style.display = "block";
}