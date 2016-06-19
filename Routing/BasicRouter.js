'use strict';
const http=require('http');
//trying to bringing url modul
const url=require('url');

//this are the routes to determine which route has been called 
let routes={
	'GET':{
		'/':(req,res)=>{
			res.writeHead(200,{'Content-Type':'text/html'});
	        res.end('<h1>Hello Router</h1>');
		},
		'/about':(req,res)=>{
			res.writeHead(200,{'Content-Type':'text/html'});
	        res.end('<h1>This is about me</h1>');
		},
		'/api/getinfo':(req,res)=>{
			res.writeHead(200,{'Content-Type':'text/html'});
            res.end(JSON.stringify(req.queryParams));

		}

	},
	'POST':{
		

	},
	'NA':(req,res)=>{
		res.writeHead(404);
		res.end('Content not found!')

	}
}

function router(req,res){
	let baseURI=url.parse(req.url,true);
	//console.log('Requested route: ',baseURI);
    //console.log('Method', req.method);
	//res.writeHead(200,{'Content-Type':'text/html'});
	//res.end('<h1>Hello Router</h1>');
	let resolveRoute=routes[req.method][baseURI.pathname];   //req.method=> determine the type like get or post etc
	                                                         //baseURI.pathname= actual pathname like /api/something
	if(resolveRoute!=undefined){
		req.queryParams=baseURI.queryParams;
		resolveRoute(req,res);
	}else{
		routes['NA'](req,res);
	}
}
http.createServer(router).listen(3000);
console.log('server is running on port 3000');