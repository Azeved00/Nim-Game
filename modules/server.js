//here will be a module where i can treat the 
require('./utils.js')
const   http = require('http'),
        url  = require('url'),
        fs   = require('fs'),
        users= require('./users.js')();
        rank = require('./ranking.js')(); 

module.exports = function (port) {
    let module = {};
    module.port = port;

    //------------------- HELPER FUNCTIONS ---------------------
    async function sendFile(response,path){
        path = "." + path;
        let typeRegEx = new RegExp(/\.[a-z]+$/m);
        let match = typeRegEx.exec(path);
        const typeMap = new Map();
        typeMap.set(".css", "text/css");
        typeMap.set(".html","text/html");
        typeMap.set(".js",  "application/javascript");
        typeMap.set(".ico", "image/ico");
        typeMap.set(".png", "image/png");
        typeMap.set(".ttf", "font/ttf");

        let type = typeMap.get(match[0]);
        if(!type) type = "text/plain";

        let mode = 'utf-8';
        if(type === "image/ico" || type=== "image/png" || type==="font/ttf")
            mode = "";

        await fs.readFile(path,mode,(err,data) => {
            if(!err) {
                console.log("\tOK!")
                response.writeHead(200, {'Content-Type' : type});
                response.end(data);
            }
            else {
                console.log(err);
                response.sendError(response,{
                    code: 404,
                    msg: "Error reading file " + path
                });
            }
        });
    }

    //--------------------HANDLER FUNCTIONS---------------------
    async function postMethod (response,pathname,body) {
        switch(pathname){
            case "/register":
                users.register(response,body);
                break;
            case "/join":
                rank.addEntry(body)
                break;
            case "/leave":
                break;
            case "/notify":
                break;
            case "/ranking":
                rank.checkRank(response,body);
                break;
        } 
    }  

    async function getFileMethod (response,pathname){
        const regex = new RegExp(/(^\/client\/)/m);
        if( pathname === "" || pathname === "/" || pathname === "/index.html")
            sendFile(response,"/client/index.html");
        else if(pathname === "/favicon.ico")
            sendFile(response,"/client/assets/favicon.ico");
        else if(regex.test(pathname))
            sendFile(response,pathname);
        else 
            sendError(response,{
                code: 404,
                msg: "Data not Found"
            })
    }

    //---------------------SERVER-------------------------
    module.server = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url,true);    
        const pathname = parsedUrl.pathname;
        const query = parsedUrl.query;   
        let body = '';
        
        console.log(request.method + " @ " + pathname);
        switch(request.method){
            case "POST":
                request.on('data', (chunk) => { body += chunk;  })
                    .on('end', () => {
                        try { 
                            let fbody = JSON.parse(body);  
                            postMethod(response,pathname,fbody);     
                        }
                        catch(err) {  console.log(err.message) }
                })
                .on('error', (err) => { console.log(err.message); });
                break;
            case "GET":
                if(pathname === "/update"){
                    //here update will be done
                }
                getFileMethod(response,pathname);
                break;
            default:
                sendError(response,{
                    code:404,
                    msg:"Pedido Desconhecido"
                })
        }
    });
    
    module.start= () => {
        console.log("Server Started @ http://localhost:"+module.port);
        module.server.listen(module.port);
    }

    return module;
}
