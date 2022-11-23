class Config {
    constructor(n,f,a,l){
        this.size = n;
        this.first = first;
        this.ai = a;
        this.lvl = l;
    }
}


Utils.getById("changeConfigBtn").addEventListener("click",()=>{
    let form = Utils.getById("configForm");
    Modals.Config.clearErrors();

    let valid = true,
        size = Utils.getById("size").value,
        first = Utils.getById("first").checked,
        ai = Utils.getById("bot").checked,
        lvl =(() => {
            let rads = document.getElementsByName("dif"), i;
            for (i=0; i < rads.length; i++)
                if (rads[i].checked)
                    return rads[i].value;
            return null;
        })();


    // do validation shannanigans here
    if(parseInt(size)<1) Modals.Config.error("Invalid Collumn Number");
    if(!valid) return;
    
    
    conf = new Config(parseInt(size),first,ai,lvl);
});
