const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        
        const conn=await mongoose.connect("mongodb://localhost:27017/Partner-Portal")
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log("Failed")
        process.exit(1)
    }
}
module.exports=connectDB