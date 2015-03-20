var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var fs = require('fs')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect("mongodb://localhost:27017/stocksim")
var db = mongoose.connection;


//load all models mongodb
fs.readdirSync(__dirname + '/models').forEach(function (filename){
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
})


var investments = {"investments":[
    {"name":"Pencils", "description":"A set of pencils for all to use.", "baseprice": 3, "spbonus":0},
    {"name":"Paper", "description":"Stacks of printer, lined, and graph paper", "baseprice": 7, "spbonus":0},
    {"name":"Desk and Chair", "description":"Desk and chair to use as a workstation", "baseprice": 70, "spbonus":0},
    {"name":"Desktop Computer", "description":"A basic desktop computer", "baseprice": 200, "spbonus":2}
]}

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(__dirname + '/public'));


app.get('/packages', function (req, res) {
  res.send('test')
})

app.get('/investments', function (req, res) {
    mongoose.model('investments').find(function (err, users){
        res.send(users)
    })
});

app.post('/investments', function (req, res) {
    console.log(req.body)
    var newInvestment = new Investment(req.body)

    newInvestment.save(function (err, data){
        if (err) {
            res.status(400);
            res.send({msg: "Invalid investment data!"});
        }
        else {
            res.status(201);
            res.send(data);
        }
    })
});

app.delete('/investments/:id', function (req, res) {
    var id = req.params.id;
    Investment.remove({'_id': id}, function (err, result){
        if (err) {
            res.status(400);
            res.send({msg: "Could not remove"});
        }
        else {
            res.status(200);
            res.send({msg: "Removed successfully!"});
        }
    })
});

app.get('/users', function (req, res) {
    mongoose.model('accounts').find(function (err, users){
        res.send(users)
    })
});
 
app.listen(80)
