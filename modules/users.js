require('./utils.js');
const   fs = require('fs');

//register using : nick & password
module.exports = function () {
    let module = {};

    let users;
    function loadUsers () {
        let data = fs.readFileSync("data/users.json");
        users = JSON.parse(data.toString());
    }

    function addUser (usr) {
        users.push(usr);
        fs.writeFileSync("data/users.json",JSON.stringify(users));
    }

    module.register= function (response,body){
        try {
            loadUsers();
            const search = users.find(e => e.nick === body.nick);
            body.password = hashString(body.nick+":"+body.password);

            if(!search) addUser(body);
            else if(body.password !== search.password){
                sendError(response,{
                    code: 401,
                    msg: "Username or Password is incorrect"
                });
                return;
            }

            response.end(JSON.stringify({}))
            console.log("OK!");
            users = null;
        }
        catch (err){
            console.log("Error loading Users file: " + err.message);

            sendError(response,{
                code: 500,
                msg: "Server Error"
            })
        }
    }

    return module;
}
