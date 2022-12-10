

const server =((port) => {
    let type = require("./modules/server.js");
    return new type(port);
})(8004) ;

console.log("Server Started\n");
server.start();
