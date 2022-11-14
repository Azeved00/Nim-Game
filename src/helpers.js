
export function isNOE (a) {
    return !a;
}

export function getById(id){
    return document.getElementById(id);
}
export function createElem(tag,text=""){
    let t = document.createElement(tag);
    t.innerHTML=text;
    return t;
}

export function isInt(id) {
    return typeof(id) === 'number' &&
            isFinite(id) &&
            Math.round(id) === id;
}

export function triggerEvent(el, type) {
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
}

