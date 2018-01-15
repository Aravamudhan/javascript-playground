function firstPromise() {
    let myFirstPromise = new Promise((resolve, reject) => {
        reject("Something was wrong!"); // Yay! Everything went well!
        resolve('Awesome mate');
    });

    myFirstPromise.then((successMessage) => {
        console.log("Yay! " + successMessage);
    }, (failureMessage) => {
        console.log("Huhhh! " + failureMessage);
    });
}

function randomNumberHandler(number) {
    let handler = new Promise(function(resolve, reject) {
        if (number < 50) {
            reject("The number is too low. The number is " + number);
        } else {
            resolve("The number is perfect. The number is " + number);
        }
    });
    return handler;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function randomNumbers() {
    let num = getRandomNumber();
    let numPromise = randomNumberHandler(num);
    numPromise.then(function(s) {
        console.log('Success');
        console.log(s);
    }, function(f) {
        console.log('Failure');
        console.log(f);
    });
    console.log('Promise resolution. Resolve or Reject.');
}

function promiseChains() {
    // Chaining the promises
    // Here every step has to wait for its previous step to finish.
    // This is incredibly powerful as even async events are handled correctly.
    function delay(time) {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, time * 1000);
        });
    }
    delay(1).then(function(s) {
        console.log("1st promise with timeout", 1);
        delay(2);
    }).then(function(s) {
        console.log("2nd promise with timeout", 2);
        delay(3);
    }).then(function(s) {
        console.log("Final promise with timeout", 3);
    });
}

function wrongPromise() {
    // The object is thenable but not a promise here.
    var p = {
        // 1st argument is resolve
        // 2nd argument is reject
        // Does not matter which name we give
        then: function(cb, errcb) {
            cb(42);
            errcb("evil laugh");
        }
    };
    if (isPromise(p) === true) {
        // Even though p is not a correct promise, it behaves like a promise
        p.then(
            function fulfilled(val) {
                console.log(val); // 42
            },
            function rejected(err) {
                // oops, shouldn't have run
                console.log(err); // evil laugh
            }
        );
    }
    // To truly establish trust use Promise.resolve(p). 
    // This function returns a promise from a thenable object/function
    if (isPromise(p) === true) {
        Promise.resolve(p).then(function success(s) {
            console.log('Great success', s);
        }, function failure(f) {
            console.log('Not nice', f);
        });
    }

}
// An utility that checks if a function is a promise
function isPromise(p) {
    // This is called duck typing. If it quakes like a duck and if it looks like a duck, then it must be duck
    // In this pattern we assume the type of an object or function by performing checks for certain functions
    // or properties that a type must have
    if (
        p !== null &&
        (
            typeof p === "object" ||
            typeof p === "function"
        ) &&
        typeof p.then === "function"
    ) {
        return true;
    } else {
        return false;
    }
}
// This function returns a promise. 
function promiseRequest(url) {
    // This is not a promise enabled utility
    var request = require('request');
    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (response && (response.statusCode >= 200 && response.statusCode < 300)) {
                resolve(body);
            } else {
                reject(body)
            }
        })
    });
}
// One ajax request is made and based on the response another request is made. All without callback hell
function promisChainsAjax() {
    promiseRequest("https://reqres.in/api/users?page=2")
        .then(function(response) {
            console.log('Success');
            let data = JSON.parse(response)['data'];
            // Take the 1st result from the response
            let firstResult = data[0];
            // console.log(firstResult);
            let id = firstResult['id'];
            console.log("Requesting for the user with id", id);
            // Request again for the 1st result
            return promiseRequest("https://reqres.in/api/users/" + id);
        }, function(failure) {
            console.log('Failed', failure);
        }).then(function(response) {
            console.log("Got the user");
            console.log(response);
        }, function(failure) {
            console.log("Failed to get the user");
        });
    // var request = require('request');
    // request('https://reqres.in/api/users?page=1', function(error, response, body) {
    //     // console.log('error:', error); // Print the error if one occurred
    //     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     // console.log('body:', body);
    //     console.log(response);
    // });
}

