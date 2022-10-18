function showSection(elemId){
    getById(getCookie(stateId)).style.display = 'none';

    if(isNOE(elemId))
        elemId=defaultState;
    var e = getById(elemId);  
    setCookie(stateId, elemId);
    e.style.display = 'block';
    
}

function modal(elemId, message){
    var e = getById(elemId);
    if(e.style.display !== 'flex'){
        var shadow= createElem("div");
        shadow.id="ModalShadow";
        shadow.addEventListener("click",() => {
            modal(elemId);
        })
        document.querySelector("body").appendChild(shadow);    
        e.style.display = 'flex';
    }
    else{
        var s = getById("ModalShadow");
        s.remove();
        s.style.display = 'none'
        e.style.display = '';
    }

    
    if(elemId === "FinishMessage")
       getById("FinishMessageBody").innerHTML=message; 
}
function changeConfigBtn(){
    modal("Config");
    let form = getById("configForm");
    config.colls = getById("size").value;
    config.start = getById("first").checked;
    config.ai    = getById("bot").checked;
    
    let rads = document.getElementsByName("dif"), i;
       for (i=0; i < rads.length; i++)
              if (rads[i].checked)
                      config.diff = rads[i].value;

    config.colls = parseInt(config.colls);
    config.diff  = parseInt(config.diff); 

    config.reload();

}
function restartBtn(){
    modal("FinishMessage");
    config.game();
}
function playBtn(){
    getById("playBtn").style.display="none";
    getById("giveUpBtn").style.display="block";
    getById("configBtn").style.display="none";

    config.game();
}
function giveUpBtn(){
    getById("playBtn").style.display="block"; 
    getById("configBtn").style.display="block";
    getById("giveUpBtn").style.display="none";

    config.giveUp();
}
function closeBtn(){
    modal("FinishMessage");
    giveUpBtn();
}
