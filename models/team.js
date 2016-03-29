var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var postFind = require('mongoose-post-find');

var TeamSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	member:{
		type: [Schema.Types.Mixed]
	}

})

function _attachMembers(Employee,result,callback){
	Employee.find({
		team: result._id
	}), function(error,employees){
		if(error){
			return callback(error);
		}
		result.members = employees;
		callback(null,result);
	}
}

TeamSchema.plugin(postFind,{
	find:function (result, callback){
		var Employee = mongoose.model('Employee');
		async.each(result, function(item,callback){
			_attachMembers(Employee, item, callback)
		},function(error){
			if(error){
				return callback(error);
			}
			callback(null, result);
		});
	},
	findOne: function(result, callback){
		var Employee = mongoose.model('Employee');
		_attachMembers(Employee, result, callback);
	}
})

module.exports = mongoose.model('Team', TeamSchema);