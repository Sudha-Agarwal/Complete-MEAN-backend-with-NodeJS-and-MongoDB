const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/myDB2';

const courseDetailSchema = new mongoose.Schema({
    description:String,
    level:{type:String, required:true},
    prerequisites:String
},{strict:false});
const InstructorSchema = new mongoose.Schema({
    name:String,
    email:String
});

const courseSchema = new mongoose.Schema({
    title:String,
    courseCode:String,
    details:courseDetailSchema,
    instructors:[InstructorSchema]
});

const Course = mongoose.model('Course', courseSchema);

async function insertData(){
    console.log('inserting data');

    const course = new Course({
        title:'Introduction to MongoDB',
        courseCode: 'M101',
        details:{
            description: "Basics of MongoDB",
            level:"Beginner",
            prerequisites:"None"
        },
        instructors:[
            {
                name:'Sudha',
                email:'sudha@gmail.com'
            },
            {
                name:'Sudha1',
                email:'sudha1@gmail.com'
            },

        ]
    })



try{
    await mongoose.connect(url);
    let res = await course.save();
    console.log(res)
}
catch(error){
    console.error(error)
}
finally{
    await mongoose.disconnect();
    console.log('disconnected')
}
};
insertData();

/*course:{
    name:'',
    details:{
        description:'',
        level:'',
        prereq:''
    },
    instructors:[
        {name:'',
            email:''
        },
        {name:'',
            email:''
        }
    ]

}*/