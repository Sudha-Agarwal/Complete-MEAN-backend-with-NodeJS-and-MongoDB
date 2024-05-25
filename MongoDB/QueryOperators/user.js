const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{type:Number},
    email:{
        type:String,
        unique:true
    },
    active:{
        type:Boolean        
    },
    hobbies:{
        type:[String],
        default:[]
    },
    oldField:{
        type:String
    }
},{strict:false}) ;

module.exports = userSchema;

