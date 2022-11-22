var Messages = (function () {
    let wrapper = Utils.getById('MessagesWrapper');
    let display = Utils.getById('Messages');    

    //adds an error to the message prompt
    return {
        error:(v)=>{
            var wrapper = Utils.createElem('p');
            wrapper.style.color = "red";
            wrapper.innerHTML = v;
           
            display.appendChild(wrapper);
            display.scrollTop = msgs.scrollHeight;
        },

        // adds message to message prompt
        add:(v)=>{
            var wrapper = Utils.createElem('p');
            wrapper.innerHTML = v;
           
            display.appendChild(wrapper);
            display.scrollTop = msgs.scrollHeight;
        },

        toggleDisplay: () => {
            var btn = Utils.getById('messageBtn');
            if(wrapper.style.display!=='initial'){
                wrapper.style.display = 'initial';
                btn.innerHTML='Hide Messages';
            }
            else{
                btn.innerHTML='Show Messages';
                wrapper.style.display = '';
            }
        }
    }
})();

Utils.getById('messageInput').addEventListener("keypress", (e) =>{
    if (e.key === 'Enter') {
        //debugger;
        Messages.add(e.target.value);
        e.target.value = "";
    }
});
