var currentlySyncedTabs

function loadTabsFromSync(callback) {
    chrome.storage.sync.get("ethertabs", function(tabs) {
        callback(tabs["ethertabs"]["tabs"])
    })
}

function loadPrevTabsFromSync(callback) {
    chrome.storage.sync.get("ethertabs", function(tabs) {
        callback(tabs["ethertabs"]["previous_tabs"])
    })
}

function saveTabsToSync(tabs) {
    chrome.storage.sync.set({"ethertabs": {
        "tabs": tabs,
        "previous_tabs": currentlySyncedTabs
    }}, null)

    currentlySyncedTabs = tabs;
}

function getTabs(callback) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        callback(tabs)
    })
}

function openTabs(tabs) {
    tabs.forEach(function(tab) {
        chrome.tabs.create({url: tab.url})
    })
}