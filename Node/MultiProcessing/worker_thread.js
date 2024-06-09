const { Worker, isMainThread, parentPort } = require('worker_threads');

if(isMainThread){
    console.log("Main thread is running");
    //create a new worker thread
    const worker = new Worker(__filename);    

    worker.on('message',(message)=>{
        console.log('Received message from worker: '+ message)
    });
    worker.postMessage("hello Worker")
}
else{
    console.log('worker thread is running');

    //listens for messages from the main thread
    parentPort.on('message', (message)=>{
        console.log("received message from main thread", message);
    })

    //send a message back to the main thread
    parentPort.postMessage('hello Main')
}

const abc = function(){
    
}