var linkList

window.onload = function() {
    document.getElementById("save_btn").onclick = saveTabs
    document.getElementById("load_btn").onclick = loadTabs

    linkList = document.getElementById("link-list")

    //loadLinkList()
}

function loadLinkList() {
    //for (i = 0; linkList.childNodes.length; i++) {
    //    linkList.removeChild(linkList.childNodes[i])
    //}
    
    chrome.storage.sync.get("ethertabs", function(tabs) {
        tabs["ethertabs"].forEach(function(tab) {
            link = createURLParagraph(tab.url)

            remBtn = createRemButton(link)

            div = document.createElement("div")
            div.appendChild(link)
            div.appendChild(remBtn)

            linkList.appendChild(div)
        })
    })
}


function saveTabs() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        chrome.storage.sync.set({"ethertabs": tabs}, function() {
        })
    })

    loadLinkList()
}

function loadTabs() {
    console.log("open")
    chrome.storage.sync.get("ethertabs", function(tabs) {
        tabs["ethertabs"].forEach(function(tab) {
            chrome.tabs.create({url: tab.url})
        })
    })
}

function removeURL(urlElem) {
    console.log("remove:")
    console.log(urlElem.title)

    chrome.storage.sync.get("ethertabs", function(tabs) {
        for (i = 0; i < tabs["ethertabs"].length; i++) {
            if (tabs["ethertabs"][i].url == urlElem.title) {
                tabs["ethertabs"].splice(i, 1)
                break
            }
        }
        chrome.storage.sync.set({"ethertabs": tabs["ethertabs"]}, function() {})
    })

    // TODO: maybe add animation
    urlElem.parentElement.style.display = "none"
}

function createRemButton(urlElem) {
    remBtn = document.createElement("button")
    remBtn.innerHTML = "x"
    remBtn.onclick = function(){removeURL(urlElem)}

    return remBtn
}

function createURLParagraph(url) {
    paragraph = document.createElement("p")

    paragraph.onclick = function(){window.open(url)}
    paragraph.title = url
    paragraph.target = "_blank"

    parts = url.split('://', 2)[1]
    parts = url.split("/")
    paragraph.innerHTML = '<font style="font-weight:500">'+parts[0]+'</font>/'
    for (i = 1; i < parts.length; i++) {
        paragraph.innerHTML += parts[i]
    }

    return paragraph
}