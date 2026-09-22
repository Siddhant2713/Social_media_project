import express from 'express'
import { login, registerUser } from '../controlller/user.controller.js'
import { isAuthenticated } from '../middlewares/authMiddleware.js'


const userRoutes = express.Router()

//Registering a user

userRoutes.post('/register', registerUser)

userRoutes.get('/me', isAuthenticated)

userRoutes.get('/login', login)

export default userRoutes