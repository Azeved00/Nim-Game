var Navbar =(function () {
    let inWrapper = Utils.getById("loginWrapper");
    let outWrapper  = Utils.getById("logoutWrapper");
    let form = Utils.getById("loginForm");
    let token = "login-token";
    let tpass = "password-token";
    (()=>{
        let usr = localStorage.getItem(token);
        if(Utils.isNOE(usr))
            localStorage.setItem(token,"");
    })()
    return {
        getUser:()=>{
            return localStorage.getItem(token);
        },
        getPassword: () => {
            return localStorage.getItem(tpass);
        },
        logIn:() => {
            if(form.style.display === "none"){
                form.style.display="inherit";
                return true;
            }

            var user = Utils.getById("user").value;
            var pass = Utils.getById("pass").value;
            
            makeRequest({
                command:"register",
                body:{
                    "nick":user,
                    "password":pass
                },
                okCallback: () => {
                    Utils.getById("userLabel").innerHTML=user;
                    inWrapper.style.display="none";
                    outWrapper.style.display="inherit";
                    localStorage.setItem(token,user);
                    localStorage.setItem(tpass,pass);
                    Utils.triggerEvent(Utils.getById("Board"),"login");
                },
                badCallback: () => {
                    Utils.getById("pass").value="";
                }
            })
        },
        logOut:()=>{
            Utils.triggerEvent(Utils.getById("Board"),"logout");
            outWrapper.style.display="none";
            inWrapper.style.display="inherit";
            Utils.getById("userLabel").innerHTML="";
            form.style.display="none";
            localStorage.setItem(token,"");
        },
        checkLogin:()=>{
            let usr = localStorage.getItem(token);
            if(usr){
                outWrapper.style.display="inherit";
                Utils.getById("userLabel").innerHTML=usr;
                inWrapper.style.display="none";
            }
            else{
                outWrapper.style.display="none";
                inWrapper.style.display="inherit";
                Utils.getById("userLabel").innerHTML="";
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
