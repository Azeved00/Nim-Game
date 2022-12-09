const   http = require('http'),
        url  = require('url'),
        port = 8004;

const server = http.createServer(function (request, response) {
    const parsedUrl = url.parse(request.url,true);    
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
        
    switch(pathname){
        case "/register":
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({
                text:"that path is well known"
            }))
            break;
        case "/join":
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({
                text:"that path is well known"
            }))
            break;
        case "/leave":
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({
                text:"that path is well known"
            }))
            break;
        case "/notify":
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({
                text:"that path is well known"
            }))
            break;
        case "/update":
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({
                text:"that path is well known"
            }))
            break;
        case "/ranking":
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({
                text:"that path is well known"
            }))
            break;
        default:
            response.writeHead(404, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({
                error: "The path you requested is not known"
            }));
            break;
    }
});

server.listen(port);

