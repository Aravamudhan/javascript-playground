var counter = 0;
onmessage = function (e) {
	console.log('Received message["',e.data,'"]');
	if(e.data){
		if(e.data.command==='start'){
			console.log("Starting the work");
			console.log('Work is inprogress...........');
			while(counter<10000000){
				counter++;
			}	
			setTimeout(function () {
				console.log('Work completed',counter);
			},5000);
		}
		if(e.data.command==='end'){
			console.log("This is the end");
			postMessage('Counter is '+counter);
		}
	}
}