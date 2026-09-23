import express from 'express'
import { getuser, login, registerUser } from '../controlller/user.controller.js'
import { isAuthenticated } from '../middlewares/authMiddleware.js'



const userRoutes = express.Router()

//Registering a user

userRoutes.post('/register', registerUser)

userRoutes.get('/me', isAuthenticated, getuser)

userRoutes.post('/login', login)

export default userRoutes