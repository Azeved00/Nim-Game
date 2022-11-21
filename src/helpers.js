class Utils {
    static  isNOE (a) {
        return !a;
    };

    static  getById(id){
        return document.getElementById(id);
    };

    static  createElem(tag){
        return document.createElement(tag);
    };
    
    static  createElemT(tag,text){
        let t = document.createElement(tag);
        t.innerHTML=text;
        return t;
    };

    static  isInt(id) {
        return typeof(id) === 'number' &&
                isFinite(id) &&
                Math.round(id) === id;
    };

    static  triggerEvent(el, type) {
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
    };
}


