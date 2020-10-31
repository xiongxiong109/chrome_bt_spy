// 后台程序

// 向inject.js发起呼叫请求
chrome.tabs.getSelected(null, (tab) => {
    chrome.tabs.sendMessage(tab.id, {
        getMag: true
    })
})

const root = document.querySelector('#j_mag')

chrome.runtime.onMessage.addListener((request) => {
    if (request.magnet && request.magnet.length) {
        root.innerHTML = `
        已发现页面中的初始magnet: <br />
        ${request.magnet.map(item => "<a href=" + item + ">" + item + "</a><br />")}
        `
    } else {
        root.innerHTML = "抱歉，暂时没有发现magnet"
    }
})