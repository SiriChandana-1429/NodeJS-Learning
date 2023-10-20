const { error } = require('console')
const Client=require('../model/clientModel')

const getClients=async (req,res)=>{
   const clients=await Client.find()
   res.json(clients)
}

const addClient=async(req,res)=>{

   const client=await Client.create({
    name:req.body.name,
    email:req.body.email,
    insuranceType:req.body.insuranceType,
    dateOfBirth:req.body.dateOfBirth,
    lastUpdated:req.body.lastUpdated
   })
   res.status(200)
   res.json(client)
}

const updateClient=async (req,res)=>{
    const client=await Client.findById(req.params.id)
    console.log(client)
    if(!client){
        res.status(400)
        throw new error('Client not found')
    }
    const updatedClient=await Client.findByIdAndUpdate(req.params.id,req.body,{new:true,})
    console.log(updatedClient)
    res.json(updatedClient)
}

const deleteClient=async (req,res)=>{
    const client=await Client.findById(req.params.id)
    if(!client){
        res.status(400)
        throw new Error("ID not found..!!")
    }
    await client.remove
    res.json(client) 
}

module.exports={
    addClient,
    updateClient,
    getClients,
    deleteClient
}