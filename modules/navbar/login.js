var Navbar =(function () {
    let inWrapper = Utils.getById("loginWrapper");
    let outWrapper  = Utils.getById("logoutWrapper");
    let form = Utils.getById("loginForm");
    let token = "login-token";
    let tpass = "password-token";
    let savedUser = "";
    let savedPassword ="";
    (()=>{
        let usr = localStorage.getItem(token);
        if(usr){
            outWrapper.style.display="inherit";
            Utils.getById("userLabel").innerHTML=usr;
            inWrapper.style.display="none";
            savedUser = usr;
            savedPassword = localStorage.getItem(tpass);
        }
        else{
            localStorage.setItem(token,"");
            outWrapper.style.display="none";
            inWrapper.style.display="inherit";
            Utils.getById("userLabel").innerHTML="";
        }
    })()
    return {
        getUser:()=>{
            if(savedUser === "") 
                return localStorage.getItem(token);
            else return savedUser;
        },
        getPassword: () => {
            if(savedPassword === "")
                return localStorage.getItem(tpass);
            else return savedPassword;
        },
        logIn:() => {
            if(form.style.display === "none"){
                form.style.display="inherit";
                return true;
            }

            let user = Utils.getById("user").value;
            if(user.length < 2){
                Modals.Msgs.edit({
                    title:"User name is to small.",
                    show:true,
                    message:"User name should be at least 3 characters long.",
                    closeBtn:true,
                    buttons:[
                        {
                            text:"Ok",
                            callback: () => {
                                Modals.Msgs.toggle();
                            },
                        }
                    ]
                })
                return false;
            }
            let pass = Utils.getById("pass").value;
            savedUser = user;
            savedPass = pass;
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
            savedUser="";
            savedPassword="";
            localStorage.setItem(token,"");
        }
    }
})();

//add click events
Utils.getById("loginBtn").addEventListener("click",Navbar.logIn);
Utils.getById("logoutBtn").addEventListener("click",Navbar.logOut);
Utils.getById("logoNavBtn").addEventListener("click",() => {window.location.reload()})

