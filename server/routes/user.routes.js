import express from 'express'
import { registerUser, loginUser, getUser } from '../controlller/user.controller.js'
import { isAuthenticated } from '../middlewares/authMiddleware.js'


const userRoutes = express.Router()

//Registering a user

userRoutes.post('/register', registerUser)

//Logging in a user

userRoutes.post('/login', loginUser)

userRoutes.get('/me', isAuthenticated, getUser)

export default userRoutes