const defaultState = "Logo";
var state="Logo"

function showSection(elemId){
    //var a = getCookie(stateId);
    var curr = Utils.getById(state)
    if(curr)
      curr.style.display = 'none';

    if(Utils.isNOE(elemId))
        elemId=defaultState;

    var e = Utils.getById(elemId);
    if(e){
      //setCookie(stateId, elemId);
      state = elemId;
      e.style.display = 'block';
    }
    else{
      showSection(defaultState);
    }
}

Utils.getById("logoBtn").onclick=() => {showSection('Play')};
