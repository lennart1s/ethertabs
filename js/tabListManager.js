function setTabList(tabs) {
    tab_list.innerHTML = ""

    tabs.forEach(function(tab) {
        div = createTabDiv(tab.url)
        tab_list.appendChild(div)
    })

    if (tabs.length == 0) {
        tab_list.innerHTML = "-"
    }
}

function createTabDiv(url) {
    var div = document.createElement("div")
    div.setAttribute("name", url)

    p = document.createElement("p")
    p.title = url
    p.onclick = function() {window.open(url)}
    p.target = "_blank"
    parts = url.split("://", 2)[1].split("/")
    p.innerHTML = parts[0]
    p.innerHTML += parts.slice(1).join("/")

    div.appendChild(p)

    button = document.createElement("button")
    button.innerHTML = "X"
    button.onclick  = function() {
        for (i = 0; i < currentlySyncedTabs.length; i++) {
            if (currentlySyncedTabs[i].url == url) {
                currentlySyncedTabs.splice(i, 1)
                break
            }
        }
        saveTabsToSync(currentlySyncedTabs)
        setTabList(currentlySyncedTabs)
    }

    div.appendChild(button)

    return div
}