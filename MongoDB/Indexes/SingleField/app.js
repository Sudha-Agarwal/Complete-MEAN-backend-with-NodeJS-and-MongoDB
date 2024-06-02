const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/myDB2';

const client = new MongoClient(uri);

async function connect(){
    await client.connect();

}

connect();

const courses = [
    {
      name: 'MongoDB for Beginners',
      coursedetails: {
        description: 'An introduction to MongoDB for beginners',
        duration: 10
      },
      instructor: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    },
    {
      name: 'MongoDB for Developers',
      coursedetails: {
        description: 'A course on MongoDB for developers',
        duration: 20
      },
      instructor: {
        name: 'Jane Smith',
        email: 'janesmith@example.com'
      }
    },
    {
      name: 'MongoDB for Administrators',
      coursedetails: {
        description: 'A course on MongoDB for administrators',
        duration: 15
      },
      instructor: {
        name: 'Bob Johnson',
        email: 'bobjohnson@example.com'
      }
    }
  ];
  
  const db = client.db('myDB2');
  const courseCollection = db.collection('course');
  
  function insertData(){
    courseCollection.insertMany(courses)
    .then(() => console.log('Data inserted successfully'))
    .catch(err => console.error(err));
  }

function createIndex(){
    courseCollection.createIndex({"coursedetails.duration":1})
    .then(()=> console.log('index created'))
    .catch(err=>console.error(err))   
}

function findData(){
    courseCollection.find({name: /^MongoDB/, 'coursedetails.duration':{$lt:15}})
    .explain("executionStats").then(res=>console.log(res));
}
//insertData();
//createIndex();
findData();