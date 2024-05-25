const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{type:Number},
    status:{
        type:String,
        enum:['active', 'inactive']
    },
    hobbies:{
        type:[String],
        default:[]
    },
    oldField:{
        type:String
    }
},{strict:false}) 

//create the User model
const User = mongoose.model("User", userSchema);

async function insertSampleData(){
    await mongoose.connect('mongodb://127.0.0.1:27017/myDB2');

    //sample data
    const sampleUsers = [
        {
        name:"sudha",
        age:40,
        status:'inactive',
        hobbies:['reading','traveling']
        },
        {
            name:"sudha1",
            age:50,
            status:'active',
            hobbies:['hiking','swimming'],
            oldField:'some value;'
        }
    ];

    await User.insertMany(sampleUsers);
    console.log('sample data inserted');
    await mongoose.disconnect();
}

async function updateData(){

    await mongoose.connect('mongodb://127.0.0.1:27017/myDB2');
    
    /*await User.updateOne(
        {name:'sudha'},
        {$set: {age:30}}
    );

    await User.replaceOne(
        {name:'sudha'},
        {name:'sudha', age:31, status:'active'}
    );

    await User.updateOne({
        name:'sudha'},
        { $inc: {age : -1} }//negative means decrement by 1
    );

    //positive means increment by 1

    await User.updateOne(
        { name:'sudha' },
        { $push: {hobbies:"reading1"}}
    );

    await User.updateOne(
        { name: 'sudha'},
        { $pull: {hobbies:'reading'}}
    )
    
    //The $pull operator is used to remove all instances of a specified value from an array

    await User.updateOne(
        {name: 'sudha'},
        { $addToSet: { hobbies: 'reading1'}}
    )
    //$addToSet is used to add an element to an array only if the element does not already exist in the array

    await User.updateOne(
        {name:'sudha1'},
        { $rename: { "oldField": "newField"}}
    )*/

    await User.updateOne(
        {name:'sudha'},
        { $min: { age: 20}},
        
    )

    //upsert Option 
    //this option inserts a document if no match is there otherwise update the doc

    const result = await User.updateOne(
        {name:'sudha3'},
        { 
            $set: {age: 24, status:'active'},
            $addToSet: { hobbies: 'reading1'},
            $currentDate: {lastModified:true}
        },
        {upsert: true}
    );





    await mongoose.disconnect();

}

//insertSampleData();
updateData();