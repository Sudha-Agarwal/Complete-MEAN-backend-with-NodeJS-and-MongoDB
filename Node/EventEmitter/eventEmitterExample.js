const EventEmiiter = require('events');

class MyEmitter  extends EventEmiiter{

}

const myEmitter = new MyEmitter();

//define the event handler
myEmitter.on('event', (message) =>{
    console.log("an event occur " + message)
})

//define another event handler
myEmitter.on('error', (err) =>{
    console.log("an error occur " + err)
})

//Emit events
myEmitter.emit('event', 'This is the first event');

myEmitter.emit('error', new Error('Something went wrong'))
