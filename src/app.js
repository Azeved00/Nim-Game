const stateId = "nim-state-cookie";
const defaultState = "Logo";
const defaultConfig = {
    coll : 5,
    first: true,
    ai   : true,
    diff : 1,
}

function showSection(elemId){
    document.getElementById(getCookie(stateId)).style.display = 'none';

    if(isNullOrEmpty(elemId))
        elemId=defaultState;
    var e = document.getElementById(elemId);  
    setCookie(stateId, elemId);
    e.style.display = 'block';
    
}

function messageHandler(v) {
    var wrapper = document.createElement('p');
    wrapper.innerHTML = v;
   
    var msgs = document.getElementById('Messages');
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}

function onLoad() {

    //setCookie(stateId, defaultState);
    if(isNullOrEmpty(getCookie(stateId)))
        setCookie(stateId, defaultState);
    showSection(getCookie(stateId));

    document.querySelectorAll('.navbar-container a').forEach((e) => {
        e.addEventListener("click", (e) => {
            //console.log(e.target.target);
            showSection(e.target.getAttribute('data-target'));
        })
    });

    document.getElementById('messageInput').addEventListener("keypress", (e) =>{
        if (e.key === 'Enter') {
            //debugger;
            messageHandler(e.target.value);
            e.target.value = "";
        }
    });
}



function logIn() {
    //debugger;
    var form = document.getElementById("loginForm");
    if(form.style.display === "none")
        form.style.display="inherit";
    else
        form.style.display="none";
}



