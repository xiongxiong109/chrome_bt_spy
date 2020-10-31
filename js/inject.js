let domStr = '';

document.addEventListener('DOMContentLoaded', () => {
    // 获取服务端DOM渲染的magnet
    domStr = document.body.innerHTML;
})

// 监听插件发来的请求
chrome.runtime.onMessage.addListener((req) => {
    if (req.getMag) {
        getDOMMagnet();
    }
})

function getDOMMagnet() {
    let matched = domStr.match(/magnet\:\?(\w|=|:)+/g)
    if (matched && matched.length) {
        // 数组去重
        matched = [...new Set(matched)]
        // 传递给插件信息
        chrome.runtime.sendMessage({
            magnet: matched
        })
    } else {
        chrome.runtime.sendMessage({
            magnet: []
        })
    }
}