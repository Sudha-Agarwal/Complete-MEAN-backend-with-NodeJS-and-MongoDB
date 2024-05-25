const express = require('express');
const dbConncetion = require('../Database/DB');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userAPI');

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(dbConncetion)
.then(()=>{
    console.log('Connectd to MongoDB');   
    app.use('/api', userRoutes);
    //app.use('/product', produtRoute)

    //start the server
    app.listen(3000,()=>{
        console.log('server started at port 3000')
    })
})




