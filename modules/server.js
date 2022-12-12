//here will be a module where i can treat the 
require('./utils.js')
const   http = require('http'),
        url  = require('url'),
        fs   = require('fs'),
        users= require('./users.js')(),
        rank = require('./ranking.js')(),
        game = require('./game.js')(),
        updater = require('./updater.js');


const typeMap = {
    ".css": "text/css",
    ".js":"application/javascript",
    ".html":"text/html",
    ".ico":"image/ico",
    ".png":"image/png",
    ".ttf":"font/ttf"
}

//------------------- HELPER FUNCTIONS ---------------------
async function sendFile(response,path){
    path = "." + path;
    let typeRegEx = new RegExp(/\.[a-z]+$/m);
    let match = typeRegEx.exec(path);

    let type = typeMap[match[0]];
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
            try{
                let check = users.register(body);
                if(check !== true){
                    return sendError(response,{
                        code: 401,
                        msg: "Username or Password is incorrect"
                    });
                }
                sendJSON(response,{});

            }
            catch(err){
                sendError(response,{
                    code: 500,
                    msg: "Server Error"
                })
            }
            break;
        case "/join":
            try{
                let check = users.register(body);
                if(check !== true){
                    return sendError(response,{
                        code: 401,
                        msg: "Username or Password is incorrect"
                    });
                }
                
                sendJSON(response,game.join(body.nick,body.group,body.size));
            }
            catch(err){
                sendError(response,{
                    code: 500,
                    msg: "Server Error"
                })
            }
            break;
        case "/leave":
            try{
                let check = users.register(body);
                if(check !== true){
                    return sendError(response,{
                        code: 401,
                        msg: "Username or Password is incorrect"
                    });
                }
                let res = game.leave(body.nick,body.game)
                if(res === true)
                    sendJSON(response,{});
                else
                    sendError(response,{msg:"Game not found"});
            }
            catch(err){
                sendError(response,{
                    code: 500,
                    msg: "Server Error"
                })
            }
            break;
        case "/notify":
            try{
                let check = users.register(body);
                if(check !== true){
                    return sendError(response,{
                        code: 401,
                        msg: "Username or Password is incorrect"
                    });
                }

                let res = game.play(body.nick,body.game,body.stack,body.pieces);                
                if(res !==true)
                    sendError(response,{"msg":res});
                sendJSON(response,{});
            }
            catch(err){
                console.log(err);
                sendError(response,{
                    code: 500,
                    msg: "Server Error"
                })
            }
            break;
        case "/ranking":
            rank.checkRank(response,body);
            break;
    } 
}  

async function getFileMethod (response,pathname){
    const regex = new RegExp(/(^\/client\/)/m);
    if( pathname === "" || pathname === "/" || pathname === "/index.html")
        sendFile(response,"/index.html");
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


module.exports = function (port) {
    let module = {};
    module.port = port;

    //---------------------SERVER-------------------------
    module.server = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url,true);    
        const pathname = parsedUrl.path;
        const query = parsedUrl.query;   
        let body = '';
        
        console.log(request.method + " @ " + pathname);
        switch(request.method){
            case "POST":
                request.on('data', (chunk) => { body += chunk;  })
                    .on('end', () => {
                        try { 
                            body = JSON.parse(body);  
                            postMethod(response,pathname,body);     
                        }
                        catch(err) {  console.log(err.message) }
                })
                .on('error', (err) => { console.log(err.message); });
                break;
            case "GET":
                const regex = new RegExp(/(^\/update\?)/m);
                if(regex.test(pathname)){
                    updater.remember(query.game,response);
                    request.on('close', () => updater.forget(query.game,response)); 
                    response.writeHead(200,{    
                                'Content-Type': 'text/event-stream',
                                'Cache-Control': 'no-cache',
                                'Access-Control-Allow-Origin': '*',
                                'Connection': 'keep-alive'        
                    });
                }
                else getFileMethod(response,pathname);
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
