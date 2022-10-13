const stateId = "nim-state-cookie";
const defaultState = "Logo";

function showSection(elemId){
    document.getElementById(getCookie(stateId)).style.display = 'none';
    setCookie(stateId, elemId);

    var e = document.getElementById(elemId);   
    e.style.display = 'block';
    
}

function onLoad() {

    setCookie(stateId, defaultState);
    if(isNullOrEmpty(getCookie(stateId)))
        setCookie(stateId, defaultState);
    showSection(getCookie(stateId));

    document.querySelectorAll('.navbar-container a').forEach((e) => {
        e.addEventListener("click", (e) => {
            //console.log(e.target.target);
            showSection(e.target.target);
        })
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



