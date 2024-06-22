/*
In express, a middleware is function that executes during the lifecycle of a request to the server. Each middleware function can perform tasks such as executing code, making changes to the request and response objects, calling the next middleare in the stack

Main types of middlewares in Express:
1. Application level
2. router-level 
3. Third party middlewares
4. Error handling
*/

const express = require('express');

const app=express();

//define routes
app.get('/route1', (req,res)=>{
    //res.send("hello world");
    //simulate an error
    const err = new Error("error in route1");
    throw err;
});

app.get('/route2', (req,res, next)=>{
    //res.send("hello world");
    //simulate an error
    const err = new Error("error in route2");
    next(err);
    
});

//Custome Error handling middleware
app.use((err, req,res,next)=>{
    console.log('an error occurred', err.message);
    res.status(500).send("something went wrong");

});
const server = app.listen(3001, ()=>{
    console.log('server running')
});

