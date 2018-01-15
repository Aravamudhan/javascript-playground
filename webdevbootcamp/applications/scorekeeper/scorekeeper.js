var p1Button = document.getElementById("p1");
var p2Button = document.getElementById("p2");
var resetButton = document.getElementById("reset");
var p1Score = 0;
var p2Score = 0;
var reset = 0;
var p1ScoreBoard = document.getElementById("p1score")
var p2ScoreBoard = document.getElementById("p2score");
var completed = false;
var winningScoreSelector = document.getElementById("winningScoreSelector");
var winningScoreDisplay = document.getElementById("winningScoreDisplay");
var winningScore = winningScoreSelector.valueAsNumber;
console.log(winningScore);
p1Button.addEventListener("click", function() {
    if (completed === true) {
        return;
    }
    p1Score++;
    p1ScoreBoard.textContent = p1Score;
    console.log(p1Score,winningScore);
    if (p1Score === winningScore) {
        p1ScoreBoard.style.color = "green";
        completed = true;
    }
});
p2Button.addEventListener("click", function() {
    if (completed === true) {
        return;
    }
    p2Score++;
    p2ScoreBoard.textContent = p2Score;
    if (p2Score === winningScore) {
        p2ScoreBoard.style.color = "green";
        completed = true;
    }
});
resetButton.addEventListener("click", function() {
    p1ScoreBoard.textContent = 0;
    p2ScoreBoard.textContent = 0;
    p1ScoreBoard.style.color = "black";
    p2ScoreBoard.style.color = "black";
    completed = false;
    p1Score = 0;
    p2Score = 0;
    winningScore = 5;
    winningScoreSelector.value = winningScore;
    winningScoreDisplay.textContent = winningScore;
});
winningScoreSelector.addEventListener("change",function(e){
	winningScore = this.valueAsNumber;
	winningScoreDisplay.textContent = winningScore;
});
