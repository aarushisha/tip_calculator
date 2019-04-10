var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var db = require('./db.js');
var connection = db.db;
var addValue = db.addValue;
var getValues = db.getValues;

var app = express();

app.use(express.static(__dirname + '/client/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/getTips', function(req, res) {
  getValues(function (results) {
    res.send(results);
  });
})

app.post('/submitTip', function(req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var percent = req.body.percent;
  var tip = price * percent / 100;
  var total = price + tip;

  var tipObj = {name: name, price: price, percent: percent, tip: tip, total: total}; 

  addValue(tipObj, function(error, results) {
    if (error) {
      console.log(error);
    } else {
      res.send(200);
    }
  })

})

app.listen(9999, function() {
  console.log('listening on port 9999');
})