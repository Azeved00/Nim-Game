import * as Utils from "/src/helpers.js"
import { toggleDisplay as toggleMessages } from "/modules/messages/messages.js"
import { modal } from "/src/modal.js"


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
    Utils.getById("configBtn").onclick = () => {modal('Config')}; 
    Utils.getById("classBtn").onclick = () => {modal('Class')}; 
    Utils.getById("messagesBtn").onclick = msgBtn; 
    Utils.getById("rulesBtn").onclick = () => {modal('Rules')}; 

    //add the stylesheet to dom
    Utils.addStyleSheet('/modules/sidebar/sidebar.css');
}
