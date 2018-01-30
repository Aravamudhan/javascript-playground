function spreadAndGather() {
	function fooSpread(x, y, z) {
		console.log('An array has been spread ***', x, y, z);
	}
	let ar = [10, 20, 30];
	fooSpread(...ar);
	// This gives the options of creating functions with multiple arguments
	function fooGather(...ar) {
		console.log('Multiple arguments combined into array ***', ar);
	}
	fooRest(100, 200, 300, 400);
	// Combines the arguments in to the array named 'ar'
	function fooSpreadGather(...ar) {
		// Now this is concatenating
		let food = ['Potato', 'Carrot', ...ar];
		console.log('Concatenating two arrays', food);
	}
	fooSpreadGather('Apple', 'Orange', 'Pineapple');
}
function defaultValues() {
	// The default values
	// The variables have their own scope here
	// Expressions are allowed too
	function foo(x = 10, y = x * 20) {
		console.log(x, y);
	}
	foo();
	foo(300);
	// This asks the function to use the default value of the 1st argument
	foo(undefined, 100);
}
function destructuring() {
	function foo() {
		return ['Apple', 'Orange', 'Pineapple'];
	}
	let [x, y, z] = foo();
	console.log(x, y, z);
	let name = "Fruits";
	let obj = {
		name, foo
	};
	console.log(obj.name, obj.foo());
	function bar() {
		return { a1: 101, a2: 102, a3: 103 };
	}
	// Here the a1,a2 and a3 are source and l,m and n are target
	// Unlike the usual target:source pattern, in destructuring it is source:target
	let { a1: l, a2: m, a3: n } = bar();
	console.log(l, m, n);
	// When ignoring the let we have to surround the expression with parenthesis
	// this is equivalent to an assignment expression without the var,let or const keyword
	({ a1: l1, a2: l2, a3: l3 } = bar());
	console.log(l1, l2, l3);
	let person = {
		fullName: "James Bond",
		age: "30",
		agentId: "007"
	};
	({ fullName, age, agentId } = person);
	console.log("Destructuring an object into distinct values:", fullName, age, agentId);
	let o1 = { a: 1, b: 2, c: 3 },
		o2 = {};
	// Here the pattern is "source:target" instead of the usual "target:source"
	// o1 is the provider and from the provider, we take properties, in our case they are a,b,c
	// finally they are assigned to the targets, in our case they are o2.x,o2.y.o2.z
	({ a: o2.x, b: o2.y, c: o2.z } = o1);
	console.log("-----Inverting target:source pattern-----");
	console.log("o1:", o1);
	console.log("( { a: o2.x, b: o2.y, c: o2.z } = o1 ); results in o2:", o2);
	console.log("-----");
	// console.log( o2.x, o2.y, o2.z );
	let x1 = 10, y1 = 20;
	// swapping variables without a temp
	console.log("Before:", x1, y1);
	[y1, x1] = [x1, y1];
	console.log("After:", x1, y1);
	// The empty slot notifies the engine to use the default value
	let [greeting = "Hello", greetingName = "World!"] = [, "007!"];
	console.log("Destructuring and default value:", greeting, greetingName);
}
function unpacking() {
	{
		console.log("----- Object to function argument -----");
		function userId({ id }) {
			return id;
		}
		// This is equivalent to 
		// ( {displayName, fullName:{firstName:name}} = user )
		// This gives two distinct values, 'displayName' and 'name'
		function whois({ displayName, fullName: { firstName: name } }) {
			console.log(displayName + ' is ' + name);
		}
		let user = {
			id: 42,
			displayName: 'jdoe',
			fullName: {
				firstName: 'John',
				lastName: 'Doe'
			}
		};
		console.log('userId: ' + userId(user)); // "userId: 42"
		whois(user); // "jdoe is John"
	}
	{
		let family = {
			name1: "Dalinar",
			name2: "Adolin",
			name3: "Shallan"
		};
		let members = [];
		console.log("----- Object to array:family to members -----");
		({ name1: members[0], name2: members[1], name3: members[2] } = family);
		console.log("Family:", family);
		console.log("Members:", members);
		console.log("----- Array to object:members to royalFamily -----");
		let royalFamily = {};
		[royalFamily.head, royalFamily.heir, royalFamily.heirWife] = members;
		console.log("Royal family:", royalFamily);
	}
	{
		console.log("----- Repeated assignments-----");
		// Destructuring allows the source property to be listed multiple times
		let s = { x: 100 };
		let { x: a, x: b } = s;
		console.log("Source:", s, "Target:", a, b);
		console.log("----- Another repeated assignment");
		let obj = {
			a: {
				b: [10, 20, 30],
				e: {
					greeting: "Hello"
				}
			},
			g: "Duh!!"
		};
		console.log("Now obj:", obj);
		let {
			a: {
				b: [b1, b2],
			e: f1
			},
			g
		} = obj;
		console.log(b1, b2, f1, g);
	}
	{
		console.log("----- Object/array values through completion");
		let o = { a: 10, b: 20, c: 30 }, a, b, c;
		// Here the properties of object 'o' gets assigned to the variables a,b,c
		// The RHS value of the object o is carried over till the completion of LHS
		({ a } = { b } = { c } = o);
		console.log(o, a, b, c);
		let obj = { i: 200, j: 400, k: 600 }, m, l, n, p;
		// Assigning values to the distinct variables as well as to the object
		p = { i: m, j: l, k: n } = obj;
		console.log(p, m, l, n);
	}
	{
		console.log("---- Assigning values selectively(and default values)");
		function getData() {
			return { name: "Lorem", id: 110, group: "Software development" };
		}
		console.log("---- Only few values");
		// For every variable, we assigned a default value
		// Also we did use the property group here. What this means is, 
		// we can selectively pick and assign values
		let { name = "Default name", id = "000", age = "1000", skill = "tech" } = getData();
		console.log("The data:", getData());
		console.log("The variables :", name, id, age, skill);
		let names = ["Hello", "JS", "Python", "NPM"];
		let languages = [];
		[, languages[0], languages[1]] = names
		console.log(languages);
	}
	{
		console.log("----- Nested objects/arrays");
		let obj1 = {
			a: {
				a1: "innerA1",
				a2: "innerA2"
			},
			b: ["arrayVal1", ["innerArray2", "innerArray2"], "arrayVal2"]
		};
		let {
			a: {
				a1: x1,
			a2: x2
			},
			b: [y, [y1, y2], z]
		} = obj1;
		console.log("The actual object:", obj1);
		console.log("The values extracted assigned to distinct variables");
		console.log(x1, x2, y, y1, y2, z);
	}
}
// spreadAndGather();
// defaultValues();
// destructuring();
unpacking();