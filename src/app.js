const stateId = "nim-state-cookie";

function showSection(elemId){
    document.getElementById(getCookie(stateId)).style.display = 'none';
    setCookie(stateId, elemId);

    var e = document.getElementById(elemId);   
    e.style.display = 'block';
    
}

//debugger
//setCookie(stateId, "Logo");
showSection(getCookie(stateId));

document.querySelectorAll('.navbar-container a').forEach((e) => {
    e.addEventListener("click", (e) => {
        //console.log(e.target.target);
        showSection(e.target.target);
    })
});
