function foo() {
    console.log("In foo");
    console.log(this.b);
}
var b = 20;
foo(); // global 'this'. Default binding
function objectFoo() {
    console.log("In objectFoo");
    console.log(this.b);
}
var obj = {
    b: 50,
    objectFoo: objectFoo
};
// The call-site has the owning object (i.e) the foo is called with the 
// assumption that it is owned/referenced by 'obj' object. 
// Here the 'this' is obj. It is called 'implicit binding'
obj.objectFoo();
var bar = obj.objectFoo;
// We might be tempted to say that the 'this' will be 'obj'. But the call-site
// does not have 'obj' context when it calls 'objectFoo'. Infact, even the
// obj.objectFoo is just a referrence to the actual objectFoo function. That
// is why, 'this' is global object here(window).
bar();
// This is explicit binding. We are calling the function foo by explicitly
// saying that the 'obj' object will be 'this' in this context.
foo.call(obj);

function fooBar() {
    console.log("In fooBar");
    console.log(this.b);

}
fooBar.apply(obj);
// This is hard binding the 'window' object to the function foo
var hardBoundFoo = foo.bind(window);
hardBoundFoo();
var anotherObject = {
    b: 100,
    foo: hardBoundFoo
};
// We get '20' here also. Even though we are calling the hardBoundFoo with
// 'anotherObject' context, 'hardBountFoo' is a version of 'foo' that is 
// already bound to the 'obj' object
anotherObject.foo();
// how hard binding actually works
var anotheHardBoundFunction = function hardBoundFooOfAnotherObj() {
    // We can call the function 'anotheHardBoundFunction' in any context we 
    // want, but this in turn calls 'foo' with the context 'anotherObject'
    return foo.apply(anotherObject);
};
anotheHardBoundFunction();

function anotherFoo() {
    console.log("In anotherFoo");
    // If there is a no variable named 'j' then create one and assign value 150
    if (typeof this.j === 'undefined') {
        this.j = 150;
    } else {
        this.j = this.j + this.j;
    }

}
anotherFoo();
console.log("anotherFoo() : " + j); // 150
anotherFoo();
console.log("anotherFoo() : " + j); // 300
var anotherFooDup = anotherFoo;
anotherFooDup();
console.log("anotherFooDup() : " + j); // 600
// 'new' binding. Here a new object is created. And then the function
// 'anotherFoo' is called. In the 'anotherFoo' this newly created object
// acts as 'this'. Of course, this newly created object is assigned to
// anotherFooObj object.
var anotherFooObj = new anotherFoo();
console.log(anotherFooObj.j); // 150