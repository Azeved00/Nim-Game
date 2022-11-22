class Config {
    constructor(n,f.a,l){
        this.size = parseInt(n);
        this.first = first;
        this.ai = a;
        this.lvl = l;
    }
}

Utils.getById("changeConfigBtn").addEventListener("click",()=>{
    let form = Utils.getById("configForm");

    // do validation shannanigans here
    if(parseInt(Utils.getById("size").value)<1){
        var errors = Utils.getById("errorText");
        errors.innerHTML ="";
        errors.appendChild(Utils.createElemT("p","Invalid Collumn Number"));
        return;
    }

    Modals.Config.
    
    //get values
    config.colls = Utils.getById("size").value;
    config.start = Utils.getById("first").checked;
    config.ai    = Utils.getById("bot").checked;

    let rads = document.getElementsByName("dif"), i;
       for (i=0; i < rads.length; i++)
              if (rads[i].checked)
                      config.diff = rads[i].value;

    var conf = new Config();
});