function samplePromise() {
    var p1 = Promise.resolve(42);
    p1.then(function(resolved) {
        console.log('resolved', resolved);
    }, function(rejected) {
        console.log(rejected);
    });
    // Create a promise with the rejected state
    var p2 = Promise.reject("OOPS, I am rejected");
    // The resolve here will see the p2 to be a thenable(i.e.)another promise. Then it will try to return the underlying
    // state of the p2 promise. Which is in the rejected state here.
    var p3 = Promise.resolve(p2);
    // p3 has a promise object which is in the rejected state
    p3.then(function(success) {
        console.log("I will never be executed", success);
    }, function(failure) {
        console.log("Hello there!", failure);
    });
    let success = function(s) {
        console.log("Succeeded", s);
    };
    let failure = function(f) {
        console.log("Rejected", f);
    };
    // Testing to see what happens when you pass an empty array to race method.
    Promise.race([]).then(success, failure);
    console.log("---Testing the multiple resolve calls---");
    let counter = 0;
    let p4 = new Promise(function(resolve, reject) {
        // Only once the resolve is called.
        resolve(++counter);
        resolve(++counter);
        resolve(++counter);
    });
    p4.then(function(fullfilled) {
        console.log("I am fullfilled", fullfilled);
    }, function(rejected) {
        console.log("I am rejected", rejected);
    });
    p4.then(function(fullfilled) {
        console.log("I am fullfilled again", fullfilled);
    }, function(rejected) {
        console.log("I am rejected again", rejected);
    });

}

function promiseAll() {
    let p1 = promiseRequest("https://reqres.in/api/users?page=1");
    let p2 = promiseRequest("https://reqres.in/api/users?page=2")
    let fulfilled = function fulfilled(f) {
        // The f is an array of "array of objects"(i.e.) p1 returns an array of objects as response
        // and same goes for p2. The f is array that contains the response of both p1 and p2 in the
        // array format
        // After both the promises are full filled, we take the 1st object from both responses
        let dataOne = JSON.parse(f[0])['data'];
        let dataTwo = JSON.parse(f[1])['data'];
        // Take the 1st result from the 1st response
        let firstResult = dataOne[0];
        // Take the 1st result from the 2nd response
        let secondResult = dataTwo[0];

        let idOne = firstResult['id'];
        let idTwo = secondResult['id'];
        console.log("Requesting for the user with id", idOne);
        let u1 = promiseRequest("https://reqres.in/api/users/" + idOne);
        console.log("Requesting for the user with id", idTwo);
        let u2 = promiseRequest("https://reqres.in/api/users/" + idTwo);
        // Return the promise of whichever among u1 and u2 is resolved 1st.
        // Sometimes it might be u1 and othertimes it might be u2.
        return Promise.race([u1, u2]);
    }
    let rejected = function rejected(r) {
        console.log("Rejected with the reason", r);
    }
    let firstUser = function firstUser(f) {
        if (f) {
            console.log(JSON.parse(f)['data']['first_name'], "has arrived 1st");
        }
    }
    // After both the promises(p1,p2) are fullfilled, the fullfilled callback is called.
    // The fullfilled callback also returns a promise, which, when fullfilled, calls the firstUser
    Promise.all([p1, p2]).then(fulfilled, rejected).then(firstUser, rejected);
}

function generators() {
    function* foo(x) {
        let y = x * (yield);
        return x * y;
    }
    // Get the iterator
    let fooIt = foo(6);
    // Start the iterator
    fooIt.next();
    // Resume the iterator
    let result = fooIt.next(6);
    console.log(result.value);

    function* fooTwoWay(x) {
        let y = x * (yield "Hello there. I am ready to receive");
        return x * y;
    }
    let foo2It = fooTwoWay(6);
    // Start it and wait for the response
    let response1 = foo2It.next();
    // Once response is received, check the response
    // If the response matches, resume the generator
    if (response1.value === "Hello there. I am ready to receive") {
        let result = foo2It.next(10);
        console.log(result.value);
    }
}

