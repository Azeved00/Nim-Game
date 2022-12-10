//here will be a module where i can treat the 
const   http = require('http'),
        url  = require('url'),
        fs   = require('fs');

function setDefaults (obj,def) {
    return Object.assign({},def,obj);
};

module.exports = class {
    constructor(port){
        this.port = port;
        this.server = http.createServer((request, response) => {
            const parsedUrl = url.parse(request.url,true);    
            const pathname = parsedUrl.pathname;
            const query = parsedUrl.query;
           
            console.log(request.method + " @ " + pathname);            
            if(request.method === "POST"){
                switch(pathname){
                    case "/register":
                        this.sendJSON({text:"HII"});
                        break;
                    case "/join":
                        break;
                    case "/leave":
                        break;
                    case "/notify":
                        break;
                    case "/update":
                        break;
                    case "/ranking":
                        break;
                } 
            }
            else if(request.method === "GET"){
                let regex = new RegExp(/(^\/assets\/)|^(\/components\/)|(\/src\/)/m);
                if( pathname === "" || pathname === "/" || pathname === "/index.html")
                    this.sendFile(response,"/index.html");
                if(regex.test(pathname))
                    this.sendFile(response,pathname);
            }
            else {
                this.sendError(response,{
                    code:404,
                    msg:"Pedido Desconhecido"
                })
            }
        });
    }

    sendError(response,input){
        let opt = setDefaults(input,{
            code : 400,
            msg: "Houve um erro no pedido"
        })

        console.log("\t Error: " + opt.msg);
        response.writeHead(opt.code, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({
            "error":opt.msg
        }));
    }
   
    async sendFile(response,path){
        path = "." + path;
        let typeRegEx = new RegExp(/\.[a-z]+$/m);
        let match = typeRegEx.exec(path);
        const typeMap = new Map();
        typeMap.set(".css", "text/css");
        typeMap.set(".html","text/html");
        typeMap.set(".js",  "application/javascript");
        typeMap.set(".ico", "image/x-icon");
        typeMap.set(".png", "image/png");
        typeMap.set(".ttf", "font/ttf");

        let type = typeMap.get(match[0]);
        if(!type) type = "text/plain";

        await fs.readFile(path,'utf8',(err,data) => {
            if(!err) {
                console.log("\tOK!")
                response.writeHead(200, {'Content-Type' : type});
                response.end(data);
            }
            else {
                this.sendError(response,{
                    code: 404,
                    msg: "Error reading file " + path
                });
            }
        });
    }

    sendJSON(response,input){ 
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(input))
    }
    
    start(){
        this.server.listen(this.port);
    }
}
