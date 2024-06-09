const {Transform} = require('stream');
//create a transform stream to update data

const updatableStream = new Transform({
    transform(chunk, encoding,callback){
       let updatedChunk = chunk.toString().toUpperCase();
        this.push(updatedChunk + "new data");        
        callback();

    }
});

const fs = require('fs');

const readableStream = fs.createReadStream('input.txt');
const writabelStream = fs.createWriteStream('output.txt');

readableStream.pipe(updatableStream).pipe(writabelStream);