const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("Method: " + req.method);
    console.log("URL: " + req.url);
    console.log("Headers: " + req.headers);

    const host = req.headers['host'];

    console.log("Host: " + host);

    req.on('data', (chunk)=>{
        body+=chucnk;
    })

})

server.listen(3000, ()=>{

})