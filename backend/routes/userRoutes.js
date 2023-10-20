const express=require('express')
const router=express.Router()
const {protect}=require('../middleware/authMiddleware')

const {registerUser,
    loginUser,
   getMe}=require('../controllers/userController')

router.get('/',protect, getMe).post('/',registerUser).post('/login',loginUser)



module.exports=router