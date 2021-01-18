/*
 * @created 18/01/2021 - 8:50 PM
 * @project two
 * @author  dennis joel
*/

const http = require('http');
const StringDecoder = require('string_decoder').StringDecoder;
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

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end('Hello world!')
    });
};

server.init = () => {
    server.httpServer.listen(3000, () => {
        console.log('The server is listening on port 3000 now');
    });
};

module.exports = server;
