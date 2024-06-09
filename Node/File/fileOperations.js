const fs = require('fs');
const path = require('path');


//Opening a file

const openFile = (filePath, flags) =>{
    fs.open(filePath, flags, (err, fd) => {
        if(err){
            console.log("Error opening file:" + err.message)
            return
        }
        console.log(`File opened successfully ${fd}`);
        fs.close(fd, (err) =>{
            if(err){
                console.log(`Error closing the file ${err.message}`)

            }
        })

    })
}

//Writing to a file
const writeFile = (filePath, content)=>{
    fs.writeFile(filePath, content, (err)=>{
        if(err){
            console.log(`Error writing to file: ${err.message}`)
            return;
        }
        console.log("File written successfully")
    })
} 

//Reading a file
const readFile = (filePath) =>{
    fs.readFile(filePath, (err,data)=>{
        if(err){
            console.log(`Error reading file: ${err.message}`)
            return;
        }
        console.log(`File content: ${data}`)
    })
}


const filePath = path.join(__dirname, 'example.txt')
//openFile(filePath, 'w')
//writeFile(filePath, "Hello World");
readFile(filePath)