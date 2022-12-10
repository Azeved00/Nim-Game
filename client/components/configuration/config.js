class Config {
    static fromModal(){
        Modals.Config.clearErrors();
        let valid = true,
            multiSize = parseInt(Utils.getById("multiSize").value),
            singleSize = parseInt(Utils.getById("singleSize").value),
            first = Utils.getById("first").checked,
            lvl =(() => {
                let rads = document.getElementsByName("dif"), i;
                for (i=0; i < rads.length; i++)
                    if (rads[i].checked)
                        return parseInt(rads[i].value);
                return null;
            })();


        // do validation shannanigans here
        let singleBtn = Utils.getById("singleBtn");
        let multiBtn = Utils.getById("multiBtn");
        if(multiBtn.dataset.active === "true"){
            if(!valid) return null;
            conf = new Config({
                size: multiSize,
                ai: false,
            });
        }
        else if (singleBtn.dataset.active === "true"){
            if(Utils.isNOE(singleSize)){
                valid = false;
                Modals.Config.error("Size Must be a Number");
            }
            if(singleSize<1){
                valid = false;
                Modals.Config.error("Size Must be a Positive Number");
            } 
            if(Utils.isNOE(lvl)){
                valid = false;
                Modals.Config.error("Please Select Dificulty");
            } 
            if(!valid) return null;

            conf = new Config({
                size: singleSize,
                first: first,
                ai: true,
                lvl: lvl
            });
        }else{
            valid = false;
            Modals.Config.error("Please select mode!")
        }
        if(!valid) return null;
        
        
        return conf;
    }

    static reset(){
        Utils.getById("multiForm").style.display="";
        Utils.getById("btn-wrapper").style.display="";
        Utils.getById("singleForm").style.display="";
    }
    constructor(input){
        let opt = Utils.setDefaults(input,{
            size : 5,
            first: true,
            ai : true,
            lvl : 2,
            debug: false,
        }); 
        this.size = opt.size;
        this.first = opt.first;
        this.ai = opt.ai;
        this.lvl = opt.lvl;
        if(opt.debug) console.log(this);
    }
}


Utils.getById("changeConfigBtn").addEventListener("click",() => {
    if(!Utils.isNOE(Config.fromModal()))
        Modals.Config.toggle();
    Config.reset();
}); 
Utils.getById("multiBtn").addEventListener("click",() => {
    Utils.getById("multiBtn").dataset.active="true";
    Utils.getById("multiForm").style.display="block";
    Utils.getById("btn-wrapper").style.display="none";
    Utils.getById("singleForm").style.display="none";
});

Utils.getById("singleBtn").addEventListener("click",() => {
    Utils.getById("singleBtn").dataset.active="true";
    Utils.getById("singleForm").style.display="block";
    Utils.getById("btn-wrapper").style.display="none";
    Utils.getById("multiForm").style.display="none";
})
