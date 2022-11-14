import * as Utils from "/src/helpers.js";

//adds an error to the message prompt
export function writeError(v){
    var wrapper = Utils.createElem('p');
    wrapper.style.color = "red";
    wrapper.innerHTML = v;
   
    var msgs = Utils.getById('Messages');
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight; 
}

// adds message to message prompt
export function write(v){
    var wrapper = Utils.createElem('p');
    wrapper.innerHTML = v;
   
    var msgs = Utils.getById('Messages');
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;   
}

//toggle messages display
export function toggleDisplay() {
    var msgs = Utils.getById('MessagesWrapper');
    if(msgs.style.display!=='initial'){
        msgs.style.display = 'initial';
    }
    else{
        msgs.style.display = '';
    }
}

//messages handler
export function handler(v) {
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

//at event handler to messages input
window.addEventListener("load", () => {
    // add messages.css to dom
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';           
    link.href = '/modules/messages/messages.css';                                                        
    document.getElementsByTagName('HEAD')[0].appendChild(link);

    Utils.getById('messageInput').addEventListener("keypress", (e) =>{
        if (e.key === 'Enter') {
            //debugger;
            messageHandler(e.target.value);
            e.target.value = "";
        }
    });
})
