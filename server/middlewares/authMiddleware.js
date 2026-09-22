import  jwt  from "jsonwebtoken"



export const isAuthenticated = (req, res)=>{
    const token = req.cookies.token
    console.log(token)
}