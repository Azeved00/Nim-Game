import * as Utils from "/src/helpers.js"
import * as Cookie from "/src/cookie.js"

const stateId = "nim-state-cookie";
const defaultState = "Logo";
var state = "Logo";

export function show(elemId = defaultState){
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
      show(defaultState);
    }
}
