class Config {
    static fromModal(){
        Modals.Config.clearErrors();
        let valid = true,
            size = parseInt(Utils.getById("size").value),
            first = Utils.getById("first").checked,
            ai = Utils.getById("bot").checked,
            lvl =(() => {
                let rads = document.getElementsByName("dif"), i;
                for (i=0; i < rads.length; i++)
                    if (rads[i].checked)
                        return parseInt(rads[i].value);
                return null;
            })();


        // do validation shannanigans here
        if(Utils.isNOE(size)){
            valid = false;
            Modals.Config.error("Size Must be a Number");
        }
        if(size<1){
            valid = false;
            Modals.Config.error("Size Must be a Positive Number");
        } 
        if(ai && Utils.isNOE(lvl)){
            valid = false;
            Modals.Config.error("Please Select Dificulty");
        } 

        if(!valid) return null;
        
        
        conf = new Config({
            size: size,
            first:first,
            ai:ai,
            lvl:lvl
        });
        return conf;
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
});
