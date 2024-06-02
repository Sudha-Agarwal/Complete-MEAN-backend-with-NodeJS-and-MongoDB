const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/myDB2';

const client = new MongoClient(uri);

async function connect(){
    await client.connect();

}

connect();

const db = client.db('myDB2');
db.collection('books').createIndex({title:"text"}).then(res=>{
    console.log("Text index created");

    db.collection('books').find({$text: {$search: 'MongoDB'}}).toArray().then(data=>console.log(data));
})

//insertData();
//createIndex();
//findData();