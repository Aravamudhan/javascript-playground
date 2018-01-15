function objectCreate() {
    console.log("In objectCreate ....");
    var textObj = new String("Hello world");
    console.log(textObj);
    var textLiteral = "Hello JS";
    console.log(textLiteral);
    console.log(typeof textObj); //object
    console.log(typeof textLiteral); //string
    var isString = typeof String;
    var isLiteral = typeof "string";
    console.log(isString);
    console.log(isLiteral);
}

function functionsInObjects() {
    console.log("In functionsInObjects ....");
    var x = 102;
    var obj = {
        x: 20,
        foo: function foo() {
            console.log(x); //102 not 20
        }
    }
    obj.foo(); //2 Calling with a contextual object
    var fooRef = obj.foo;
    fooRef(); // 102
}

function objectProperties() {
    console.log("In objectProperties ....");
    var obj = {
        a: 2
    };
    console.log(obj["a"]);
    obj[true] = "foo";
    console.log(obj[true]);
    console.log(Object.getOwnPropertyDescriptor(obj, "a"));
    var myObj = {
        // The getter and setter for name written below will cause stack overflow
        // get name() {
        //     return this.name
        // },
        // set name(val){
        //     this.name = val
        // }  
        get name() {
            return this._name;
        },
        set name(val) {
            this.auditname = val;
            this._name = val;
        }

    };
    console.log('myObj.name', myObj.name);
    myObj.name = 'jon'
    console.log('after setting myObj.name to jon', myObj.name);
    console.log('myObj.auditname', myObj.auditname);
}

function getterSetterSample() {
    var myMovies = {
        movies: [],
        set movie(m) {
            this.movies.push(m)
        },
        get latest() {
            if (this.movies.length === 0) {
                return 'movie list empty'
            } else {
                return this.movies[this.movies.length - 1]
            }
        },
        get notifier() {
            return this.notifier = 'You have called the notifier'
        }
    };
    console.log(myMovies.latest);
    myMovies.movie = 'Bolt';// calls the setter for the property named movie
    myMovies.movie = 'Dark Knight Rises';
    myMovies.movie = 'Trumbo';
    console.log(myMovies.latest);// calls the getter for the latest
    console.log(myMovies.notifier);// calls the getter for the notifier
    var counterObj = {
        counterValue : 0,
        get count(){
            return this.counterValue++;
        },
        set count(countVal){
            // this.count = countVal causes stack overflow
            this.counterValue = countVal;
        }
    };
    console.log(counterObj.count);
    console.log(counterObj.count);
    console.log(counterObj.count);
    console.log(counterObj.count);
    counterObj.count = 100;
    console.log(counterObj.count);
    console.log(counterObj.count);
    console.log(counterObj.count);
    console.log(counterObj.count);
}

function prototypes() {
    console.log('In prototypes.....');
    let germanShepherd = { breed: 'german shepherd' };
    let dog1 = { name: 'bolt' };
    Object.setPrototypeOf(dog1, germanShepherd);
    console.log('The object', dog1);
    console.log('__proto__', dog1.__proto__);
    germanShepherd.color = 'brown';
    console.log('__proto__', dog1.__proto__);

    function prototypeTest1() {
        console.log('****In prototypeTest1');
    }
    prototypeTest1.a = 'a';
    console.log(prototypeTest1);
    console.log(prototypeTest1.prototype); // empty. Because we have not assigned anything to the prototype
    console.log('prototypeTest1.prototype.constructor', prototypeTest1.prototype.constructor);

}

function objectCreationThroughFunctions() {
    let foo = function() {
        console.log('I am foo');
    }
    let fooObj = new foo(); // This calls the function 'foo' and links its prototype to the fooObj
    console.log('fooObj', fooObj); // Just an empty object
    foo.prototype.a = 100;
    console.log('fooObj.a', fooObj.a); // What ever is added to the prototype of foo is reflected in fooObj
    fooObj.__proto__.b = 200;
    console.log(foo.prototype); // What ever is added to the __proto__ of the fooObj is reflected in foo
}

