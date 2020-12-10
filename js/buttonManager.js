var startAnimationTO
var undoSaveTO
var didUndo = false

function saveBtnMousedown(event) {
    startAnimationTO = setTimeout(function() {
        save_btn.classList.add("loading")
    }, 500)

    undoSaveTO = setTimeout(function() {
        didUndo = true
        save_btn.classList.remove("loading")
        loadPrevTabsFromSync(function(tabs) {
            saveTabsToSync(tabs)
            setTabList(tabs)
        })
    }, 1500)
}

function saveBtnMouseup(event) {
    saveBtnMouseleave(event)
    if (!didUndo) {
        getTabs(function(tabs) {
            saveTabsToSync(tabs)
            setTabList(tabs)
        })
    }

    didUndo = false
}

function saveBtnMouseleave(event) {
    clearTimeout(startAnimationTO)
    clearTimeout(undoSaveTO)
    document.getElementById("save_btn").classList.remove("loading")
}

function loadBtnOnclick() {
    loadTabsFromSync(openTabs)
}