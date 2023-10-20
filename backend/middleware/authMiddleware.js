const jwt=require('jsonwebtoken')
const User=require('../model/userModel')
const SECRET_KEY="abc123"

const protect=async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,SECRET_KEY)
            req.user=await User.findById(decoded.id).select('-password')
            next()
        }
        catch(error){
            res.status(401)
            throw new Error("UnAuthorised")
        }
    }
    else{
        res.status(401)
        throw new Error("No token")
    }
}
module.exports={protect}