const stateId = "nim-state-cookie";
const defaultState = "Logo";
const defaultConfig = {
    coll : 5,
    first: true,
    ai   : true,
    diff : 1,
}

function onLoad() {

    //setCookie(stateId, defaultState);
    if(isNOE(getCookie(stateId)))
        setCookie(stateId, defaultState);
    showSection(getCookie(stateId));

    checkLogin();

    document.querySelectorAll('.navbar-container a').forEach((e) => {
        e.addEventListener("click", (e) => {
            //console.log(e.target.target);
            if(!isNOE(e.target.getAttribute('data-target')))
                showSection(e.target.getAttribute('data-target'));
            else
                showSection(defaultState);
        })
    });

    getById('messageInput').addEventListener("keypress", (e) =>{
        if (e.key === 'Enter') {
            //debugger;
            messageHandler(e.target.value);
            e.target.value = "";
        }
    });
}




