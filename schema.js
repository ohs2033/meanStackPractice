var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = mongoose.connection;
var dbUrl = 'mongodb://hr:12345@ds025379.mlab.com:25379/humanresource112'

var TeamSchema = new Schema({
	name:{
		type: String,
		required: true
	}

})

var Team = mongoose.model('Team',TeamSchema);
db.on('error',function(){
	console.log('there was an error communicating with the database');
});
function insertTeams(callback){
			Team.create({
				name:'Product Development'
			},{
				name:'Dev Ops'
			},{
				name:'Accounting'
			},function(error, pd, devops, acct){
				if(error){
					return callback(error);
				}else{
					callback(null, pd,devops,acct);
				}
				
			});
		}

var EmployeeSchema = new Schema({
	name:{
		first: {
			type: String,
			required: true
		},
		last: {
			type: String,
			required: true
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
var Employee = mongoose.model('Employee',EmployeeSchema);
function insertEmployees(pd,devops,callback){
	Employee.create({
		name:{
			first: 'John',
			last: 'Adams'
		},
		team: pd._id,
		address:{
			lines:['2 Lincoln Memorial Cir Nw'],
			zip: 20037
		}
	},{
		name:{
			first: 'Rachel',
			last: 'Posner'
		},
		team: devops._id,
		address:{
			lines:['2 Lincoln Memorial Cir Nw'],
			zip: 20037
		}
	},function(err){
			callback(err);
		})

}		
	
mongoose.connect(dbUrl, function(err){
		if(err){
			return console.log('there was a problem ' +err);
		}
		console.log('connected!');
		insertTeams(function(err, pd, devops, acct){
			if(err){ 
				return console.log(err);
			}
			insertEmployees(pd,devops,function(err){
				if(err){
					console.log(err);
				}else{
					console.log('database is saved!^o^!');
				}
				db.close();
				process.exit();
			})
		})
		//----make actual data instance.
			
})





