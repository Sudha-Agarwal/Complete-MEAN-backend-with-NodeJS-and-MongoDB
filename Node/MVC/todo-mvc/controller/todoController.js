const Todo = require('../model/todo');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017';

mongoose.connect(uri).then(()=>console.log('DB connected')).catch(err=> console.log(err))

const database = mongoose.connection.useDb('myDB2');
const collection = database.collection('todo');

exports.getTodos = async(req,res)=>{
    try{
        const todos = await collection.find().toArray();
        res.render('index',{todos})
    }
    catch(err){
        console.log(err)
    }
}

exports.createTodo = async(req,res)=>{
    try{
        const {title, description} = req.body;
        const todo = new Todo({
            title, description
        });

        await todo.validate();
        const result = await collection.insertOne(todo);
        console.log(`${result.insertedId}`)

    }
    catch(erro){

    }
    res.redirect('/')
}

exports.updateTodo = async(req,res)=>{
    const {id} = req.params;
    const result = await collection.updateOne({_id: new mongoose.Types.ObjectId(id)},{$set: {'status': 'completed'}});

    res.redirect('/');
}

exports.deleteTodo = async(req,res)=>{
    const {id} = req.params;

    const result = await collection.deleteOne({_id: new mongoose.Types.ObjectId(id)});
    res.redirect('/')
}



