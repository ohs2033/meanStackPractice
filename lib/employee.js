var employeeDb = require('../database/employee.json')
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;




function getEmployees(callback){
	setTimeout(function(){
		console.log(employeeDb[0]);
		callback(null,employeeDb);
	},500)
}


function getEmployee(employeeId,callback){
	getEmployees(function(error,data){
		if(error){
			return callback(error);
		}
		var result = data.find(function(item){
			return item.id === employeeId[1];
		})
		callback(null,result);
	})
}
