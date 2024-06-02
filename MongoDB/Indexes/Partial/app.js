const { MongoClient} = require('mongodb');

const uri = 'mongodb://localhost:27017/myDB2';

const dbname = 'myDB2';

const client = new MongoClient(uri);

client.connect().then(()=>{
    const db = client.db(dbname);
    const users = db.collection('users');

    users.createIndex({"age":1},{partialFilterExpression:{status :"active"}}).then(()=>{
        console.log("index created");

        users.insertOne({name:'Sudha2', email:'sudha.agarwal84@gmail.com'}).then(()=>
            console.log('inserted')).catch(err=>console.log(err));

        
        })

        //users.find({created_at: {$lt: new Date()}}).explain("executionStats").then(res=> console.log(res));
    }).catch(err=> console.error(err))


