var fs = require('fs');


exports.send404 = function(res){
	res.writeHead(404,{"Content-type":"text/plain"});
	res.end('NOT FOUND');
}

exports.sendJson =  function(data,res){
	res.writeHead(200,{"Content-type":"application/json"});
	res.end(JSON.stringify(data));
}

exports.send500 = function(data,res){
	console.error(data.red);
	response.writehead(500,{
		'Content-type':"text/plain"
	})
	response.end(data);
}

exports.staticFile = function(staticPath){
	return function(data,response){
		var readStream;
		data.replace(/^(\/home)(.html)?$/,'$1.html');
		data = '.' + staticPath + data;
		console.log(data);
		fs.stat(data, function(error,stats){
			if(error || stats.isDirectory()){
				return exports.send404(response)
			}
		readStream = fs.createReadStream(data);
		return readStream.pipe(response);
		})
	}
}
