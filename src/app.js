const stateId = "nim-state-cookie";
const defaultState = "Logo";


// cheks if the message written is a command
// if yes run the command
// if not write it to the message prompt
function messageHandler(v) { 
    var cmd = v.split(" ");

    switch (cmd[0]){
        case "init":
            writeMessage("Game Started!")
            config.game();
            break;
        case "take" : 
            var res = config.move(cmd[1],cmd[2]);
            if(!res)
                AddError("Move is Impossible");
            else{
                if(cmd[2] == "")
                    writeMessage(`Player has taken all balls from ${cmd[1]} collumn.`);
                else
                    writeMessage(`Player has taken ${cmd[2]} balls from ${cmd[1]} collumn.`);
                //writeMessage(config.nimSum());
            }
            break;
        case "ai":
            ai(config);
            writeMessage(`Computer has taken ${res.otr} balls from ${res.pile} collumn.`);
            break;
        default: writeMessage(v);
    }
}

function main() {

    //setCookie(stateId, defaultState);
    if(isNOE(getCookie(stateId)))
        setCookie(stateId, defaultState);
    showSection(getCookie(stateId));

    checkLogin();

    document.querySelectorAll('.navbar-container a').forEach((e) => {
        e.addEventListener("click", (e) => {
            //console.log(e.target.target);
            if(!isNOE(e.target.getAttribute('data-target')))
                showSection(e.target.getAttribute('data-target'));
            else
                showSection(defaultState);
        })
    });

    getById('gameStart').addEventListener("click", (e) => {
        config.game();
    });

    getById('messageInput').addEventListener("keypress", (e) =>{
        if (e.key === 'Enter') {
            //debugger;
            messageHandler(e.target.value);
            e.target.value = "";
        }
    });
}






