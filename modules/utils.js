setDefaults = function (obj,def) {
    return Object.assign({},def,obj);
};

sendJSON = async function (response,input){ 
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(input))
}

sendError = async function (response,input){
    let opt = setDefaults(input,{
        code : 400,
        msg: "Houve um erro no pedido"
    })

    console.log("\t Error: " + opt.msg);
    response.writeHead(opt.code, {});
    response.end(JSON.stringify({
        "error":opt.msg
    }));
}

hashString = function(string){
    return require("crypto").createHash('md5').update(string).digest('hex');
}
