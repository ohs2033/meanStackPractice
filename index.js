var http = require('http');
var employeeService = require('./lib/employee.js');
var dataGenerator  = require('./lib/dataGenerator.js');
var staticFile = dataGenerator.staticFile('/public');

http.createServer(function(req,res){
	var _url= req.url;
	req.method = req.method.toUpperCase();
	if(req.method !== 'GET'){
		res.writeHead(501,{
			'Content-type': 'text/plain'});
		return res.end(req.method + ' is not implemented by this server.');
	}
	if(_url = /^\/employees$/i.exec(req.url)){
		employeeService.getEmployees(function(error,data){
			if(error){
				dataGenerator.send500(data,res);
				//500
			}
			dataGenerator.sendJson(data,res)
			//200 and data.
		})
	}else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)){
		console.log(_url);
		employeeService.getEmployee(_url,function(error,data){
			if(error){
				dataGenerator.send500(data,res);
				//500
			}
			if(!data){
				dataGenerator.send404(res)
				//404
			}
			return dataGenerator.sendJson(data,res);
			//200 and data.	
		})
	}else{
		res.writeHead(200);
		var _url = req.url;
		staticFile(_url,res);
		//200 and static file.
	}
}).listen(3000,'127.0.0.1').on('error',function(err){console.log(err);})

console.log('server is on 127.0.0.1:3000');