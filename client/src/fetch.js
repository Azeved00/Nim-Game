//const url = "http://twserver.alunos.dcc.fc.up.pt:8008/";
const url = "http://localhost:8004/"

async function makeRequest (input){
    const group = 4;
    
    var opt = Utils.setDefaults(input,{
        method: "POST",
        errorModal: true,
        body:{},
        debug:false,
        group:false,
        okCallback: () => {},
        badCallback: () => {}
    });
    if(Utils.isNOE(opt.command)) throw "missing command";
    if(opt.group)opt.body.group = group;
    const response =await fetch(url + opt.command,{
        method: opt.method,
        body: JSON.stringify(opt.body)
    });
    
    const body = await response.json();
    if(opt.debug){
        console.log(response); 
        console.log(body); 
    } 

    if(response.status == 200){
        opt.okCallback(body);
    }
    else{
        opt.badCallback(body);
        if(opt.errorModal){
            Modals.Msgs.edit({
                title:"Error",
                message:body.error,
                buttons:[
                    {
                        text: "Ok",
                        callback: Modals.Msgs.toggle,
                    }
                ]
            })
            Modals.Msgs.toggle();
        }
    }
}

           

