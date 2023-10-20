const express= require('express')
const dotenv=require('dotenv').config()
const connectDB=require('./config/db')
const port=process.env.PORT || 5000
const app=express()

connectDB()
app.use(express.json());             
app.use(express.urlencoded());

app.use('/api/clients',require('./routes/clientRoutes'))
app.use('/api/users',require('./routes/userRoutes'))



app.listen(port,()=>console.log(`Server is listening on port number ${port}`))