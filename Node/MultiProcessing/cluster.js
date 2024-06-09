const cluster = require('cluster');
const http = require('http');

const numCPUs = require('os').cpus().length;
console.log("Number of cores: " + numCPUs);

if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`);


   //create worker processes based on the number of CPUs
    for(let i=0; i<numCPUs; i++){
        cluster.fork();
    }

    Object.values(cluster.workers).forEach(worker=>{
        worker.on('message', (message)=>{
            console.log(`message from worker ${worker.process.pid}`,message)
        })
    })
}
else{
    http.createServer((req,res)=>{
        res.writeHead(200);
        res.end('Hello World')
    }).listen(8000);

    console.log(`Worker process with ${process.pid} started`)
    process.send('Hello master!')

}
