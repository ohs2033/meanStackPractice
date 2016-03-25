var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = mongoose.connection;
var dbUrl = 'mongodb://<dbuser>:<dbpassword>@ds021689.mlab.com:21689/dixa';

var TeamSchema = new Schema({
	name:{
		type: String,
		required: true
	}

})

var Team = mongoose.model('Team',TeamSchema);
db.on('error',function(){
	console.log('there was an error communicating with the database');
	mongoose.connect(dbUrl, function(err){
		if(err){
			return console.log('there was a problem ' +err);
		}
		console.log('connected!');
		//----make actual data instance.
		var team = new Team({
			name : 'Product Development'
		})
		team.save(function(error,data){
			if(error){
				console.log(error);
			}else{
				console.dir(data);
			}
			db.close();
			process.exit();
		})
	})
})

	
var EmployeeSchema = new Schema({
	name:{
		first: {
			type: String,
			required: true
		},
		last: {
			type: String,
			required: trueP
		}
	},
	team:{
		type: Schema.Types.ObjectId,//???
		ref: 'Team'
	},
	image: {
		type: String,
		default: 'images/user.png'
	},
	address:{
		lines: {
			type: [String]
		}, 
		postal: {
			type: String
		}
	}
})