function multipleIterators() {
    function* foo() {
        var x = yield 2;
        z++;
        var y = yield(x * z);
        console.log(x, y, z);
    }
    var z = 1;

    // Get two iterators
    var it1 = foo();
    var it2 = foo();

    var val1 = it1.next().value; // 2 <-- yield 2
    var val2 = it2.next().value; // 2 <-- yield 2
    // Before val1 = 2, val2 = 2
    val1 = it1.next(val2 * 10).value; // 40  <-- x:20,  z:2
    val2 = it2.next(val1 * 5).value; // 600 <-- x:200, z:3

    it1.next(val2 / 2); // y:300
    // 20 300 3
    it2.next(val1 / 4); // y:10
}

function generateValues() {
    // Sample iterable
    let sampleIterable = {
        val: 1,
        next: function() {
            return {
                done: false,
                value: this.val++
            }
        }
    }
    console.log(sampleIterable.next().value);
    console.log(sampleIterable.next().value);
    console.log(sampleIterable.next().value);
    console.log("Generating values using iterables...");
    // This is an iterable
    var valueGenerator = (function() {
        let nextValue;
        return {
            // This is needed for implementing the for..of iterator of ES6
            // This converts the object being returned into an iterator
            [Symbol.iterator]: function() {
                return this;
            },
            // If some object is an iterator that must have a next function
            next: function() {
                if (nextValue === undefined) {
                    nextValue = 1;
                } else {
                    nextValue = (3 * nextValue) + 6;
                }
                // This is also necessary for using this in a for..of loop
                // When the done becomes true, the iterator ends
                return { done: false, value: nextValue };
            }
        };
    })();
    console.log(valueGenerator.next().value); //1
    console.log(valueGenerator.next().value); //9
    console.log(valueGenerator.next().value); //33
    // The for..of loop asks for an iterator from the valueGenerator
    // When it receives one, it uses that to call the next function on that iterator
    // The next function should return an object with properties done and value
    // The valueGenerator is called an iterable
    for (let value of valueGenerator) {
        console.log(value);
        if (value > 500) {
            break;
        }
    }
    console.log("Generating values using generators.....");
    // Generating values without using iterables
    // Does the same job as valueGenerator iterable
    function* valueGeneratorFun() {
        let nextValue = 0;
        try {
            // The infinite loop is fine, as this is paused in the yield
            // Does not run continuously forever
            while (true) {
                yield ++nextValue;
            }
        } finally {
            console.log("Cleaning up the generator...");
        }
    }
    let valGenIt = valueGeneratorFun();
    console.log(valGenIt.next());
    console.log(valGenIt.next());
    console.log(valGenIt.next());
    console.log(valGenIt.next());
    console.log(valGenIt.next());
    // The return function on a generator simply terminates it and returns
    // whatever we send back
    console.log(valGenIt.return("We are done"));
}

function asyncGenerators() {
    function sampleAjax() {
        var request = require('request');
        request('https://reqres.in/api/users?page=1', function(error, response, body) {
            if (error) {
                throw new Error("The request has failed");
            }
            if (body) {
                // When the request has succeeded, then the generator continues
                mainIt.next(body);
            }
        });
    }

    function* main() {
        try {
            // After the yield, the generator just waits until another next is called on the iterator
            // This is a synchronous looking asynchronous call
            // The control does not go to the next line, until the mainIt.next() is called
            let response = yield sampleAjax();
            console.log("Success:", response);
        } catch (err) {
            console.log("Failed:", err);
        }
    }
    let mainIt = main();
    mainIt.next();
    console.log("I am just doing other stuff.....");
    console.log("I am just doing other stuff.....");
    console.log("I am just doing other stuff.....");
    console.log("I am just doing other stuff.....");
}

function simpleGen() {
    function* foo(f) {
        let v = f * (yield 9);
        return 10;
    }
    let fooIt = foo(10);
    console.log(fooIt.next());
    console.log(fooIt.next(5));
}

