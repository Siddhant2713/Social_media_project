import express from 'express'
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

const port = 3000;

app.use(express.json())



mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('DB connected')
}).catch((err)=>{
    console.log(err)
})

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`)
} )