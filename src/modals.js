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
            (() => {
                m.querySelectorAll(".close-btn")
                .forEach( (btn) => {
                    btn.onclick = () =>{Modals.Class.toggle()};
                })
            })()
            return{
                toggle: () => {
                    check(m,Modals.Class.toggle)
                }
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