function simpleAsyncGen() {
    function fooBar() {
        console.log("I am foobar");
        // 3. After waiting for 10ms, continue the generator
        setTimeout(function() {
            console.log(it.next(10));
        }, 10);
    }

    function* foo(n) {
        //2. Stop the generator and call the fooBar
        let m = n * (yield fooBar());
        return m;
    }
    let it = foo(10);
    //1. Start the generator
    it.next();
}
// The good way to get most out of promise-generators combination is to
// yield a Promise and wire that Promise to control the generator's iterator
function* promiseGen() {
    try {
        var resultValue = yield promiseRequest("https://reqres.in/api/users?page=1");
        console.log("Result", resultValue);
    } catch (e) {
        console.log("Error", e);
    }
}

function promiseGeneratorTest() {
    let it = promiseGen();
    it.next().value.then(function(success) {
        it.next(success);
    }, function(error) {
        it.throw(error);
    });
}
// This utility starts a generator that contains one or more promises
// Finally returns the the end value of the generator
function run(gen) {
    let args = [].slice.call(arguments, 1),
        it;
    // Create a generator with the given arguments
    it = gen.apply(this, args);
    return Promise.resolve().then(function handleNext(value) {
        // Kick start the generator(or simply continue if it is already created)
        let next = it.next(value);
        // At the end of handleResult, we either return the value of the generator or continue
        // with a recursive-like call/loop to keep resolving promises or continuing the generator
        return (function handleResult(next) {
            // Generator completed ?? Otherwise keep going
            if (next.done) {
                return next.value;
            } else {
                // Since the generator is not completed, resolve its 'value'
                // Will be resolved, even if it is not promise
                return Promise.resolve(next.value)
                    .then(
                        handleNext,
                        function handleError(error) {
                            return Promise.resolve(it.throw(error)).then(handleResult);
                        });
            }
        })(next);
    });
}

function promiseGeneratorUtilityTest() {
    run(promiseGen);
}

function generatorDelegationSimple() {
    function* foo() {
        console.log("foo starting");
        yield 3;
        yield 4;
        console.log("foo ending");
    }

    function* bar() {
        yield 1;
        yield 2;
        // Transfers the iterator control over to the foo
        yield* foo();
        yield 5;
    }
    let it = bar();
    while (true) {
        let result = it.next();
        if (result.done) {
            break;
        }
        console.log(result.value);
    }
}

function messageDelegation() {
    function* foo() {
        console.log("inside `*foo()`:", yield "B");
        console.log("inside `*foo()`:", yield "C");
        return "D";
    }

    function* bar() {
        console.log("inside `*bar()`:", yield "A");
        // `yield`-delegation!
        // This yield waits untill the foo generator completes it's yields and returns
        // The yield mechanism is like a breakpoint in debuggers(may be using a stack) in
        // that the expression that was yielded at the top of the tree(or the one that was
        // executed last) will continue on the next statement.
        console.log("inside `*bar()`:", yield* foo());
        console.log("inside `*bar()`:", yield "E");
        return "F";
    }
    let it = bar();
    // starts bar and stops at 'yield "A"' after receiving "A"
    console.log("outside:", it.next().value);
    // continues from 'yield "A"' by giving the value '1'
    console.log("outside:", it.next(1).value);
    console.log("outside:", it.next(2).value);
    console.log("outside:", it.next(3).value);
    console.log("outside:", it.next(4).value);
}

function messageDelegation1() {
    function* foo() {
        console.log("In foo", yield "A");
        return "B";
    }

    function* bar() {
        console.log("In bar", yield* foo());
        return "C";
    }
    let it = bar();
    console.log("outside:", it.next().value);
    console.log("outside:", it.next(1).value);
}
// firstPromise();
// randomNumbers();
// promiseChains();
// wrongPromise();
// promisChainsAjax();
// samplePromise();
// promiseAll();
// generators();
// multipleIterators();
// generateValues();
// asyncGenerators();
// simpleGen();
// simpleAsyncGen();
// promiseGeneratorTest();
// promiseGeneratorUtilityTest();
// generatorDelegationSimple();
// messageDelegation();
messageDelegation1();