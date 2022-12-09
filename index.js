const   http = require('http'),
        port = 6004;

const server = http.createServer(function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Olá mundo\n');


});

server.listen(port);

