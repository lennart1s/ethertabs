var tab_list
var currentlySyncedTabs

var toID
var toID2
var reloaded = false

window.onload = function() {
    /*document.getElementById("save_btn").onclick = function() {
        console.log("clicked")
        
        getTabs(function(tabs) {            
            saveTabsToSync(tabs)
            setTabList(tabs)
        })
    }*/
    document.getElementById("save_btn").addEventListener('mousedown', function(event) {
        console.log("mouseodnw")
        toID2 = setTimeout(function() {
            document.getElementById("save_btn").classList.add("loading")
        }, 500)
        
        toID = setTimeout(function() {
            reloaded = true;
            console.log("timeout")
            document.getElementById("save_btn").classList.remove("loading")
            loadPrevTabsFromSync(function(tabs) {
                saveTabsToSync(tabs)
                setTabList(tabs)
            })
        }, 1500)

    })
    document.getElementById("save_btn").addEventListener('mouseup', function() {
        console.log("stop")
        clearTimeout(toID)
        clearTimeout(toID2)
        document.getElementById("save_btn").classList.remove("loading")
        if (!reloaded) {
        getTabs(function(tabs) {            
            saveTabsToSync(tabs)
            setTabList(tabs)
        })}
        reloaded = false
    })
    document.getElementById("save_btn").addEventListener('mouseleave', function() {
        console.log("stop")
        clearTimeout(toID)
        clearTimeout(toID2)
        document.getElementById("save_btn").classList.remove("loading")
    })
    

    document.getElementById("load_btn").onclick = function() {
        loadTabsFromSync(openTabs)
    }

    tab_list = document.getElementById("tab-list")
    
    loadTabsFromSync(function(tabs) {
        currentlySyncedTabs = tabs
        setTabList(currentlySyncedTabs)
    })

}

function setTabList(tabs) {
    tab_list.innerHTML = ""
    
    tabs.forEach(function(tab) {
        div = createLinkDiv(tab.url)
        tab_list.appendChild(div)
    })

    if (tabs.length == 0) {
        tab_list.innerHTML = "-"
    }
}

function loadTabsFromSync(callback) {
    chrome.storage.sync.get("ethertabs", function(tabs) {
        callback(tabs["ethertabs"])
    })
}

function loadPrevTabsFromSync(callback) {
    chrome.storage.sync.get("ethertabs_previous", function(tabs) {
        callback(tabs["ethertabs_previous"])
    })
}

function openTabs(tabs) {
    tabs.forEach(function(tab) {
        chrome.tabs.create({url: tab.url})
    })
}

function saveTabsToSync(tabs) {
    chrome.storage.sync.set({"ethertabs_previous": currentlySyncedTabs}, null)

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