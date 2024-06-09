const fs = require('fs');
const net = require('net');

console.log('start');

/*
Timer Queue : Holds callbacks scheduled by setTimeout() and setInterval()
*/
setTimeout(()=>{
    console.log('Timer Queue')
},1000);

/*
Poll Queue: Retrieves new I/O events and executes I/O related callbacks
*/

fs.readFile('example.txt', (err,data)=>{
    if(err){
        console.log(err)
    }
    console.log('Poll Queue')
});

/*
Check Queue: Holds callbacks scheduled by setImmediate()
*/

setImmediate(()=>{
    console.log('Check Queue')
});

process.nextTick(()=>{
    console.log('Microtask queue: process.nextTick')
})

Promise.resolve().then(()=>{
    console.log('MicroTask queue: Promise')
})

console.log('End')
