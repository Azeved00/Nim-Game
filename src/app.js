const stateId = "nim-state-cookie";


//setCookie(stateId, defaultState);
if(Utils.isNOE(Cookie.get(stateId)))
    Cookie.set(stateId, defaultState);
showSection(Cookie.get(stateId));



