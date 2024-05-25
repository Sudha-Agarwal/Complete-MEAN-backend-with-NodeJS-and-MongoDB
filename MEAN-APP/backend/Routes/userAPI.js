const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const userSchema = require('../../Database/Schema/User')

const User = mongoose.model('User', userSchema);

//http://localhost:3000/api/users
router.get('/users', async(req,res)=>{
    try{
        const users = await User.find();
    res.status(200).json(users)
    }
    catch(err){
        console.log(err);
        res.status(500).send("server Error")
    }
})

router.post('/user', async(req,res)=>{
    let newUser = new user(req.body);

    try{
        await newUser.save();
        console.log('New user created');
        res.status(200).json({message: 'New User created'})
    }
    catch(error){
        if(error.name === 'ValidationError'){
            const errors = {};
            for(let field in error.errors){
                errors[field] = error.errors[field].message;
            }
            res.status(400).json({errors})
        }
    }
})

module.exports = router;