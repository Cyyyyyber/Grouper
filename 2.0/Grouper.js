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
            var re = /(.*\.google.*\/search.*)|(.*\.baidu.*\/s.*)/ //正则表达式
            if ((url=openerTab.url.match(re)) != null) { //url匹配成功
                if (openerTab.groupId!=-1) { //如果父标签属于某个组
                    // chrome.tabs.group({groupId : openerTab.groupId, tabIds : newTab.id}) //把新标签插入该组
                }
                else {
                    chrome.tabs.group({tabIds : [openerTab.id, newTab.id]},function(groupId){
                        console.log(/.*baidu.*/.test(url[0]))
                        if(/.*google.*/.test(url[0]))
                            chrome.tabGroups.update(groupId,{title:openerTab.title,color:colorGoogle}) //更新组名和颜色
                        else if(/.*baidu.*/.test(url[0]))
                            chrome.tabGroups.update(groupId,{title:openerTab.title,color:colorBaidu}) //更新组名和颜色
                    }) //新建一个组
                }
            }
        })

    }
)