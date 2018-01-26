let resultBlock = document.querySelector(".result");
let searchBtn = document.querySelector(".search-btn");
let searchBlock = document.querySelector("input[name='search-box']");
searchBtn.addEventListener('click', function(e) {
    console.log("Searching", searchBlock.value);
    while (resultBlock.firstChild) {
        resultBlock.firstChild.remove();
    }
    fetch("/movies?search=" + searchBlock.value)
        .then(res => {
            if (res) {
                console.log(res);
                return res.json();
            } else {
                console.log("No results");
                return [];
            }
        })
        .then(movies => {
            searchBlock.value = "";
            movies.forEach(val => {
                let resultNode = document.createElement("p");
                resultNode.textContent = val["Title"];
                resultBlock.appendChild(resultNode);
            });
        });
});