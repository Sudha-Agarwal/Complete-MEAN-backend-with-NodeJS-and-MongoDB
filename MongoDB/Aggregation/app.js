const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/myDB2';

async function aggregate(){
    await mongoose.connect(url);

//Define a Schema
const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type: String, required:true}
},{strict:"throw"}); 

//Create Model
const User = mongoose.model('Customer', userSchema);

const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    product:String,
    price:Number,
    quantity:Number
})

const Order = mongoose.model("Order",orderSchema);


const result = await User.aggregate([
    {
        $lookup: {
            from: 'orders',
            localField:"_id",
            foreignField:'userId',
            as:'orders'
        }
    },
        {
            $unwind: "$orders"
        },
        {
            $group:{
                _id: "$_id",
                customer: {$first: "$name"},
                totalOrderValue:{ $sum: { $multiply: ["$orders.price", "$orders.quantity"]}}
            }
        },
        {
            $sort: {totalOrderValue: -1}
        },
        {
            $project:{
                _id:0,
                userId:"$_id",
                customer:1,
                totalOrderValue:1
            }
        }
]);

console.log(result);

//$lookup stage is used to perform left outerjoin between customers and orders 
//It matched the documents from customer collection with the documents from the 
//order collection based on _id from customer and userId from order

}

aggregate();