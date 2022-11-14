
function changeConfigBtn(){
    let form = Utils.getById("configForm");

    if(parseInt(Utils.getById("size").value)<1){
        var errors = Utils.getById("errorText");
        errors.innerHTML ="";
        errors.appendChild(createElemT("p","Invalid Collumn Number"));
        return;
    }

    //modal("Config");
    //config.colls = getById("size").value;
    //config.start = getById("first").checked;
    //config.ai    = getById("bot").checked;

    let rads = document.getElementsByName("dif"), i;
       for (i=0; i < rads.length; i++)
              if (rads[i].checked)
                      config.diff = rads[i].value;

    //config.colls = parseInt(config.colls);
    //config.diff  = parseInt(config.diff);


    //config.reload();
}

