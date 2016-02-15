'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let mimes = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.gif': 'images/gif',
	'.jpg': 'images/jpeg',
	'.png': 'images/png'
}

function webServer(req, res){
	let baseURI = url.parse(req.url, true);
	let filePath = __dirname+(baseURI.pathname === '/' ? '/index.html' : baseURI.pathname);

	fs.access(filePath, fs.F_OK, err=>{
		if(!err){
			fs.readFile(filePath, (err, data)=>{
				if(!err){
					let contenType = mimes[path.extname(filePath)];
					res.writeHead(200, {'Content-type': contenType});
					res.end(data, 'utf-8');
				}else{
					res.writeHead(500);
					res.end('file read error');
				}
			})
		}else{
			res.writeHead(404);
			res.end('file do not exist');
		}
	})
}


http.createServer(webServer).listen(3000, ()=> {console.log('webserver running on port 3000')});