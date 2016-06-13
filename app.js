var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var employerRouter = require('./routers/employersRouter.js');
var app = express();
var cors = require('cors');

var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'finalProject';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());


app.use('/api', employerRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
