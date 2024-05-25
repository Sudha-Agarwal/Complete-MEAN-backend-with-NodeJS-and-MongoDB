const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name is required'],
        minlength:[3,'Name must be atleast 3 characters long'],
        maxlength:[59, 'Name must be less than 59 characters']
    },
    age:{
        type: Number,
        required:[true, "age is required"],
        min:[0,''],
        max:[120,'']
    },
    email:{
        type:String,
        required:[true,"email is required"],
        //custom validation
        validate:{
            validator: function(v){
                return /^\S+@\S+\.\S+$/.test(v)
            },
            message: props=> `${props.value} is not a valid email`
        }
    }

})

module.exports = mongoose.model('User', userSchema);
