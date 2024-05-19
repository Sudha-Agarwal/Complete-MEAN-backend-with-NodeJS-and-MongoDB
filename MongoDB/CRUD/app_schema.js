const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/myDB2';

//Define a Schema
const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    age: {type: Number, required:true}
},{strict:"throw"}); 

//Create Model
const User = mongoose.model('User', userSchema);

mongoose.connect(url).then(()=> {
    console.log('connectd');
    main();

}).catch(error => console.log(error))

async function main(){
    try{
        //creates a new user
        const newUser = new User({name:40, age:'40f'});
        const res = await newUser.save();
        console.log("new user ceated: " + res);

        //Find user by name
        const foundUser = await User.findOne({name:'Sudha'});
        console.log("found User:" + foundUser);

        //Update user's age
        foundUser.age = 31;
        const res1 = await foundUser.save();
        console.log("updated User: " + res1);
    }
    catch(error){
        console.log(error)
    }
    finally{
        await mongoose.disconnect();
        console.log("disconnected")
    }

}
