function spreadAndGather() {
	function fooSpread(x,y,z) {
		console.log('An array has been spread ***',x,y,z);
	}
	let ar = [10,20,30];
	fooSpread(...ar);
	// This gives the options of creating functions with multiple arguments
	function fooGather(...ar) {
		console.log('Multiple arguments combined into array ***',ar);
	}
	fooRest(100,200,300,400);
	// Combines the arguments in to the array named 'ar'
	function fooSpreadGather(...ar) {
		// Now this is concatenating
		let food = ['Potato','Carrot',...ar];
		console.log('Concatenating two arrays',food);
	}
	fooSpreadGather('Apple','Orange','Pineapple');
}
function defaultValues() {
	// The default values
	// The variables have their own scope here
	// Expressions are allowed too
	function foo(x=10,y=x*20){
		console.log(x,y);
	}
	foo();
	foo(300);
	// This asks the function to use the default value of the 1st argument
	foo(undefined, 100);
}
function destructuring() {
	function foo(){
		return ['Apple','Orange','Pineapple'];
	}
	let [x,y,z] = foo();
	console.log(x,y,z);
	let name = "Fruits";
	let obj = {
		name,foo
	};
	console.log(obj.name, obj.foo());
	function bar() {
		return {a1:101,a2:102,a3:103};
	}
	// Here the a1,a2 and a3 are source and l,m and n are target
	// Unlike the usual target:source pattern, in destructuring it is source:target
	let {a1:l,a2:m,a3:n} = bar();
	console.log(l,m,n);
	// When ignoring the let we have to surround the expression with parenthesis
	// this is equivalent to an assignment expression without the var,let or const keyword
	({a1:l1,a2:l2,a3:l3} = bar());
	console.log(l1,l2,l3);
	let o1 = { a: 1, b: 2, c: 3 },
	o2 = {};
	( { a: o2.x, b: o2.y, c: o2.z } = o1 );
	console.log( o2.x, o2.y, o2.z );
	let x1 = 10, y1 = 20;
	// swapping variables without a temp
	[ y1, x1 ] = [ x1, y1 ];
	console.log( x1, y1 );	
}
// spreadAndGather();
// defaultValues();
destructuring();