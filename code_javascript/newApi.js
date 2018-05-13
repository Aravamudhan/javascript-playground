function arrayOf() {
    console.log("----------------Arrays---------------");
    // Does not create an array with 10 as the only value
    // But creates an array with the length 10
    let a1 = Array(10);
    console.log(a1, a1.length);
    let a2 = Array.of(200);
    console.log(a2, a2.length);
}

function arrayFrom() {
    console.log("----------------Array from---------------");
    let a = {
        length: 3,
        0: 100
    };
    let a1 = Array.from(a);
    console.log(a1);
    // The 2nd argument to the from acts as a mapper function
    let a2 = Array.from(a, function mapper(val, index) {
        // Removing the empty slots and putting some default values
        if (!val) {
            return 0;
        }
        return val;
    });
    console.log(a2);
}

function copyWithin() {
    console.log("----------------Array#copyWithin---------------");
    let a = [11, 22, 33, 44, 55];
    console.log("Original :", a);
    // For a negative value, the actual index is calculated by length+(negative value)
    a.copyWithin(-1, 2);
    console.log("After a.copyWithin(-1,2) : ", a);
    a.copyWithin(0, 3);
    console.log("After a.copyWithin(0,3) : ", a);
    let b = [11, 22, 33, 44, 55];
    console.log("Original b:", b);
    b.copyWithin(2, 1);
    // The algorithm does not simply work from left to right.
    // When the targets overlap we might end up with same values if that is the case.
    // To avoid that the algorithm works in the reverse order starting from the right most
    // and moves towards left
    console.log("After b.copyWithin(2,1) : ", b);
}

function fill() {
    console.log("----------------Array#fill---------------");
    let a = [0, 1, 2];
    let obj = {
        name: "James",
        id: "007"
    };
    console.log("Before fill:", a);
    a.fill(obj, 1);
    console.log("After fill:", a);
    let b = [null, null, null, undefined, undefined];
    console.log("Before fill:", b);
    b.fill(0, 0);
    console.log("After fill:", b);
}

function find() {
    console.log("----------------Array#find and findIndex---------------");
    let persons = [{
        name: "John",
        age: 50
    }, {
        name: "Cathy",
        age: 20
    }, {
        name: "Maria",
        age: 35
    }, {
        name: "Reena",
        age: 26
    }];
    console.log(persons);
    let found = persons.find(ele => {
        if (ele) {
            if (ele.name == "Cathy") {
                return ele;
            }
        }
    });
    console.log("Found:", found);
    let index = persons.findIndex(ele => {
        if (ele) return ele.age == 26;
    });
    console.log("Index for a person with age 26:", index);
    let young = persons.some(ele => ele && ele.age < 25);
    console.log("Person whose age is < 25 ?", young);

}

function collectionsMethods() {
    console.log("----------Collection like methods----------");
    let a = [101, 202, 303, 404, 505, 606];
    console.log(":::", (a instanceof Array));
    // let values = [...a.values()];
    // console.log(values);
    let keys = a.keys();
    let it = keys.next();
    while (!it.done) {
        console.log(it);
        it = keys.next();
    }
    let entries = [...a.entries()];
    console.log(entries);
}

function objectApis() {
    console.log("----------Object.Is-----------");
    let a1 = NaN;
    let a2 = NaN;
    console.log("a1===a2:", a1 === a2);
    console.log("Object.is(a1,a2):", Object.is(a1, a2));
    console.log("----------Object.getOwnPropertySymbols-----------");
    let o1 = {
        name: "Jamie",
        [Symbol("symbol-prop")]: "Symbol property"
    };
    console.log(Object.getOwnPropertySymbols(o1));
    console.log("----------Object.setPrototypeOf----------");
    let p1 = {
        name: "p1",
        foo: function foo() {
            console.log("You have been fooed......:this:", this);
        }
    };
    let p2 = {
        name: "p2"
    }
    console.log(p1, p2);
    Object.setPrototypeOf(p2, p1);
    p2.foo();
    console.log("----------Object.assign----------");
    let target = {},
        ob1 = {
            a: 1
        },
        ob2 = {
            b: 2
        },
        ob3 = {
            c: 3
        },
        ob4 = {
            d: 4
        };
    // setup read-only property
    Object.defineProperty(ob3, "e", {
        value: 5,
        enumerable: true,
        writable: false,
        configurable: false
    });

    // setup non-enumerable property
    Object.defineProperty(ob3, "f", {
        value: 6,
        enumerable: false
    });

    ob3[Symbol("g")] = 7;

    // setup non-enumerable symbol
    Object.defineProperty(ob3, Symbol("h"), {
        value: 8,
        enumerable: false
    });
    Object.setPrototypeOf(ob3, ob4);
    // This copies, ob1.a, ob2.b. ob3.c, ob3.e, ob3[Symbol("g")]
    // This ignores non enumerable properties such as f and h
    // This ignores ob4.d too even though it is linked to ob3 in the prototype chain
    Object.assign(target, ob1, ob2, ob3);
    console.log(target);
    //     { a: { value: 1, writable: true, enumerable: true, configurable: true },
    //   b: { value: 2, writable: true, enumerable: true, configurable: true },
    //   c: { value: 3, writable: true, enumerable: true, configurable: true },
    //   e: { value: 5, writable: true, enumerable: true, configurable: true },
    //   [Symbol(g)]: { value: 7, writable: true, enumerable: true, configurable: true } }
    console.log(Object.getOwnPropertyDescriptors(target));
}
function numberApis() {
    console.log("----------Number.isNaN----------");
    let a ="hello";
    let n1 = 10/a;
    console.log(Number.isNaN(n1));
    console.log("isNaN('NaN'):",isNaN("NaN"));
    console.log("Number.isNaN('NaN')",Number.isNaN("NaN"));
    console.log("----------Number.isInteger----------");
    // Only problem with isInteger is, it will return true for 4.0, 4. also
    console.log("4.5:",Number.isInteger(4.5));
    console.log("4.0:",Number.isInteger(4.0));
    console.log("4:",Number.isInteger(4));
    console.log("4.:",Number.isInteger(4.));
    
}
// arrayOf();
// arrayFrom();
// copyWithin();
// fill();
// find();
// collectionsMethods();
// objectApis();
numberApis();