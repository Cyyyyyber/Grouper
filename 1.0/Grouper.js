// console.log('test')
chrome.tabs.onCreated.addListener(
    function (tab) {
        newTab=tab
        // console.log(newTab)
        chrome.tabs.get(newTab.openerTabId, function (tab) {
            openerTab=tab
            // console.log(openerTab)
            var google = /(.*\.google.*\/search.*)|(.*\.baidu.*\/s.*)/ //google搜索正则表达式
            if (openerTab.url.search(google) != -1) { //url匹配成功
                if (openerTab.groupId!=-1) { //如果父标签属于某个组
                    chrome.tabs.group({groupId : openerTab.groupId, tabIds : newTab.id}) //把新标签插入该组
                }
                else {
                    chrome.tabs.group({tabIds : [openerTab.id, newTab.id]}) //新建一个组
                }
            }
        })

    }
)