function isNOE (a) {
    return !a;
}

function getById(id){
    return document.getElementById(id);
}

function showSection(elemId){
    getById(getCookie(stateId)).style.display = 'none';

    if(isNOE(elemId))
        elemId=defaultState;
    var e = getById(elemId);  
    setCookie(stateId, elemId);
    e.style.display = 'block';
    
}


