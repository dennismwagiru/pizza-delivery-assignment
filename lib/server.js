/*
 * @created 18/01/2021 - 8:50 PM
 * @project two
 * @author  dennis joel
*/

const http = require('http');
const StringDecoder = require('string_decoder').StringDecoder;
const jsonHelper = require('../helpers/appHelper');
const cartHandler = require('../handlers/cartHandler');
const notFoundHandler = require('../handlers/notFoundHandler');
const menuHandler = require('../handlers/menuHandler');
const usersHandler = require('../handlers/usersHandler');
const authHandler = require('../handlers/authHandler');

const server = {}

server.httpServer = http.createServer(((req, res) => {
    server.unifiedServer(req, res);
}));

server.unifiedServer = (req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1/')

    // Get path
    const path = url.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the url search parameters
    const searchParams = url.searchParams;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        console.log("Trimmed Path", trimmedPath);

        // Choose the handler this request should go to. If none is found use the not found handler
        const handler = typeof(server.router[trimmedPath]) != 'undefined' ? server.router[trimmedPath] : notFoundHandler.init;

        const data = {
            'trimmedPath': trimmedPath,
            'queryString': Object.fromEntries(searchParams),
            'method': method,
            'headers': headers,
            'payload': jsonHelper.parseJsonObject(buffer),
        }

        handler(data, (statusCode, payload) => {
            console.log(statusCode, payload);

            // Use the status code call back by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // If the response is 200, print green, else print red
            if (statusCode === 200){
                console.log('\x1b[32m%s\x1b[0m', method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
            } else {
                console.log('\x1b[31m%s\x1b[0m', method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
            }
        });
    });
};

// Define a request router
server.router = {
    'auth': authHandler.init,
    'users': usersHandler.init,
    'menu': menuHandler.init,
    'cart': cartHandler.init,
}

server.init = () => {
    server.httpServer.listen(3000, () => {
        console.log('The server is listening on port 3000 now');
    });
};

module.exports = server;
