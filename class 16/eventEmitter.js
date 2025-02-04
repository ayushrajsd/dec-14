const eventEmitter = require("events");
const myEmitter = new eventEmitter();

// consume
myEmitter.on("myEvent", (...args) => {
  console.log("There is a new Event! ", args);
});

// producing
myEmitter.emit("myEvent");
myEmitter.emit("myEvent", 1, 2);
myEmitter.emit("myEvent", [1, 2, 3]);
