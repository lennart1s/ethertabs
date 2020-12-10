var tab_list
var save_btn
var load_btn

window.onload = function() {
    tab_list = document.getElementById("tab_list")
    save_btn = document.getElementById("save_btn")
    load_btn = document.getElementById("load_btn")

    save_btn.addEventListener("mousedown", function(event) {saveBtnMousedown(event)})
    save_btn.addEventListener("mouseup", function(event) {saveBtnMouseup(event)})
    save_btn.addEventListener("mouseleave", function(event) {saveBtnMouseleave(event)})
    load_btn.onclick = loadBtnOnclick

    loadTabsFromSync(function(tabs) {
        currentlySyncedTabs = tabs
        setTabList(currentlySyncedTabs)
    })
}