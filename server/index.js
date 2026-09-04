import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
dotenv.config()

const app = express();

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('DB connected')
}).catch((err)=>{
    console.log(err)
})

app.use('/user', userRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`)
} )