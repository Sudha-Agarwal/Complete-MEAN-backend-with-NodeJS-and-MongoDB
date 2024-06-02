const { MongoClient} = require('mongodb');

const uri = 'mongodb://localhost:27017/myDB2';

const dbname = 'myDB2';

const client = new MongoClient(uri);

client.connect().then(()=>{
    const db = client.db(dbname);
    const logs = db.collection('logs');

    logs.insertOne({
        "created_at": new Date(),
        "message": 'This is a log message'
    }).then(()=> console.log('record inserted'));


    logs.createIndex({"created_at":1}, {expireAfterSeconds:20}).then(()=>{
        console.log("index created");

        logs.find({created_at: {$lt: new Date()}}).explain("executionStats").then(res=> console.log(res));
    }).catch(err=> console.error(err))
})