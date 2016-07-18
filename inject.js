var global = this;
var protocol = location.protocol;
protocol = /^https?/.test(protocol) ? protocol : 'http';

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === "inject") {
        if (global.jqLoaded) {
            console.log('jQuery already injected!');
            chrome.runtime.sendMessage(null, {
                type: 'injected',
                tabId: message.tabId
            });
            return;
        }

        console.log('jQuery injection begins!');
        var sc = document.createElement('script');
        sc.src = protocol + '//apps.bdimg.com/libs/jquery/1.9.1/jquery.js';
        document.body.appendChild(sc);

        sc.onload = function() {
            chrome.runtime.sendMessage(null, {
                type: 'injected',
                tabId: message.tabId
            });
            console.log('jQuery injection done!');
            global.jqLoaded = true;
        };
    }
});
