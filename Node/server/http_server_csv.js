const http = require('http');
const host = "localhost";
const port = 8000;


const requestListener = function(req,res){
    res.writeHead(200,{'Content-Type':'text/csv',
        "Content-Disposition": 'attachment;filename="data.csv"'
    });
    
    //Define the JSON response
    const csvResponse = [
        ['Name','Age', 'City'],
        ['Sudha',30,'Delhi'],
        ['Sudha1',40,'Delhi']
    ]
    .map(row=> row.join(','))
    .join('\n')

    res.end(csvResponse)
}

const server = http.createServer(requestListener);

server.listen(port, host, ()=>{
    console.log("server is running")
})

