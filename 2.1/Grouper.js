// console.log('test')
// "grey", "blue", "red", "yellow", "green", "pink", "purple", or "cyan"
colorGoogle="green"
colorBaidu="blue"
chrome.tabs.onCreated.addListener(
    function (tab) {
        newTab=tab
        // console.log(newTab)
        chrome.tabs.get(newTab.openerTabId, function (tab) {
            openerTab=tab
            // console.log(openerTab)
            var re = /(.*www\.google\.com.*\/search.*)|(.*www\.baidu\.com.*\/s.*)/ //正则表达式
            if ((url=openerTab.url.match(re)) != null) { //url匹配成功
                if (openerTab.groupId!=-1) { //如果父标签属于某个组
                    // chrome.tabs.group({groupId : openerTab.groupId, tabIds : newTab.id}) //把新标签插入该组
                }
                else { //新建一个组
                    chrome.tabs.group({tabIds : [openerTab.id, newTab.id]},function(groupId){
                        console.log(/.*baidu.*/.test(url[0]))
                        if(/.*www\.google\.com.*\/search.*/.test(url[0]))
                            chrome.tabGroups.update(groupId,{title:openerTab.title,color:colorGoogle}) //更新组名和颜色
                        else if(/.*www\.baidu\.com.*\/s.*/.test(url[0]))
                            chrome.tabGroups.update(groupId,{title:openerTab.title,color:colorBaidu}) //更新组名和颜色
                    })
                }
            }
        })

    }
)

chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {
        var re = /(.*www\.google\.com.*\/search.*)|(.*www\.baidu\.com.*\/s.*)/ //正则表达式
        if (re.test(changeInfo.url) && tab.groupId != -1)
            chrome.tabs.ungroup(tabId) //将标签从组中移除
    }
)