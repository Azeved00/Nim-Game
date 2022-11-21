Utils.getById("changeConfigBtn").addEventListener("click",()=>{
    let form = Utils.getById("configForm");

    if(parseInt(Utils.getById("size").value)<1){
        var errors = Utils.getById("errorText");
        errors.innerHTML ="";
        errors.appendChild(Utils.createElemT("p","Invalid Collumn Number"));
        return;
    }

    modal("Config");
    config.colls = Utils.getById("size").value;
    config.start = Utils.getById("first").checked;
    config.ai    = Utils.getById("bot").checked;

    let rads = document.getElementsByName("dif"), i;
       for (i=0; i < rads.length; i++)
              if (rads[i].checked)
                      config.diff = rads[i].value;

    config.colls = parseInt(config.colls);
    config.diff  = parseInt(config.diff);


    config.reload();
});
