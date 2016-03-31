var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/employees',function(req,res,next){
	Employee.find().sort('name.last').exec(function(err,result){
		if(err){
			return next(err);
		}
		res.json(result);//array of objects.
	})

})

router.get('/employees/:employeeId',function(req,res,next){
	Employee.findOne({
		id: req.params.employeeId
	}).populate('team').exec(function(error,result){
		if(error){
			return next(error);
		}
		if(!result){
			res.send(404);
		}
		res.json(result);
	})
})

router.put('/employees/:employeeId', function(req,res,next){

	delete req.body._id
	req.body.team = req.body.team._id;

})

module.exports = router;