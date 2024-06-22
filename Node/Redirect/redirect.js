const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/products'){
        //set the http status code to 302( Found) or 301

        //302(Found) 301(Moved Permanently)
        res.statusCode = 301;

        res.setHeader('Location', '/new-product');
        res.end();
    }
    else if(req.url = '/new-product'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('This is new resource')
    }

})

server.listen(3000,()=>{});