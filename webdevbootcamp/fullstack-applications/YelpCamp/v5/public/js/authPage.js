function handleLoginBlock() {
    let inputBoxes = document.querySelectorAll(".box");
    let labels = document.querySelectorAll("div.block label");
    inputBoxes.forEach(function (box) {
        box.addEventListener("focus", function (e) {
            this.previousElementSibling.classList.add("top");
            this.parentElement.classList.add("highlight");
        });
        box.addEventListener("blur", function (e) {
            if (!this.value) {
                this.previousElementSibling.classList.remove("top");
            }
            this.parentElement.classList.remove("highlight");
        });
    });
    document.querySelector("#uname").focus();
}