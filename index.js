var express = require('express');
var path = require('path');//?
var favicon = require('serve-favicon');
var logger = require('morgan')//?
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./lib/connection');


var employees = require('./routes/employee');
var teams = require('./routes/team');

// var employeeService = require('./lib/employee.js');
// var dataGenerator  = require('./lib/dataGenerator.js');
// var staticFile = dataGenerator.staticFile('/public');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser);
app.use(express.static(path.join(__dirname,'public')))

app.use(employees);
app.use(teams);

app.use(function(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
})

if(app.get('env') ==='development'){
	app.use(function(err,req,res,next){
		res.status(err.status||500);
		res.send({
			message: err.message,
			error:err
		});
	});
}

app.use(function(err,req,res,next){
	res.status(err.status||500);
})
