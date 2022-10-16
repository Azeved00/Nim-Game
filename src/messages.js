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

