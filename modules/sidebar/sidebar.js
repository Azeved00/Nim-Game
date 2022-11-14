import * as Utils from "/src/helpers.js"
import { toggleDisplay as toggleMessages } from "/modules/messages/messages.js"

function restartBtn(){
    modal("FinishMessage");
    //config.game();
}
function playBtn(){
    Utils.getById("playBtnWrapper").style.display="none";
    Utils.getById("giveUpBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="none";

    //config.game();
}
function giveUpBtn(){
    Utils.getById("playBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="block";
    Utils.getById("giveUpBtnWrapper").style.display="none";

    //config.giveUp();
}


function msgBtn() {
    var btn =  Utils.getById("messagesBtn");
    toggleMessages();
    if(btn.dataset.toggle == 'false') 
        btn.innerHTML='Show Messages';
    else    
        btn.innerHTML='Hide Messages';
}

var ran = true;
if(ran){
    Utils.getById("playBtn").onclick = playBtn; 
    Utils.getById("giveUpBtn").onclick = giveUpBtn; 
    //Utils.getById("configBtn").onclick = modal('config'); 
    //Utils.getById("classBtn").onclick = modal('class'); 
    Utils.getById("messagesBtn").onclick = msgBtn; 
    //Utils.getById("rulesBtn").onclick = modal('rules'); 

    
    // add messages.css to dom
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';           
    link.href = '/modules/sidebar/sidebar.css';                                                        
    document.getElementsByTagName('HEAD')[0].appendChild(link);
}
