const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User=require('../model/userModel')

const SECRET_KEY="abc123"

const registerUser=async(req,res)=>{
    console.log(req.body)
    const {name,email,password}=req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please enter all fields")
    }
    const userExists=await User.findOne({email})
   
    if(userExists){
        res.status(400)
        throw new Error("User already exists")

    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const user =await User.create({
        name:name,
        email:email,
        password:hashedPassword
    })
    if(user){
        res.status(200)
        res.json({
            _id:user.id,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid User data")
    }
   
}

const loginUser=async(req,res)=>{
    console.log(req.body)
   const {email,password}=req.body
   const user=await User.findOne({email})
   if(user && (await bcrypt.compare(password,user.password))){
    res.status(200)
    res.json({
        _id:user.id,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        token:generateToken(user._id)
    })
   }
   else{
    res.status(400)
    throw new Error("Validation is not matching")
   }
}

const getMe=async(req,res)=>{
    const {_id,name,email}=await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email
    })
}

//Generate JWT 
const generateToken=(id)=>{
    return jwt.sign({id},SECRET_KEY,{
        expiresIn:'1d',
    })
}
 module.exports={
    registerUser,
    loginUser,
   getMe
}