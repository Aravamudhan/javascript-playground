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
	console.log("Starting moreDestructuring----------"); {
		console.log("----- Directly assigning an object returned from a function -----");

		function foo() {
			return ['Apple', 'Orange', 'Pineapple'];
		}
		let [x, y, z] = foo();
		console.log("The function call foo():", foo());
		console.log("let [x, y, z] = foo();x,y,z:", x, y, z);
		let name = "Fruits";
		let obj = {
			name,
			foo
		};
		console.log("let obj = { name, foo }:", obj);
	} {
		console.log("----- The source:target pattern -----");

		function bar() {
			return {
				a1: 101,
				a2: 102,
				a3: 103
			};
		}
		// Here the a1,a2 and a3 are source and l,m and n are target
		// Unlike the usual target:source pattern, in destructuring it is source:target
		let {
			a1: l,
			a2: m,
			a3: n
		} = bar();
		console.log("bar() returns", bar());
		console.log("The result of let { a1: l, a2: m, a3: n } = bar();l,m,n:", l, m, n);
		// When ignoring the let we have to surround the expression with parenthesis
		// this is equivalent to an assignment expression without the var,let or const keyword
		({
			a1: l1,
			a2: l2,
			a3: l3
		} = bar());
		console.log("The result of ({ a1: l1, a2: l2, a3: l3 } = bar());l1,l2,l3:", l1, l2, l3);
		let o1 = {
				a: 1,
				b: 2,
				c: 3
			},
			o2 = {};
		// Here the pattern is "source:target" instead of the usual "target:source"
		// o1 is the provider and from the provider, we take properties, in our case they are a,b,c
		// finally they are assigned to the targets, in our case they are o2.x,o2.y.o2.z
		({
			a: o2.x,
			b: o2.y,
			c: o2.z
		} = o1);
		console.log("o1:", o1);
		console.log("( { a: o2.x, b: o2.y, c: o2.z } = o1 );  o2:", o2);
	} {
		console.log("----- Destructuring an object into distinct values -----");
		let person = {
			fullName: "James Bond",
			age: "30",
			agentId: "007"
		};
		({
			fullName,
			age,
			agentId
		} = person);
		console.log("({ fullName, age, agentId } = person);fullName, age, agentId:", fullName, age, agentId);
	} {
		let x1 = 10,
			y1 = 20;
		console.log("-----Swapping variables without a temp-----");
		console.log("Before:", x1, y1);
		console.log("Doing [y1, x1] = [x1, y1];");
		console.log("After:", x1, y1);
	} {
		console.log("---- Destructuring and default values -----");
		// The empty slot notifies the engine to use the default value
		let [greeting = "Hello", greetingName = "World!"] = [, "007!"];
		console.log("let [greeting = 'Hello', greetingName = 'World!'] " +
			"= [, '007!'];greeting, greetingName :", greeting, greetingName);
	}
}

