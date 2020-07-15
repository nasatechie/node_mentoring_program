/*
* This is the primary file for API
*
*/

// Dependencies
var http = require('http');
var url = require('url');
const { StringDecoder } = require('string_decoder');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

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

    req.on('data', function (data) {
        buffer += decoder.write(data);
    })

    req.on('end', function () {
        buffer += decoder.end();

        //choose the handler this request should go to, if not found, go to notFound handler
        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        //construct the data object to send to handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'payload': buffer,
            'headers': headers
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function (statusCode, payload) {
            // use the status code called by the handler or default to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            // use the payload called by the handler or default to an empty object
            payload = typeof (payload) == 'object' ? payload : {};
            //convert the payload to string
            var payloadString = JSON.stringify(payload);
            //Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // log the requested path
            console.log('returning this response:', statusCode, payloadString);

        })

        // send the response 
        // res.end('Hello NASA');


    })

})

// start the server and listen it to 3000
server.listen(config.port, function () {
    console.log(`server listening on port ${config.port}` )
})

//Define Handlers
var handlers = {};

handlers.sample = function (data, callback) {
    //callback a HTTP status code & payload object 
    callback(200, { name: 'sample handler' });
};

// Not found handler
handlers.notFound = function (data, callback) {
    callback(404);
}

// Define a request router
var router = {
    'sample': handlers.sample
}