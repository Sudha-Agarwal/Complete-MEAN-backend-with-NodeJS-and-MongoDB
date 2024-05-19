const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/myDB2';

const courseDetailSchema = new mongoose.Schema({
    description:String,
    level:{type:String, required:true},
    prerequisites:String
});

const InstructorSchema = new mongoose.Schema({
    name:String,
    email:String
});

const courseSchema = new mongoose.Schema({
    title:String,
    courseCode:String,
    details:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseDetail'
    }],
    instructors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Instructor'
    }]
});

const CourseDetail = mongoose.model('CourseDetail', courseDetailSchema);
const Instructor = mongoose.model('Instructor',InstructorSchema);
const Course = mongoose.model('Course', courseSchema);

async function insertData(){

    //Insert courseDetail documents
    const courseDetail1 = new CourseDetail({
        description: "Basics of MongoDB",
            level:"Beginner",
            prerequisites:"None"
    })

    try{
        await mongoose.connect(url);
        await courseDetail1.save();

        const courseDetail2 = new CourseDetail({
            description: "Advanced Topics of MongoDB",
                level:"Intermediate",
                prerequisites:"Introduction to MongoDB"
        })
        await courseDetail2.save();

        //insert instructor documents

        const Instructor1 = new Instructor({
            name: 'Sudha',
            email:'sudha@gmail.com'
        })
        await Instructor1.save();


        const Instructor2 = new Instructor({
            name: 'Sudha1',
            email:'sudha1@gmail.com'
        })
        await Instructor2.save();

        //Insert the course document
        const Course1 = new Course({
            title:'MongoDB',
            courseCode:'M102',
            details:[courseDetail1._id, courseDetail2._id],
            instructors:[Instructor1._id,Instructor2._id]
        })

        const result = await Course1.save();

        console.log('course data');
        console.log(result)
    }
    catch(error){
        console.log(error);
    }
    finally{
        await mongoose.disconnect();
    }

}

async function getData(){
    
    try{
        await mongoose.connect(url);
        await Course.findOne({title:"MongoDB"})
        .populate('details', 'description')
        .populate('instructors')
        .then(course=>console.log(course)).catch(err=> console.log(err))
    }
    catch(error){
        console.log(error);
    }
    finally{
        await mongoose.disconnect();
    }


}

//insertData();
getData();



