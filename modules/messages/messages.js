//adds an error to the message prompt
function AddError(v){
    var wrapper = createElem('p');
    wrapper.style.color = "red";
    wrapper.innerHTML = v;
   
    var msgs = getById('Messages');
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
    
}

// adds message to message prompt
function writeMessage(v){
    var wrapper = createElem('p');
    wrapper.innerHTML = v;
   
    var msgs = getById('Messages');
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
    
}

function showMessages() {
    var msgs = getById('MessagesWrapper');
    var btn = getById('messageBtn');
    if(msgs.style.display!=='initial'){
        msgs.style.display = 'initial';
        btn.innerHTML='Hide Messages';
    }
    else{
        btn.innerHTML='Show Messages';
        msgs.style.display = '';
    }
}