function shadowing() {
    console.log('In shadowing...');
    let animal = {
        name: 'animal',
        run: function() {
            console.log(this.name, 'running...');
        },
        sleep: function() {
            console.log(this.name, 'sleeping...');
        },
        makeSound: function() {
            console.log(this.name, 'is making sound');
        }
    };
    let dog = {
        name: 'dog',
        eat: function() {
            console.log(this.name, 'eating...');
        }
    }
    animal.run();
    dog.__proto__ = animal;
    dog.run(); // dog running
    Object.defineProperty(animal, 'run', { writable: false });
    dog.run = function() {
        console.log('Dog is bounding');
    };
    dog.run(); // dog running. Since the run function is found the prototype chain and has the writable:false
    animal.sleep(); // animal sleeping
    dog.sleep(); // dog sleeping
    animal.makeSound(); // animal is making sound
    dog.makeSound(); // dog is making sound
    dog.makeSound = function() {
        console.log('woof woof');
    };
    animal.makeSound(); // animal is making sound
    dog.makeSound(); // woof woof - The makeSound of dog shadows the makeSound of the animal. 
    // But animal's makeSound is not changed.
    dog.isAwesome = 'Ofcourse!!!'; // A new property
    console.log('Are dogs are awesome :', dog.isAwesome);
}

function inheritanceExample() {
    function Foo() {
        console.log('I am Foo');
    }
    Foo.prototype.a = 100;
    let o1 = new Foo();
    let o2 = new Foo();
    console.log('o1.a', o1.a);
    console.log('o2.a', o2.a);
    o1.a = 200;
    console.log('After changing o1.a to 200');
    console.log('o1.a', o1.a);
    console.log('o2.a', o2.a);
    console.log('o1', o1);
    console.log('o1.__proto__', o1.__proto__);

    function Bar(name) {
        this.name = name;
    }
    Bar.prototype.myName = function() {
        return this.name;
    }
    let b1 = new Bar('Jon');
    console.log('b1', b1);
    console.log('b1.__proto__', b1.__proto__);
    console.log('b1.myName()', b1.myName());
    console.log('Bar', Bar);
    console.log('Bar.prototype', Bar.prototype);
    console.log('b1 instanceof Bar ?', b1 instanceof Bar);
    console.log('o1 instanceof Foo ?', o1 instanceof Foo);
    console.log('o2 instanceof Foo ?', o2 instanceof Foo);
    // console.log('o1 instanceof o2 ?',o1 instanceof o2); Does not work. LHS should be object, RHS should be a function
    let b1Bar = Bar.bind(b1);
    console.log('b1.name before', b1.myName());
    b1Bar('Ron'); //'this' of this method is bound to the b1 object.
    console.log('b1.name after', b1.myName());
}

function anotherInheritanceExampleOOP() {
    function Foo(who) {
        this.me = who;
    }
    Foo.prototype.identify = function() {
        return "I am " + this.me;
    };

    function Bar(who) {
        Foo.call(this, who);
    }
    Bar.prototype = Object.create(Foo.prototype);

    Bar.prototype.speak = function() {
        console.log("Hello, " + this.identify() + ".");
    };

    var b1 = new Bar("b1");
    var b2 = new Bar("b2");

    b1.speak();
    b2.speak();

}

function inheritanceExampleOLOO1() {
    var obj1 = {
        init: function() {
            console.log('Initializing.....');
            this.count = 0;
        },
        increaseCount: function() {
            this.count++;
        },
        getCount: function() {
            return this.count;
        }
    };
    var obj2 = Object.create(obj1);
    obj2.init()
    console.log(obj2.getCount()); //0
    obj2.increaseCount();
    console.log(obj2.getCount()); //1
    obj1.increaseCount = function() {
        this.count = this.count * 10;
    }
    obj2.increaseCount();
    console.log(obj2.getCount()); //10
    obj1.init();
    console.log(obj1.getCount()); //0
}

function inheritanceExampleOLOO2() {
    // OLOO - Objects Linked to Other Objects - a delegation pattern
    var Foo = {
        init: function(who) {
            this.me = who;
        },
        identify: function() {
            return "I am " + this.me;
        }
    };
    var Bar = Object.create(Foo);
    Bar.speak = function() {
        console.log("Hello, " + this.identify() + ".");
    };
    var b1 = Object.create(Bar);
    b1.init("b1");
    var b2 = Object.create(Bar);
    b2.init("b2");
    b1.speak();
    b2.speak();
}
// objectCreate();
// objectCreationThroughFunctions();
// objectProperties();
getterSetterSample();
// functionsInObjects();
// prototypes();
// shadowing();
// inheritanceExample();
// anotherInheritanceExampleOOP();
// inheritanceExampleOLOO1();
// inheritanceExampleOLOO2();