

function messageHandler(v) {
    var wrapper = document.createElement('p');
    wrapper.innerHTML = v;
   
    var msgs = getById('Messages');
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}
