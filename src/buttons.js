const stateId = "nim-state-cookie";
const defaultState = "Logo";
var state = "Logo";

function showSection(elemId){
    //var a = getCookie(stateId);
    var curr = getById(state)
    if(curr)
      curr.style.display = 'none';

    if(isNOE(elemId))
        elemId=defaultState;

    var e = getById(elemId);
    if(e){
      //setCookie(stateId, elemId);
      state = elemId;
      e.style.display = 'block';
    }
    else{
      showSection(defaultState);
    }

}

function modal(elemId, message){
    var e = getById(elemId);
    if(e.style.display !== 'flex'){
        var shadow= createElem("div");
        shadow.id="ModalShadow";
        shadow.addEventListener("click",() => {
            if(elemId == "FinishMessage"){
              closeBtn();
            }
            else {
              modal(elemId);

            }
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
    if(elemId === "StandardMessage")
       getById("StandardMessageBody").innerHTML=message;
}
function changeConfigBtn(){
    let form = getById("configForm");

    if(parseInt(getById("size").value)<1){
        var errors = getById("errorText");
        errors.innerHTML ="";
        errors.appendChild(createElemT("p","Invalid Collumn Number"));
        return;
    }

    modal("Config");
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
    getById("playBtn").style.display="block";
    getById("configBtn").style.display="block";
    getById("giveUpBtn").style.display="none";

    modal("FinishMessage");
    config.reload();
}
