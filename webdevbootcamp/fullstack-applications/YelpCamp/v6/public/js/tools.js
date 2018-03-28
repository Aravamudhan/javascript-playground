// ================= AJAX tools start =======================
function getRequest(url, success, failure) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3) {
            if (xhr.status == 200)
                success(xhr.responseText);
            if (xhr.status >= 400)
                failure(xhr.responseText);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

function postRequest(url, data, success, failure) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3) {
            if (xhr.status == 200)
                success(xhr.responseText);
            if (xhr.status >= 400)
                failure(xhr.responseText);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}

function putRequest(url, data, success, failure) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('PUT', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3) {
            if (xhr.status == 200)
                success(xhr.responseText);
            if (xhr.status >= 400)
                failure(xhr.responseText);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}

function deleteRequest(url, data, success, failure) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('DELETE', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3) {
            if (xhr.status == 200)
                success(xhr.responseText);
            if (xhr.status >= 400)
                failure(xhr.responseText);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}
// ================= AJAX tools end =======================
// ================Utilities for attaching events to elements now and in future============
function addEvent(el, type, handler) {
    el.addEventListener(type, handler);
}
// live binding helper
// This attaches an event to an element that is present now and will be present in the future by class
function liveByClass(selector, event, callback, context) {
    addEvent(document, event, function (e) {
        var found, el = e.target || e.srcElement;
        while (el && !(found = (el.classList.contains(selector)))) {
            el = el.parentElement
        };
        if (found) callback.call(el, e);
    });
}
// ===============Utilities end===============