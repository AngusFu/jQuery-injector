var global = this;
var protocol = location.protocol;
protocol = /^https?/.test(protocol) ? protocol : 'http';

var jQueryURL = '//apps.bdimg.com/libs/jquery/1.9.1/jquery.js',
    cookieURL = '//apps.bdimg.com/libs/jquery.cookie/1.4.1/jquery.cookie.js';

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === "inject") {
        load('jQuery.js', jQueryURL, message, function() {
            load('jquery.cookie.js', cookieURL, message);
        });
    }
});

function load(name, url, message, cb) {
    if (global[`__${name}`]) {
        console.warn(`${name} already injected!`);
        chrome.runtime.sendMessage(null, {
            type: 'injected',
            tabId: message.tabId
        });
        return;
    }

    console.log(`${name} injection begins!`);
    var sc = document.createElement('script');
    sc.src = protocol + url;
    document.body.appendChild(sc);

    sc.onload = function() {
        chrome.runtime.sendMessage(null, {
            type: 'injected',
            tabId: message.tabId
        });
        console.info(`${name} injection done!`);
        global[`__${name}`] = true;

        cb && cb();
    };
}