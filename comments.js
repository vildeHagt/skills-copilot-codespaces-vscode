// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = [];

var server = http.createServer(function(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var path = url_parts.pathname;
	if (path === '/comments' && req.method === 'POST') {
		// Get data from the client
		var body = '';
		req.on('data', function(chunk) {
			body += chunk;
		});
		req.on('end', function() {
			var data = qs.parse(body);
			comments.push(data.comment);
			res.end('Success');
		});
	} else if (path === '/comments' && req.method === 'GET') {
		var data = JSON.stringify(comments);
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		res.end('Not Found');
	}
});

server.listen(3000, function() {
	console.log('Server running...');
});