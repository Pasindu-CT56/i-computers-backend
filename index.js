import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import e from 'express';
import authenticateUser from './middlewares/authenticate.js';
import productRouter from './routes/productRouter.js';

const mongoUri = "mongodb://admin:1234@ac-wvzmqg1-shard-00-00.2inaclv.mongodb.net:27017,ac-wvzmqg1-shard-00-01.2inaclv.mongodb.net:27017,ac-wvzmqg1-shard-00-02.2inaclv.mongodb.net:27017/?ssl=true&replicaSet=atlas-pnkshn-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongoUri).then(
    ()=>{
        console.log("Connected to MongoDB");
    }
)

let app = express();

app.use(express.json());

app.use(authenticateUser);



app.use("/users",userRouter)
app.use("/products",productRouter)


function go(){
    console.log('server is running');
}

/*app.post("/",(req,res)=>{ console.log('Post request received');
    console.log(req.body);
    
    //Student

    const student = new Student(req.body)

    student.save().then(
        ()=>{
            res.json(
                {
                    message : "Student saved successfully"
                }
            )
        }
    )
    res.json(
        {
            message : "Good morning "+req.body.name
        
        }
    )});*/


/*app.get("/",(req,res)=>{ console.log('Get request received');
    Student.find().then(
        (students)=>{
            console.log(students)
            res.json(students)


        }
    )})*/



app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});

