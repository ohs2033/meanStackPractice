var async = require('async');
var mongoose = require('mongoose');
require('../lib/connection.js');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');

var data = {
	employees: [
		{
			id: '1000003',
			name:{
					first: 'John',
					last: 'Adams'
				},
				address:{
					lines:['2 Lincoln Memorial Cir Nw'],
					zip: 20036
				}
		},
		{
			id: '1000021',
			name:{
				first: 'Rachel',
				last: 'Posner'
			},
			address:{
				lines:['2 Lincoln Memorial Cir Nw'],
				zip: 20037
			}
		},
		{
			id: '1000023',
			name:{
				first: 'Jason',
				last: 'Bourne'
			},
			address:{
				lines:['2 Lincoln Memorial Cir Nw'],
				zip: 666
			}
		},
		{
			id: '1000034',
			name:{
				first: 'Mac',
				last: 'Adams'
			},
			address:{
				lines:['2 Lincoln Memorial Cir Nw'],
				zip: 200
			}
		},
		{
			id: '1000025',
			name:{
				first: 'Rahel',
				last: 'Barber'
			},
			address:{
				lines:['2 Lincoln Memorial Cir Nw'],
				zip: 20012
			}
		}
	],
	teams : [
		{
			name: 'Software and Services Group'
		},
		{
			name: 'Project Development'
		}

	]
}

var deleteEmployee = function(callback){
	console.info('Deleting employee');
	Employee.remove({},function(err,result){
		if(err) console.error(err);
		else callback(null,result);
	})
}


var addEmployees = function(callback){
	console.info('Adding Employee');
	Employee.create(data.employees, function(err){
		if(err) console.error(err);

		console.info('Done adding employees');
		callback();
	})
}

var deleteTeams = function(callback){

	Team.remove({},function(err, result){
		if(err) console.error(err);
		console.info('Team removed')
		callback();
	})

}

var addTeams = function(callback){
	Team.create(data.teams,function(err, team){
		if(err) console.error(err);
		else{
			console.log(team);	
			console.info('team added done.');
			data.team_id = team[1]._id;//? data.team_id가 어딨어
		}
		callback();

	})
}


var updateEmployeeTeams = function(callback){
	console.info('updating..');

	var team = data.teams[0];
	Employee.update({},{
		team: data.team_id//???
	},{
		multi: true
	},function(error, numberAffectd, response){
		if(error) console.error(error);
		console.info('Done updating employee teams');
		callback();
	})
}

var findTeamName = function(callback){
	console.info('finding teamName');
	Employee.findOne({'name.first':'John'}).populate('team').exec(function(err,data){
		if(err) {
			console.error(err)
		}
		console.log(data.team)
		callback();
	})
}

async.series([
		deleteEmployee,
		deleteTeams,
		addEmployees,
		addTeams,
		updateEmployeeTeams,
		findTeamName
	], function(error,results){
		if(error){
			console.error('async Error: ' +error);
		}
		mongoose.connection.close();
		console.log('Done!');
})







