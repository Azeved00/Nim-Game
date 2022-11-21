class Navbar{
    static inWrapper  = Utils.getById("loginWrapper");
    static outWrapper = Utils.getById("logoutWrapper");
    static form = Utils.getById("loginForm");
    static cookie = "nim-login-cookie";

    static logIn(){
        if(this.form.style.display === "none"){
            this.form.style.display="inherit";
            return true;
        }

        var user = Utils.getById("user").value;
        var pass = Utils.getById("pass").value;

        if(user==="demo" && pass==="demo")
        {
            Cookie.set(this.cookie, "true");
            this.outWrapper.style.display="inherit";
            this.inWrapper.style.display="none";
            this.form.style.display="none"; 
        }
    }

    static logOut(){
        Cookie.set(this.cookie, "false");
        this.outWrapper.style.display="none";
        this.inWrapper.style.display="inherit";
        this.form.style.display="none"; 
    }

    static checkLogin(){
        if(Cookie.get(this.cookie) === "true"){
            this.outWrapper.style.display="inherit";
            this.inWrapper.style.display="none";
        }
        else{
            this.outWrapper.style.display="none";
            this.inWrapper.style.display="inherit";
        }
    }
}

Utils.getById("loginBtn").addEventListener("click",Navbar.logIn);
Utils.getById("logoutBtn").addEventListener("click",Navbar.logOut);
Utils.getById("logoNavBtn").addEventListener("click",() => {
    window.location.reload();
})


Navbar.checkLogin();
