class Messages {
    static wrapper = Utils.getById('MessagesWrapper');
    static display = Utils.getById('Messages');    

    //adds an error to the message prompt
    static error(v){
        var wrapper = Utils.createElem('p');
        wrapper.style.color = "red";
        wrapper.innerHTML = v;
       
        this.display.appendChild(wrapper);
        this.display.scrollTop = msgs.scrollHeight;
    }

    // adds message to message prompt
    static add(v){
        var wrapper = Utils.createElem('p');
        wrapper.innerHTML = v;
       
        this.display.appendChild(wrapper);
        this.display.scrollTop = msgs.scrollHeight;
    }

    static toggleDisplay() {
        var btn = Utils.getById('messageBtn');
        if(this.wrapper.style.display!=='initial'){
            this.wrapper.style.display = 'initial';
            btn.innerHTML='Hide Messages';
        }
        else{
            btn.innerHTML='Show Messages';
            this.wrapper.style.display = '';
        }
    }
}

Utils.getById('messageInput').addEventListener("keypress", (e) =>{
    if (e.key === 'Enter') {
        //debugger;
        Messages.add(e.target.value);
        e.target.value = "";
    }
});
