var Utils = {
    isNOE: (a) => {
        return !a;
    },

    getById:(id)=>{
        return document.getElementById(id);
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

    setDefaults: (obj,def) => {
        return Object.assign({},def,obj);
    },

    createElem:(input)=>{
        let opt = Utils.setDefaults(input,{
            tag:"div",
            text:"",
            cls:"",
        })

        let t = document.createElement(opt.tag);
        t.innerHTML=opt.text;
        t.className=opt.cls;
        return t;
    },

    Body: document.querySelector("body")

}


