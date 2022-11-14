import * as Cookie from '/src/cookie.js'
import * as Utils from '/src/helpers.js'

const   loginId = "nim-login-cookie",
        login = "loginWrapper",
        loginForm ="loginForm",
        logout = "logoutWrapper";

function logIn() {
    //debugger;
    var form = Utils.getById(loginForm);
    if(form.style.display === "none"){
        form.style.display="inherit";
        return true;
    }

    var user = Utils.getById("user").value;
    var pass = Utils.getById("pass").value;

    if(user==="demo" && pass==="demo")
    {
        Cookie.set(loginId, "true");
        Utils.getById(logout).style.display="inherit";
        Utils.getById(login).style.display="none";
        form.style.display="none"; 
    }
}
function logOut(){
    Cookie.set(loginId, "false");
    Utils.getById(logout).style.display="none";
    Utils.getById(login).style.display="inherit";
    Utils.getById(loginForm).style.display="none"; 
}

//on window load check if there is a login
window.addEventListener("load", () => {
    if(Cookie.get(loginId) === "true"){
        Utils.getById(logout).style.display="inherit";
        Utils.getById(login).style.display="none";
    }
    else{
        Utils.getById(logout).style.display="none";
        Utils.getById(login).style.display="inherit";
    }
})
