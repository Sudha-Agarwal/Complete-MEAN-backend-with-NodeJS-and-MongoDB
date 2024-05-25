const mongoose = require('mongoose');
const userSchema = require('./user')

const User = mongoose.model("User", userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/myDB2').then(()=>{
    console.log('connected')
}).catch();

async function insertUsers(){
    const users = [
        {name: 'Alice', age:25, email:'alice@gmail.com', active:true, hobies:['reading']},
        {name: 'Alice1', age:30, email:'alice1@gmail.com', active:true, hobies:['reading']},
        {name: 'Alice2', age:20, email:'alic2e@gmail.com', active:true, hobies:['swimming']},
        {name: 'Charlie', age:15, email:'charlie@gmail.com', active:true, hobies:['reading']},
        {name: 'Eve', age:40, email:'eve@gmail.com', active:true, hobies:['reading']}
    ];

    await User.insertMany(users);    
}
//Query Function
function searchUser(){
    User.find()
    .where('age').gte(18).lte(30)
    .where('email').regex(/@gmail\.com$/i)
    .where('active').equals(true)
    .where('hobies').in(['reading','swimming'])
    .sort('age')
    .select('name')
    .limit(2).then(user=> console.log(user))

}

//Query Operators
function searchUser1(){
    User.find({
        $and:[
            {active: true},
            {age: { $gte:18, $lte:30} },
            {email: { $regex: /@gmail\.com$/, $options:'i'}},
            {hobies: {$in: ['reading', 'swimming']}}
            
        ]
    }).select('name age').sort('-age').limit(2)
    .then(users => console.log(users))

}

function searchUser2(){
    User.find({
        $or:[
            {active: false},
            {age: { $gte:18, $lte:30}}
        ],
        $nor: [ {email: {$regex: /@gmail\.com$/, $options:'i'}}],
        $and:[
            {hobies: {$exists: true}}
        ]
    }).select('name age')
    .then(users => console.log(users))
}

//insertUsers();
searchUser2();


