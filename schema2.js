var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
	name:{
		type: String,
		required: true
	}
})
var db = mongoose.connection;
var dbUrl = '';



var Team = mongoose.model('Team',TeamSchema);
db.on('error',function(error){
	
})
mongoose.connect(dbUrl,functino(err){
	if(err){
		return console.log('Error')
	}
	var team = new Team({
		name: 'product management' 
	})
	team.save(function(error,data){

	})
})