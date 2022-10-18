function isNOE (a) {
    return !a;
}

function getById(id){
    return document.getElementById(id);
}
function createElem(tag){
    return document.createElement(tag);
}

function isInt(id) {
    return typeof(id) === 'number' &&
            isFinite(id) &&
            Math.round(id) === id;
}

function triggerEvent(el, type) {
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

