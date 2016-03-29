var mongoose = require('mongoose');
var db = mongoose.connection;
var dbUrl = 'mongodb://hr:12345@ds025379.mlab.com:25379/humanresource112';


mongoose.connect(dbUrl);
process.on('SIGINT',function(){
	mongoose.connection.close(function(){
		console.log('Mongoose connection DISCONNECTED.');
		process.exit();	
	})
})

require('../models/employee.js');
require('../models/team.js');

