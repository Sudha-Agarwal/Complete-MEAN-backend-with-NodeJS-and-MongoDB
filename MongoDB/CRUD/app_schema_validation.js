const mongoose = require('mongoose');

const User = require('./Schema/user')

const url = 'mongodb://127.0.0.1:27017/myDB2';

async function run(){
    try{
        await mongoose.connect(url);
        console.log('connected');

        let newUser = new User({
            name:'Su',
            age:130,
            email:'sudha agarwal@gmail.com'
        });

        await newUser.save();
        console.log('New Uesr created')
    }
    catch(error){
        if(error.name='ValidationError'){
            for(field in error.errors){
                console.log(`${field}: ${error.errors[field].message}`)
            }
        }
        console.log("Error: " + error)
    }
    finally{
        await mongoose.disconnect();
        console.log('disconnected')
    }
}

run().catch(console.error);