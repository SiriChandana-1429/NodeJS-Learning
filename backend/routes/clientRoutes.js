const express=require('express')
const router=express.Router()
const {protect} =require('../middleware/authMiddleware')
const {getClients, addClient, updateClient, deleteClient}=require('../controllers/clientController')

router.get('/',protect,getClients).post('/',protect,addClient)

router.put('/:id',protect,updateClient).delete('/:id',protect,deleteClient)

module.exports=router