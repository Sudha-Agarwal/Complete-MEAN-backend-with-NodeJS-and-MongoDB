const http = require('http');
const host = "localhost";
const port = 8000;


const requestListener = function(req,res){
    res.writeHead(200,{'Content-Type':'application/json'});
    
    //Define the JSON response
    const jsonResponse = {
        message: 'Hello World'
    }

    res.end(JSON.stringify(jsonResponse))
}

const server = http.createServer(requestListener);

server.listen(port, host, ()=>{
    console.log("server is running")
})

