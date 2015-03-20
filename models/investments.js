var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
    name: { type:String, required:true },
    description: { type:String, required:true },
    baseprice: { type:Number, required:true },
    spbonus: { type:Number, required:true },
    level: { type:Number, required:true }
})

Investment = mongoose.model('investments', schema);