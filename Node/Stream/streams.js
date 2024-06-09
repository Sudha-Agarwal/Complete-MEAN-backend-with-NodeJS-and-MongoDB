const fs = require('fs');

//create a readable stream to read data from a file
const readableStream = fs.createReadStream('input.txt',{encoding:'utf-8'});

//create a writable stream to write data to a file
const writabelStream = fs.createWriteStream('output.txt');


//Handle 'data' event to read data from the readable stream
readableStream.on('data', (chunk)=>{
    console.log('chunk received', chunk);
    writabelStream.write(chunk)
});

readableStream.on('end', ()=>{
    console.log('no more data');
    writabelStream.end(); //end the writable stream
})



