function globalFunction(someFun) {
    console.log("We are inside a global function now........");
    console.log("We are calling the function that was passed.");
    someFun();
}
// A function expression
(function funcExpression() {
    var data = {
        name: "James",
        id: 7
    };
    // Passing the innerFunction to globalFunction and globalFunction calls it from there
    globalFunction(function innerFunction() {
        console.log("Name is " + data.name);
    });
})();
(function hoistingTests() {
    (function hoisting() {
        a = 2;
        console.log(a); // prints 2
        var a;
    })();
    (function hoistingFail() {
        console.log(a); // undefined
        // the statement below is not a single statement
        // it is var a; a =2; var a is hoisted.But a=2 stays at the bottom, hence we get undefined
        var a = 2;
    })();
    (function duplicateFunctions() {
        console.log("duplicateFunctions");
        foo();

        function foo() {
            console.log("first foo");
        }

        function foo() {
            console.log("second foo");
        }
    })();
    (function duplicateVars() {
        console.log("duplicateVars");
        foo(); // 1
        var foo;

        function foo() {
            console.log("first foo");
        }
        foo = function() {
            console.log("second foo");
        };
        foo();
    })();

})();
var fooBar = (function closureExampleFoo() {
    var a = "Text in foo";

    function bar() {
        console.log(a);
    }
    return bar;
})();
fooBar(); // prints 'Text in foo'
(function closureExample2(functionWithClosure) {
    console.log("In closureExample2...");
    // We are in a different scope altogether and yet, we can see what is inside of the variable 'a' in the function closureExampleFoo
    functionWithClosure(); //prints 'Text in foo'
})(fooBar);