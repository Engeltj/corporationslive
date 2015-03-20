var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
    token: String,
    username: String,
    password: String,
    companyName: String,
    money: { type: Number, default: 1000},
    shares: { type: Number, default: 10},
    shareprice: { type: Number, default: 1},
    cm: { type: Boolean, default: false }
})

Account = mongoose.model('accounts', schema);