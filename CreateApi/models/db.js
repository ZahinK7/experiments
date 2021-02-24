const mongoose = require('mongoose')

const dbSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dbToChannel:{
        type:String,
        required:true

    },

    dbDate:{
type: Date,
required:true,
default:Date.now
    }

})

module.exports = mongoose.model('db', dbSchema)