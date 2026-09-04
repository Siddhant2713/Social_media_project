// register controller
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res)=>{
    try{
        const {name, email, password, username} = req.body
        // all fields present
        // if the email or username already exists
        // password should be greater than 6 characters

        if(!name || !email || !password || !username){
            return res.status(400).json({
                message: "All field are required"
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                message: "password lenght must be more than 6 characters"
            })
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(409).json({
                message: "User already exists, please sign in"
            })
        }

        const isEmail = await User.findOne({email});
        if(isEmail){
            return res.status(409).json({
                message: "Email already exists, please sign in"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        //save the user
        // console.log(hashedPass);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPass
        })

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        })

    } catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}

// get logged-in user controller
export const getUser = async (req, res)=>{
    try{
        const user = await User.findById(req.userId).select('-password')
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            user
        })

    } catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}

// login controller
export const loginUser = async (req, res)=>{
    try{
        const {username, password} = req.body

        if(!username || !password){
            return res.status(400).json({
                message: "All field are required"
            })
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7*24*60*60*1000
        })

        res.status(200).json({
            message: "Login successful",
            user
        })

    } catch(err){
        return res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}