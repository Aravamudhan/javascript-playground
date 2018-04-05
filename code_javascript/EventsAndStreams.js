function events() {
    const EventEmitter = require('events');
    class MyEmitter extends EventEmitter {}
    const myEmitter = new MyEmitter();
    myEmitter.on("topEvent", () => console.log("The top level event"));

    function testEvent() {
        myEmitter.on('testEvent', () => {
            console.log('testEvent event occurred!');
        });
        myEmitter.emit('testEvent');
    }

    function emitterWithArguments() {
        class SuperEventEmit extends EventEmitter {};
        const emitter = new SuperEventEmit();
        emitter.on("superevent", function (p1, p2) {
            console.log(p1, p2, this);
        });
        emitter.on("event", () => {
            console.log("An event has happened");
        });
        emitter.emit("superevent", "This is 1st param", "I am another param");
        emitter.emit("event");
        emitter.emit("superevent", "I am happening again", "Hola");
    }

    function handleEmitOnce() {
        // Only once the event is handled.
        myEmitter.once("event", () => console.log("This is happening only once"));
        myEmitter.emit("event");
        // ignored
        myEmitter.emit("event");
        myEmitter.emit("event");
    }

    function handleError() {
        // Register a error handler
        // Without an error handler, the node process will exit
        myEmitter.on("error", (err) => console.log("Error:", err));
        // Throw an error explicitly
        myEmitter.emit("error", new Error("Oh my!!"));
        console.log("I won't be printed without a error handler.");
    }
    // testEvent();
    // emitterWithArguments();
    // handleEmitOnce();
    // handleError();
}