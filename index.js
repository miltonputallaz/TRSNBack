var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json())

app.use('/post', require('./routes/postRoute')); 
app.use('/favourite', require('./routes/favouritesRoute')); 

var database = require("./database");


app.listen(3001, function () {
  database
  console.log('Example app listening on port 3000!');
});