var Modals = (function () {
    let shadow = Utils.getById("ModalShadow");
    function check (m, callback) {
        if(m.style.display !== 'flex'){
            shadow.style.display="initial";
            shadow.onclick = callback;
            m.style.display = 'flex';
        }
        else{
            shadow.style.display="none";
            shadow.style.display = 'none'
            m.style.display = '';
        }
    };

    return { 
        Config  :(() => {
            let m = Utils.getById("Config");
            (()=>{
                m.querySelectorAll(".close-btn")
                .forEach( (btn) => {
                    btn.onclick = () =>{Modals.Config.toggle()};
                })
            })();
            return {
                error:  (t) => {
                    let error = Utils.createElem({tag: "p", text:t, cls:"error"});
                    Utils.getById("configErrors").appendChild(error);
                },
                clearErrors: () => {
                    Utils.getById("configErrors").innerHTML="";
                },
                toggle: () => {
                    check(m,Modals.Config.toggle)
                }
            }
        })(),
        Class   :(()=>{
            let m = Utils.getById("Class");
            let gt = {
                btn : Utils.getById("globalBtn"),
                table: Utils.getById("globalCT"),
                body: Utils.getById("globalCTBody"),
            };
            let lt = {
                btn : Utils.getById("localBtn"),
                table: Utils.getById("localCT"),
                body: Utils.getById("localCTBody"),
            };
            (() => {
                m.querySelectorAll(".close-btn")
                .forEach( (btn) => {
                    btn.onclick = () =>{Modals.Class.toggle()};
                })
                gt.btn.onclick=() => {
                    Modals.Class.changeClass();
                }
                lt.btn.onclick=() => {
                    Modals.Class.changeClass();
                }
            })();
            gt.table.style.display="none";
            return{
                toggle: () => {
                    check(m,Modals.Class.toggle)
                },
                removeGlobal: () =>{
                    gt.body.innerHTML="";
                },
                removeLocal: () =>{
                    lt.body.innerHTML="";
                },
                addLocal: (entries)=>{
                    entries.forEach((entry) => {
                        let row = Utils.createElem({tag:"tr"});
                        row.appendChild(Utils.createElem({
                            tag: "td",
                            text: entry.user,
                        }));
                        row.appendChild(Utils.createElem({
                            tag: "td",
                            text: entry.ai,
                        }))
                        row.appendChild(Utils.createElem({
                            tag: "td",
                            text: entry.games,
                        }))
                        row.appendChild(Utils.createElem({
                            tag: "td",
                            text: entry.vic,
                        }))
                        lt.body.appendChild(row);
                    })
                },
                addGlobal: (entries)=>{
                    entries.forEach((entry) => {
                        let row = Utils.createElem({tag:"tr"});
                        row.appendChild(Utils.createElem({
                            tag: "td",
                            text: entry.nick,
                        }));
                        row.appendChild(Utils.createElem({
                            tag: "td",
                            text: entry.games,
                        }))
                        row.appendChild(Utils.createElem({
                            tag: "td",
                            text: entry.victories,
                        }))
                        gt.body.appendChild(row);
                    })
                },
                changeClass: () => {
                    if(gt.btn.className=="active"){
                        gt.btn.className="nactive";
                        lt.btn.className="active";
                        gt.table.style.display="none";
                        lt.table.style.display="table";    
                    }else{
                        const HttpRequest = new XMLHttpRequest();
                        HttpRequest.open("POST",url+"ranking");
                        HttpRequest.onreadystatechange=()=>{
                            if(HttpRequest.readyState!=4)
                                return;
                
                            if(HttpRequest.status ==200){
                                Modals.Class.removeGlobal();
                                Modals.Class.addGlobal(JSON.parse(HttpRequest.response).ranking);
                            }
                            else{
                                Modals.Msgs.edit({
                                    title:"Ranking Error",
                                    message:"There was an error with the request of rank",
                                    buttons:[
                                        {
                                            text: "Ok",
                                            callback: Modals.Msgs.toggle,
                                        }
                                    ]
                                })
                            }
                        }
                        HttpRequest.send(JSON.stringify({
                            "group":group,
                            "size":6,
                        })); 
                        gt.btn.className="active";
                        lt.btn.className="nactive";
                        gt.table.style.display="table";
                        lt.table.style.display="none";
                    }
                },

            }
        })(),
        Rules   :(()=>{
            let m = Utils.getById("Rules");
            (() => {
                m.querySelectorAll(".close-btn")
                .forEach( (btn) => {
                    btn.onclick = () =>{Modals.Rules.toggle()};
                })
            })()
            return  {
                toggle: () => {
                    check(m,Modals.Rules.toggle)
                }
            }
        })(),
        Msgs    : (function () {
            let m = Utils.getById("Info");
            return {
                toggle: () => {check(m,Modals.Msgs.toggle)},
                edit: (input) =>{
                    let opt = Utils.setDefaults(input,{
                        title: "Information",
                        message:"Some Information",
                        buttons:[]
                    });
                    m.innerHTML="";


                    //prepare Header
                    let header = Utils.createElem({cls:"modal-header"});
                    header.appendChild(Utils.createElem({
                        tag:"h2",
                        text: opt.title,
                    }));
                    let closeBtn = Utils.createElem({tag:"button",text:"X",cls:"close-btn"});
                    closeBtn.onclick = Modals.Msgs.toggle;
                    header.appendChild(closeBtn);

                    m.appendChild(header);
                    
                    //Prepare Body
                    let body = Utils.createElem({text:opt.message, cls:"modal-body"});
                    m.appendChild(body)

                    //Prepar footer
                    let footer = Utils.createElem({cls:"modal-footer"});
                    opt.buttons.forEach(elem => {
                        let btn = Utils.setDefaults(elem,{
                            callback: () => console.log("Clicked!"),
                            text: "Button",
                            cls:"",
                        })

                        let b = Utils.createElem({
                            tag:"button",
                            text:btn.text
                        });
                        
                        b.addEventListener("click",btn.callback);
                        footer.appendChild(b);
                    })
                    m.appendChild(footer);   
                }

            }
        })()
    }
})();

