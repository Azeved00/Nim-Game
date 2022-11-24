/*class Modal {
    static toggle(elemId, message=""){
        var e = Utils.getById(elemId);
        if(e.style.display !== 'flex'){
            var shadow= Utils.createElem("div");
            shadow.id="ModalShadow";
            shadow.addEventListener("click",() => {
                if(elemId == "FinishMessage"){
                  closeBtn();
                }
                else {
                  modal(elemId);
                }
            })
            document.querySelector("body").appendChild(shadow);
            e.style.display = 'flex';
        }
        else{
            var s = Utils.getById("ModalShadow");
            s.remove();
            s.style.display = 'none'
            e.style.display = '';
        }


        if(elemId === "FinishMessage")
           Utils.getById("FinishMessageBody").innerHTML=message;
        if(elemId === "StandardMessage")
           Utils.getById("StandardMessageBody").innerHTML=message;
    }
}*/

var Modals = (function () {
    var shadow = Utils.getById("ModalShadow");
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
        Config  :{
            error:  (t) => {
                let error = Utils.createElem("p",t);
                error.className="error";
                Utils.getById("errorText").appendChild(error)
            },
            clearErrors: () => {
                Utils.getById("errorText").innerHTML="";
            },
            toggle: () => {check(Utils.getById("Config"),Modals.Config.toggle)}
        },
        Class   :{
            toggle: () => {check(Utils.getById("Class"),Modals.Class.toggle)}
        },
        Rules   :{
            toggle: () => {check(Utils.getById("Rules"),Modals.Rules.toggle)}
        },
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
