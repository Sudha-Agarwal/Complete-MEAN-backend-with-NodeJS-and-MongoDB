const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const userSchema = require('../../Database/Schema/User')

const User = mongoose.model('User', userSchema);

//http://localhost:3000/api/users
router.get('/users', async(req,res)=>{
    try{
        const users = await User.find({},{password:0});//password will not be returned
    res.status(200).json(users)
    }
    catch(err){
        console.log(err);
        res.status(500).send("server Error")
    }
})

router.post('/signup', async(req,res)=>{
    let {name, email, age, password} = req.body
    let newUser = new User({
        name, email, age, password
    });
    console.log(req.body)
    ValidationErrors={}
console.log(password.length);

    if(password.length>15){
        ValidationErrors.password = 'Password should be maximum 15 characters long';
console.log("length")
    }
    try{
        //await newUser.validate();
        //Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        //update the new user object with the hashed password
        newUser.password = hashedPassword;

        await newUser.save();
        console.log('New user created');
        res.status(200).json({message: 'New User created'})
    }
    catch(error){
        console.log(error);
        if(error.name === 'ValidationError'){
            const errors = {};
            for(let field in error.errors){
                ValidationErrors[field] = error.errors[field].message;
            }
            //res.status(400).json({errors})
        }
    }

    /*if(Object.keys(ValidationErrors).length>0){
        return res.status(400).json({errors:ValidationErrors});
    }*/


})

router.post('/login', async(req,res)=>{
    try{
        let{ email, password } = req.body;

        //Find the user by email
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(404).send({error:'Email does not exist'})
        }

        //compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        //user = await User.findOne({email:email, password:password});

        if(!isMatch){
            return res.status(401).send({error:'Login Failed'})
        }

        res.status(200).send({message:'Login successful'})
    }
    catch(error){
        console.log(error);
        res.status(500).send('Server Error')
    }

})

module.exports = router;