function moreDestructuring() {
	console.log("Starting moreDestructuring----------"); {
		console.log("----- Object to function argument -----");

		function userId({
			id
		}) {
			return id;
		}
		// This is equivalent to 
		// ( {displayName, fullName:{firstName:name}} = user )
		// This gives two distinct values, 'displayName' and 'name'
		function whois({
			displayName,
			fullName: {
				firstName: name
			}
		}) {
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
	} {
		let family = {
			name1: "Dalinar",
			name2: "Adolin",
			name3: "Shallan"
		};
		let members = [];
		console.log("----- Object to array:family to members -----");
		({
			name1: members[0],
			name2: members[1],
			name3: members[2]
		} = family);
		console.log("Family:", family);
		console.log("Members:", members);
		console.log("----- Array to object:members to royalFamily -----");
		let royalFamily = {};
		[royalFamily.head, royalFamily.heir, royalFamily.heirWife] = members;
		console.log("Royal family:", royalFamily);
	} {
		console.log("----- Repeated assignments-----");
		// Destructuring allows the source property to be listed multiple times
		let s = {
			x: 100
		};
		let {
			x: a,
			x: b
		} = s;
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
	} {
		console.log("----- Object/array values through completion");
		let o = {
				a: 10,
				b: 20,
				c: 30
			},
			a, b, c;
		// Here the properties of object 'o' gets assigned to the variables a,b,c
		// The RHS value of the object o is carried over till the completion of LHS
		({
			a
		} = {
			b
		} = {
			c
		} = o);
		console.log(o, a, b, c);
		let obj = {
				i: 200,
				j: 400,
				k: 600
			},
			m, l, n, p;
		// Assigning values to the distinct variables as well as to the object
		p = {
			i: m,
			j: l,
			k: n
		} = obj;
		console.log(p, m, l, n);
	} {
		console.log("---- Assigning values selectively(and default values)");

		function getData() {
			return {
				name: "Lorem",
				id: 110,
				group: "Software development"
			};
		}
		console.log("---- Only few values");
		// For every variable, we assigned a default value
		// Also we did use the property group here. What this means is, 
		// we can selectively pick and assign values
		let {
			name = "Default name", id = "000", age = "1000", skill = "tech"
		} = getData();
		console.log("The data:", getData());
		console.log("The variables :", name, id, age, skill);
		let names = ["Hello", "JS", "Python", "NPM"];
		let languages = [];
		[, languages[0], languages[1]] = names
		console.log(languages);
	} {
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
	} {
		console.log("----- Default value assignment and destructuring -----");

		function getNumberArray() {
			return [100, 200, 300];
		}
		let [x1 = 1, x2 = 2, x3 = 3, x4 = 4, x5 = 5] = getNumberArray();
		console.log("let [x1=1,x2=2,x3=3,x4=4,x5=5] = getNumberArray();x1,x2,x3,x4,x5:", x1, x2, x3, x4, x5);

		function getWordObjet() {
			return {
				name1: "James",
				name2: "Felix"
			};
		}
		// We are taking the object received from the getWordObject and assigning the properties
		// name1, name2 and name3 to agent1,2,3. Now if any of the name1,2,3 are not available
		// we have a default value 'MIA' assigned to the agent1,2,3 variables.
		let {
			name1: agent1 = 'MIA',
			name2: agent2 = 'MIA',
			name3 = agent3 = 'MIA'
		} = getWordObjet();
		console.log("Object destructuring with default values");
		console.log("let { name1: agent1='MIA', name2: agent2='MIA', name3: agent3='MIA' }" +
			"= getWordObjet(); agent1, agent2, agent3 :", agent1, agent2, agent3);
	} {
		// Confusing destructuring
		// Avoid this kind of complexity
		let x = 200,
			y = 300,
			z = 100;
		var o1 = {
			x: {
				y: 42
			},
			z: {
				y: z
			}
		};

		({
			y: x = {
				y: y
			}
		} = o1);
		({
			z: y = {
				y: z
			}
		} = o1);
		({
			x: z = {
				y: x
			}
		} = o1);
		console.log(x.y, y.y, z.y);

		let m = 20;
		let o = {
			l: 100
		};
		({
			l: m = {
				a: 300
			}
		} = o);
		console.log(m);
	} {
		console.log("----- Destructuring default and default function parameters -----");
		console.log("Function signature with de-defaults:f1([x1=10,x2=20,...xR],{y1=100,y2=200})");
		// 1st argument receives an array with atleast 2 values
		// 2nd argument receives an object with properties y1,y2
		function f1([x1 = 10, x2 = 20, ...xR], {
			y1 = 100,
			y2 = 200
		}) {
			console.log(x1, x2, xR, y1, y2);
		}
		console.log("Call f1 with f1([11,22,33,44,55],{y1:500,y2:600});");
		f1([11, 22, 33, 44, 55], {
			y1: 500,
			y2: 600
		});
		// 1st argument expects an object with a propery named x with a destructuring default value 10
		// and function default value as an empty object
		// 2nd argument expects an object with a parameter y, and default function default being {y:20}
		function f2({
			x = 10
		} = {}, {
			y
		} = {
			y: 20
		}) {
			console.log(x, y);
		}
		console.log("f2()");
		f2();
		console.log("f2({x:300},{y:400})");
		f2({
			x: 300
		}, {
			y: 400
		});
		console.log("f2({},{})");
		f2({}, {});
		console.log("f2({z:30})");
		f2({
			z: 30
		})
		console.log("f2(400)");
		f2({
			z: 30
		})
	} {
		console.log("----- Destructered and restructered -----");
		console.log("***** Assigning default properties to an objet " +
			"only when those properties don't exist*****");
		// The default properties
		let defaults = {
			options: {
				remove: true,
				enable: false,
				instance: {
					flag: true,
					name: "default"
				}
			},
			log: {
				warn: true,
				error: true
			}
		};

		function getInitialConfig() {
			return {
				options: {
					remove: false,
					instance: null
				}
			};
		}
		console.log("Default ", defaults);
		// The conventional way
		// We have to check if a property exists and if it does not, assign values from the 
		// defaults. Otherwise don't change
		function getConventionalConfig(config) {
			// Assign options
			config.options = config.options || {};
			// Check every property now
			config.options.remove = (config.options.remove !== undefined) ?
				config.options.remove : defaults.options.remove;
			config.options.enable = (config.options.enable !== undefined) ?
				config.options.enable : defaults.options.enable;
			config.options.instance = (config.options.instance !== undefined) ?
				config.options.instance : defaultStatus.options.instance;
			// Assign log
			config.log = config.log || {};
			config.log.warn = (config.log.warn !== undefined) ?
				config.log.warn : defaults.log.warn;
			config.log.error = (config.log.error !== undefined) ?
				config.log.error : defaults.log.error;
			return config;
		}
		console.log("After assigning values :", getConventionalConfig(getInitialConfig()));

		function getImprovedConfig(config) {
			console.log("Improved config assignment through ES6");
			// Assign options
			config.options = config.options || {};
			// Assign log
			config.log = config.log || {};
			// Using ES6 destructuring and default values
			// Jumping hoops and hurdles here. Not exactly bettern than the previous approach
			// Destructuring the config object and assigning its values to itself
			({
				// Destructuring of the properties of config here
				options: {
					// Restructuring of config object here
					// If there is a property named, say, config.options.remove then
					// its value is assigned back to itself. Other it is taken from
					// defaults.option.remove
					remove: config.options.remove = defaults.options.remove,
					enable: config.options.enable = defaults.options.enable,
					instance: config.options.instance = defaults.options.instance
				} = {},
				log: {
					warn: config.log.warn = defaults.log.warn,
					error: config.log.error = defaults.log.error
				} = {}
			} = config);
			console.log(config);
		}
		getImprovedConfig(getInitialConfig()); {
			console.log("----- Some examples -----");
			let user = {
				p1: "val1",
				o1: {
					op1: "oval1",
				},
				o2: {
					op2: "oval2"
				}
			};
			console.log("Target object :", user);
			let defaultUser = {
				p1: "dval1",
				p2: "dval2",
				p3: "dval3",
				o1: {
					op1: "doval1"
				},
				o2: {
					op2: "doval2",
					op3: "doval3"
				},
				o3: {
					op4: "doval4"
				}
			};
			console.log("Default object :", defaultUser);
			console.log("Merging of user and defaultUser.....");
			let {
				p1: p1 = defaultUser.p1,
				p2: p2 = defaultUser.p2,
				p3: p3 = defaultUser.p3,
				o1: {
					op1: op1 = defaultUser.o1.op1
				} = {},
				o2: {
					op2: op2 = defaultUser.o2.op2,
					op3: op3 = defaultUser.o2.op3
				} = {},
				o3: {
					op4: op4 = defaultUser.o3.op4
				} = {}
			} = user;
			user = {
				p1,
				p2,
				p3,
				o1: {
					op1
				},
				o2: {
					op2,
					op3
				},
				o3: {
					op4
				}
			};
			console.log(p1, p2, p3, op1, op2, op3);
			console.log("After merging : ", user);

		} {
			console.log("----- The merging -----");
			let config = getInitialConfig();
			// Improved configuration assignment version 2
			// merge `defaults` into `config`
			console.log("Before:", config);
			// destructure the config (with default value assignments)
			let {
				// options here belongs to config
				// source : target pattern
				// Nested destructuring
				options: {
					// Create temporary variables as well as use default parameters
					// If there is a property named "options" is present, an empty
					// object is used as default object
					remove = defaults.options.remove,
					enable = defaults.options.enable,
					instance = defaults.options.instance
				} = {}, // This empty is used if there is not object named options
				log: {
					warn = defaults.log.warn,
					error = defaults.log.error
				} = {} // Empty object handles the possiblity of logs not being present
			} = config;
			// restructure
			config = {
				options: {
					remove,
					enable,
					instance
				},
				log: {
					warn,
					error
				}
			};
			console.log("After:", config);
		} {
			console.log("----- Simple nested destructuring -----");
			let def = {
				a: {
					a1: 10,
					a2: 20
				},
				b: {
					b1: {
						b11: 100,
						b12: 200
					}
				}
			};
			let main = {
				a: {
					a2: 21
				},
				c: {
					c1: 500
				}
			};
			console.log("def object :", def);
			console.log("main object :", main);
			console.log("----- Merging def and main -----"); {
				// Lot of destructuring and default values
				let {
					// Destructuring
					a: {
						// Destructuring as well as default values
						a1: a1 = def.a.a1,
						a2: a2 = def.a.a2
					} = {}, // If no 'a' property in main, then assign an empty object
					b: {
						b1: {
							b11: b11 = def.b.b1.b11,
							b12: b12 = def.b.b1.b12
						} = {}
					} = {},
					c: {
						c1: c1 = def.c.c1
					} = {}
				} = main;
				// Restructuring
				// At the end of all the destructuring above, we will have a bunch local variables
				main = {
					a: {
						a1: a1,
						a2: a2
					},
					b: {
						b1: {
							b11: b11,
							b12: b12
						}
					},
					c: {
						c1: c1
					}
				};
			}
			console.log("Final result main:", main);
		}
	}
}

function conciseFunctions() {
	console.log("-----conciseFunctions----- ");

	function fooBar() {
		console.log('I am fooBar', this.name);
	}
	let obj1 = {
		name: 'I am obj1',
		// No lexical name
		foo() {
			console.log('foo:I belong to ', this.name);
		},
		// The lexical name is bar
		bar: function bar() {
			console.log('I am bar');
		},
		// Concise method assignment
		fooBar
	};
	obj1.foo();
	obj1.bar();
	obj1.fooBar();
}

function computedPropertyNames() {
	console.log('In computedPropertyNames');
	let prefix = "user";
	let obj = {
		[prefix + "Name"]: 'Default name'
	}
	console.log(obj);
}

function templateLiterals() {
	console.log('-----templateLiterals-----');
	let user = 'Amu';
	let greet = `Hello ${user}`;
	console.log(greet);
	let sum = `Sum of 5+5 is ${5+5}`;
	console.log(sum);
	console.log('-----Multiple lines-----');
	let words = `
			I am a multi line
			word.
			And I am awesome too!!!
		`;
	console.log(words);

	function upper(s) {
		return s.toUpperCase();
	}
	let myHome = 'to my humble abode!';
	let greetAgain = `Hello! ${upper("welcome")} ${upper(myHome)}`;
	console.log(greetAgain);
}

function taggedTemplateLiterals() {
	{
		console.log('taggedTemplateLiterals..........');

		function foo(text, value) {
			console.log('text', text);
			console.log('value', value);
			return 'Template is processed.';
		}
		let desc = 'awesome';
		let result = foo `Template strings are ${desc} to work with!!`;
		console.log(result);
	} {
		console.log('Simple fallthrough function-----');

		function transform(strings, ...values) {
			return strings.reduce((accumulator, value, index) => {
				let templateValue = values[index]
				return accumulator.concat(value || '').concat(templateValue || '');
			}, '');
		}
		let name = 'Ghost';
		let age = 2;
		let breed = 'direwolf';
		let result = transform `${name} is a ${breed} and aged ${age} years`;
		console.log(result);
	} {
		console.log('Formatting money.........');
		// Simply adding the dollar sign to all the numbers
		// We are going to assume that any number that we encounter is pointing to a money value
		function formatMoney(strings, ...values) {
			// Somestimes the words could be more and the values could be less. Sometime they might be vice versa.
			if (strings.length > values.length) {
				return strings.reduce((accumulator, text, index) => {
					let templateValue = values[index]
					return accumulator.concat(text || '').concat(templateValue ? '$' + templateValue : '');
				}, '');
			} else {
				return values.reduce((accumulator, value, index) => {
					let templateValue = values[index];
					return accumulator.concat(value || '').concat(templateValue ? '$' + templateValue : '');
				}, '');
			}
		}
		let food = 100;
		let house = 300;
		let expense1 = 50;
		let expense2 = 40;
		let expense3 = 80;
		let total = formatMoney `Food costs ${food}, house costs ${house} and other big expenses this month are ${expense1}, ${expense2}, ${expense3}`;
		console.log(total);
	} {
		console.log('Sanitizing data......');
		let badWords = ['xyz', 'abc', 'ijk'];

		function sanitize(strings, ...values) {
			return strings.reduce((accumulator, text, index) => {
				let templateValue = values[index]
				return accumulator.concat(text || '').concat((templateValue && badWords.indexOf(templateValue) < 0) ? templateValue : '');
			}, '');
		}
		let w1 = 'xyz';
		let w2 = 'abc';
		let w3 = 'ijk';
		let w4 = 'nice';
		console.log('Before........');
		console.log(w1);
		console.log(w2);
		console.log(w3);
		console.log(w4);
		console.log('After.........');
		w1 = sanitize `I say ${w1}`;
		w2 = sanitize `I say ${w2}`;
		w3 = sanitize `I say ${w3}`;
		w4 = sanitize `I say ${w4}`;
		console.log(w1);
		console.log(w2);
		console.log(w3);
		console.log(w4);
	}
}

function arrowFunctions() {
	let o1 = {
		name: 'I am the NAME!',
		wrongIntro: () => this.name, // There will be no this variable, hence will return undefined
		intro: function () {
			return this.name;
		}
	};
	console.log('Because of wrongly used arrow function:', o1.wrongIntro());
	console.log('Correct usage:', o1.intro());
}

function forOf() {
	const names = ['James', 'Ron', 'Harry'];
	console.log('Testing for..of...............');
	console.log('Array');
	for (name of names) {
		console.log(name);
	}
	console.log('String');
	const text = 'awesome';
	for (t of text) {
		console.log(t);
	}
}
// spreadAndGather();
// defaultValues();
// destructuring();
// moreDestructuring();
// conciseFunctions();
// computedPropertyNames();
// templateLiterals();
// taggedTemplateLiterals();
// arrowFunctions();
forOf();