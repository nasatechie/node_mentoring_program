/*
* This is the primary file for API
*
*/

// Dependencies
var http = require('http');
var url = require('url');
const { StringDecoder } = require('string_decoder');
var stringDecoder = require('string_decoder').StringDecoder;

// the server should respond to all requests with a string
var server = http.createServer(function (req, res) {
    // get the URL and parse it
    var parsedURL = url.parse(req.url, true);
    // get the path
    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get the query string as an object
    var queryStringObject = parsedURL.query;

    //get the HTTP method
    var method = req.method.toLowerCase();

    // get the headers as an object
    var headers = req.headers;

    // get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', function(data){
        buffer += decoder.write(data);
    })

    req.on('end', function () {
        buffer += decoder.end();
        // send the response 
        res.end('Hello NASA');
    
        // log the requested path
        console.log('request received on path', trimmedPath, 'with method: ',
            method, "with this query string parameters", queryStringObject, "with headers", headers, 
            'payload:', buffer);
    })

})

// start the server and listen it to 3000
server.listen(3000, function () {
    console.log('server listening on port 3000')
})