const   loginId = "nim-login-cookie",
        login = "loginWrapper",
        loginForm ="loginForm",
        logout = "logoutWrapper";

function logIn() {
    //debugger;
    var form = getById(loginForm);
    if(form.style.display === "none"){
        form.style.display="inherit";
        return true;
    }

    var user = getById("user").value;
    var pass = getById("pass").value;

    if(user==="demo" && pass==="demo")
    {
        setCookie(loginId, "true");
        getById(logout).style.display="inherit";
        getById(login).style.display="none";
        form.style.display="none"; 
    }
}
function logOut(){
    setCookie(loginId, "false");
    getById(logout).style.display="none";
    getById(login).style.display="inherit";
    getById(loginForm).style.display="none"; 
}
function checkLogin(){
    if(getCookie(loginId) === "true"){
        getById(logout).style.display="inherit";
        getById(login).style.display="none";
    }
    else{
        getById(logout).style.display="none";
        getById(login).style.display="inherit";
    }
}
