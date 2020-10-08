window.onload = function() {
    document.getElementById("save_btn").onclick = saveTabs
    document.getElementById("load_btn").onclick = loadTabs
}


function saveTabs() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        chrome.storage.sync.set({"ethertabs": tabs}, function() {
            console.log("saved")
        })
    })
}

function loadTabs() {
    console.log("open")
    chrome.storage.sync.get("ethertabs", function(tabs) {
        console.log("loaded")
        console.log(tabs)
        tabs["ethertabs"].forEach(function(tab) {
            console.log(tab.url)
            chrome.tabs.create({url: tab.url})
        })
    })
}