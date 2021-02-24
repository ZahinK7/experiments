const express = require('express')
const router = express.Router()
const Db = require('../models/db')


router.get('/', async (req,res)=>{
try{
const db = await Db.find()
res.json(db)
}catch (err) {
res.status(500).json({message: err.message})
}

})


router.get('/:id',getDb, (req,res)=>{
res.json(res.db)
    
})

router.post('/', async (req,res)=>{
const db = new Db({
    name: req.body.name,
    dbToChannel: req.body.dbToChannel
})
  
try{
    const newDb = await db.save()
res.status(201).json(newDb)
} catch (err){
res.status(400).json({message:err.message})

}

})


router.patch('/:id',getDb,async(req,res)=>{
if (req.body.name !=null){
res.db.name = req.body.name
}
    
if (req.body.dbToChannel != null){
    res.db.dbToChannel = req.body.dbToChannel
}

try{
const updatedDb = await res.db.save()
res.json(updatedDb)
}
catch(err){
res.status(400).json({message: err.message})
}


})

router.delete('/:id',getDb, async  (req,res)=>{
try{
await res.db.remove()
res.json({message:'Deleted Subscriber'})
}catch (err){
res.status(500).json({message: err.message})
}
    
})

async function getDb(req, res, next){
 
 let db
    try{
db = await Db.findById(req.params.id)
if (db == null){
    return res.status(404).json({message:'Cannot find subscriber'})
}

 }catch(err){
return res.status(500).json({message:err.message })
 }

 res.db = db 
next()

}


module.exports = router