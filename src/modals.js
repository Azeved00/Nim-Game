class Modal {
    function toggle(elemId, message=""){
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
}
