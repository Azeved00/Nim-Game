var Utils = {
    isNOE: (a) => {
        return !a;
    },

    getById:(id)=>{
        return document.getElementById(id);
    },
    
    createElem:(tag,text="")=>{
        let t = document.createElement(tag);
        t.innerHTML=text;
        return t;
    },

    isInt:(id) =>{
        return typeof(id) === 'number' &&
                isFinite(id) &&
                Math.round(id) === id;
    },

    triggerEvent:(el, type) =>{
        // IE9+ and other modern browsers
        if ('createEvent' in document) {
            var e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            // IE8
            var e = document.createEventObject();
            e.eventType = type;
            el.fireEvent('on' + e.eventType, e);
        }
    },

    Body: document.querySelector("body")

}


