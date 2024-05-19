const { MongoClient } = require('mongodb');

//const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://sudha-agarwal:oidwq3aXBeoygi1X@cluster0.c1l1lzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'myDB2';

//create a new MongoClient
const client = new MongoClient(url);

async function main(){
    try{
        //connect to MongoDB server
        await client.connect();
        console.log("connected to Mongodb");

        //Access the database
        const db = client.db(dbName);

        //Perform some operations
        const collection = db.collection('mycollection');

        //Insert a document
        const insertResult = await collection.insertOne({ name: "John Doe", age: 30, address: "123 Main St" });
        console.log('Inserted document: ' + insertResult.insertedId);

        //Find a document
        const findResult = await collection.findOne({name:'John Doe'});
        console.log("Found document: " + findResult.name);

        //update a document
        const updateResult = await collection.updateOne({name:'John Doe'},{$set: {age:31}})
        console.log("updated document count: " + updateResult.modifiedCount);

        //delete a document
        const deleteResult = await collection.deleteOne({name:'John Doe'})
        console.log("deleted document count: " + deleteResult.deletedCount)




    }
    catch(err){
        console.log(err)
    }
    finally{
        //close the connection
        await client.close();
    }
}

main().catch(console.error);

