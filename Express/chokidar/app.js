const express = require('express');
const chokidar = require('chokidar');
const app=express();

//define routes
app.get('/', (req,res)=>{
    res.send("hello world");
})
const server = app.listen(3001, ()=>{
    console.log('server running')
});

//watch for file changes in the current directory
const watcher = chokidar.watch(__dirname);

//Handle file change events
watcher.on('change', (path)=>{
    console.log(`File ${path} has been changed`);

    //Perform actions when file changes. e.g. restart the server
    console.log('Restarting server');

    server.close(()=>{
        console.log('server closed');

        server.listen(3001, ()=>{
            console.log('server restarted')

        })
    });
})

