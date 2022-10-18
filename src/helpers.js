function isNOE (a) {
    return !a;
}

function getById(id){
    return document.getElementById(id);
}
function createElem(tag){
    return document.createElement(tag);
}

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

function isInt(id) {
    return typeof(id) === 'number' &&
            isFinite(id) &&
            Math.round(id) === id;
}

function triggerEvent(el, type) {
    // IE9+ and other modern browsers
    if ('createEvent' in document) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on' + e.eventType, e);
    }
}

