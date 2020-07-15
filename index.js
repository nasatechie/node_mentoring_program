/*
* This is the primary file for API
*
*/

// Dependencies
var http = require('http');

// the server should respond to all requests with a string
var server = http.createServer(function(req, res) {
    res.end('Hello world');
})

// start the server and listen it to 3000
server.listen(3000, function(){
    console.log('server listening on port 3000')
})