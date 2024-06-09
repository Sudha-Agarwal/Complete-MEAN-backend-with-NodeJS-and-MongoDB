const http = require('http');
const host = "localhost";
const port = 8000;


const requestListener = function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end("My First HTTP Server");//writes the response back to the client
}

const server = http.createServer(requestListener);

server.listen(port, host, ()=>{
    console.log("server is running")
})

