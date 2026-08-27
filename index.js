const http = require('node:http');


const server = http.createServer();

server.on('request', (request, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello, World! The HTTP server has started successfully.',
    }));
});

server.listen(3000);
