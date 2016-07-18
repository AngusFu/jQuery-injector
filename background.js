
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({ active:true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'inject',
            tabId: tabs[0].id
        });
    });
});

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === 'injected') {
        chrome.browserAction.setIcon({
            path: './img/jquery.png',
            tabId: message.tabId
        });
    }
});
