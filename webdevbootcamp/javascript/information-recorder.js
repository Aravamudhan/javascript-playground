function information(){
	var name = prompt("What is your name ?");
	var age = prompt("What is your age ?");
	alert("Your name is "+name);
	alert("Your age is "+age);
}
var infoButton = document.getElementById("information-button");
infoButton.addEventListener('click',information);
