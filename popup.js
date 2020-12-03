var tabList
var currentlySyncedTabs

window.onload = function() {
    document.getElementById("save_btn").onclick = function() {
        getTabs(function(tabs) {
            saveTabsToSync(tabs)
            setTabList(tabs)
            console.log(currentlySyncedTabs)
        })
    }
    document.getElementById("load_btn").onclick = function() {
        loadTabsFromSync(openTabs)
    }

    tabList = document.getElementById("tab-list")
    
    loadTabsFromSync(function(tabs) {
        currentlySyncedTabs = tabs
        setTabList(currentlySyncedTabs)
    })

}

function setTabList(tabs) {
    tabList.innerHTML = ""
    
    tabs.forEach(function(tab) {
        div = createLinkDiv(tab.url)
        tabList.appendChild(div)
    })

    if (tabs.length == 0) {
        tabList.innerHTML = "-"
    }
}

function loadTabsFromSync(callback) {
    chrome.storage.sync.get("ethertabs", function(tabs) {
        callback(tabs["ethertabs"])
    })
}

function openTabs(tabs) {
    tabs.forEach(function(tab) {
        chrome.tabs.create({url: tab.url})
    })
}

function saveTabsToSync(tabs) {
    currentlySyncedTabs = tabs
    chrome.storage.sync.set({"ethertabs": tabs}, null)
}

function getTabs(callback) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        callback(tabs)
    })
}

/*function removeDiv(div) {
    //TODO: add animation
    div.style.display = "none"
}*/

function removeURL(url) {
    for (i = 0; i < currentlySyncedTabs.length; i++) {
        if (currentlySyncedTabs[i].url == url) {
            currentlySyncedTabs.splice(i, 1)
            break
        }
    }

    saveTabsToSync(currentlySyncedTabs)
}

function createLinkDiv(url) {
    var div = document.createElement("div")
    div.setAttribute("name", url)
    
    paragraph = document.createElement("p")
    paragraph.title = url
    paragraph.onclick = function(){window.open(url)}
    paragraph.target = "_blank"
    parts = url.split('://', 2)[1].split("/")
    paragraph.innerHTML = '<font style="font-weight:500">'+parts[0]+'</font>/'
    paragraph.innerHTML += parts.slice(1).join('/')
    
    div.appendChild(paragraph)
    
    remBtn = document.createElement("button")
    remBtn.innerHTML = "x"
    remBtn.onclick = function(){
        //removeDiv(div)
        removeURL(url)
        loadTabsFromSync(function(tabs) {
            currentlySyncedTabs = tabs
            setTabList(currentlySyncedTabs)
        })
    }

    div.appendChild(remBtn)

    return div
}