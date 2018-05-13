function functionNames() {
    console.log("----------Function names----------");

    function foo() {
        console.log("I am foo");
    }
    let bar = function () {
        console.log("I am bar");
    }
    let foobar = function baz() {
        console.log("I am the baz. I am in foobar though");
    }

    function cbfoo(cb) {
        console.log("In the cbfoo");
        cb();
    }
    cbfoo(function () {
        console.log(this.name);
    });
    console.log("foo:", foo.name, " bar:", bar.name, " foobar:", foobar.name);

}

function metaProps() {
    // new.target referes to the target constructor that new invoked
    console.log("-----new.target-----");
    class Parent {
        constructor() {
            console.log(new.target);
            if (new.target === Parent) {
                console.log("Parent is initialized");
            } else {
                console.log("Child is initialized");
            }
        }
    }
    class Child extends Parent {}
    let p = new Parent();
    let c = new Child();
    console.log("-----Overriding toString and instanceof through Symbol-----");
    console.log("The default behavior............");

    function Foo() {
        console.log("I am foo");
    }
    let a = new Foo();
    console.log("a toString:", a.toString());
    console.log("a instanceof foo", (a instanceof Foo));
    console.log("Overriding the default behavior..........");

    function Bar() {
        console.log("I am barred");
    }
    let b = new Bar();
    Bar.prototype[Symbol.toStringTag] = "Bar";
    Object.defineProperty(Bar, Symbol.hasInstance, {
        value: function (inst) {
            return !!inst.greeting;
        }
    });
    console.log("b.toString",b.toString());
    console.log("b instanceof Bar",(b instanceof Bar));
    b.greeting="Hello";
    console.log("b instanceof Bar",(b instanceof Bar));
}
metaProps();
// functionNames();