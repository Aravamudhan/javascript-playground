function guessTheColor() {
    let colors = [];
    let selectedColor;
    let squares;
    let message;
    let newColors;
    let headerTag;
    // Hard mode = 6, Easy mode = 3
    let mode = 6;
    let modeButtons;

    squares = document.querySelectorAll(".square");
    message = document.querySelector("#message");
    headerTag = document.querySelector("header");
    modeButtons = document.querySelectorAll(".mode-button");
    newColors = document.querySelector("#new-colors");
    newColors.addEventListener("click", initColors);

    initColors();

    function getColor() {
        return colors[Math.floor(Math.random() * mode)];
    }

    function changeColor(targetColor) {
        headerTag.style.backgroundColor = targetColor;
        squares.forEach(function(tag) {
            tag.style.backgroundColor = targetColor;
        });
    }

    function initColors() {
    	// For hard mode 6 squares should be displayed
    	// For easy mode 3 squares should be displayed
    	for(let i=0; i < mode; i++){
    		squares[i].style.display="block";
    	}
    	for(let i=mode; i<squares.length; i++){
    		squares[i].style.display="none";
    	}
    	headerTag.style.backgroundColor = "#3f79b1";
    	message.textContent = "";
    	newColors.textContent = "New colors"
        for (let i = 0; i < mode; i++) {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            colors[i] = `rgb(${r}, ${g}, ${b})`;
        }
        selectedColor = getColor();
        console.log("The selectedColor",selectedColor);
        squares.forEach(function(tag, index) {
            tag.style.backgroundColor = colors[index];
            tag.addEventListener("click", function(e) {
                if (selectedColor == colors[index]) {
                    message.textContent = "Correct";
                    newColors.textContent = "Play again?"
                    changeColor(selectedColor);
                } else {
                    this.style.backgroundColor = "#222222";
                    message.textContent = "Try again";
                }
            });
        });
        document.querySelector("#selected-color span").textContent = selectedColor;
    }

    for(let i=0;i<modeButtons.length;i++){
    	modeButtons[i].addEventListener("click",function(){
    		modeButtons[0].classList.remove("selected");
    		modeButtons[1].classList.remove("selected");
    		this.classList.add("selected");
    		mode = Number(this.dataset.modeval);
    		initColors()
    	});
    }
}