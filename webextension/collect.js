document.addEventListener('DOMContentLoaded', function () {
    
    var checkPageButton = document.getElementById('getCookie');
    
    checkPageButton.addEventListener('click', async function () {
        
        let content = document.getElementsByClassName("airdrop");
        
        content.innerHTML = " Replaced!!!"
        var div = document.createElement('div'); 
            div.innerHTML = '<b>Hi!</b>';
            document.body.appendChild(div);
        let result = await chrome.cookies.getAllCookieStores()

        console.log(result)
        console.log(result[0].id)
        console.log(result[0].tabIds)

        const tabs = result[0].tabIds; 
        let cookies = await chrome.cookies.getAll({storeId:tabs[0][0]})

        let getList = document.getElementById('display_list')
        getList.innerHTML += "updated with length" +  cookies.length
        let currentTab = await chrome.tabs.getCurrentTab();
        console.log(currentTab)
    })
})