var Navbar =(function () {
    let inWrapper = Utils.getById("loginWrapper");
    let outWrapper  = Utils.getById("logoutWrapper");
    let form = Utils.getById("loginForm");
    let cookie  = "nim-login-cookie";

    return {
        logIn:()=>{
            if(form.style.display === "none"){
                form.style.display="inherit";
                return true;
            }

            var user = Utils.getById("user").value;
            var pass = Utils.getById("pass").value;

            const HttpRequest = new XMLHttpRequest();
            HttpRequest.open("POST",url+"register");
            HttpRequest.send({
                "nick" : user,
                "password" : pass
            });
            HttpRequest.onreadychange=function(){
                if(this.readyState==4 && this.status==200)
                    console.log(HttpRequest.responseText);
            }
            
        },
        logOut:()=>{
            Cookie.set(cookie, "false");
            outWrapper.style.display="none";
            inWrapper.style.display="inherit";
            form.style.display="none"; 
        },
        checkLogin:()=>{
            if(Cookie.get(cookie) === "true"){
                outWrapper.style.display="inherit";
                inWrapper.style.display="none";
            }
            else{
                outWrapper.style.display="none";
                inWrapper.style.display="inherit";
            }
        }
    }
})();

//add click events
Utils.getById("loginBtn").addEventListener("click",Navbar.logIn);
Utils.getById("logoutBtn").addEventListener("click",Navbar.logOut);
Utils.getById("logoNavBtn").addEventListener("click",() => {window.location.reload()})

//run login check
Navbar.checkLogin();
