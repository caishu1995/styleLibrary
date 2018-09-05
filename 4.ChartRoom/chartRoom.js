///登入按钮点击事件
function logInOnClickFunction(thisEle) {
    var input = thisEle.parentNode.children[3];
    var label = thisEle.parentNode.children[0];
    label.innerText = input.value;
    
    thisEle.parentNode.classList.remove("notLoggedIn");
    thisEle.parentNode.classList.add("logIn");

    initBaseMenu(input.value, thisEle.parentNode.parentNode);
}
///登出按钮点击事件
function logOutOnClickFunction(thisEle) {
    thisEle.parentNode.children[3].value = "";
    thisEle.parentNode.children[0].innerText = "请先登录";
    thisEle.parentNode.classList.remove("logIn");
    thisEle.parentNode.classList.add("notLoggedIn");
}
///发送消息点击事件
function sendOnClickFunction(thisEle) {
    createNewInformation(thisEle.parentNode.parentNode.children[1]);
}

///初始化联系人列表
///name     ：登录名
///baseDiv  ：基础div
function initBaseMenu(name, baseDiv) {
    var list = ["技术讨论组", "bb", "cc", "dd", "ee", "bb", "cc", "dd", "ee", "bb", "cc", "dd", "ee"];
    var ul = document.createElement("ul");
    for(var i = 0; i < list.length; i++){
        var li = document.createElement("li");
        li.onclick = function(){
            //移除之前内容
            var list = this.parentNode.getElementsByClassName("selectGroup");
            while(list.length){
                list[0].classList.remove("selectGroup");
            }

            this.className = "selectGroup"; //追加当前的
            initDetailMenu(name, this.innerText, baseDiv);//初始化成员列表
            initChartPart(name, this.innerText, baseDiv);//初始化聊天区
        };

        li.innerText = list[i];
        ul.appendChild(li);
    }
    baseDiv.children[1].children[0].appendChild(ul);
    ul.children[0].click();
}
///初始化成员列表
///name     ：登录名
///groupName：联系人列表
///baseDiv  ：基础div
function initDetailMenu(name, groupName, baseDiv){
    //获得数据
    var detailList;
    if(groupName == "bb") detailList = ["qq", "ww", "ee"];
    else detailList = ["zz", "xx", "cc", "zz", "xx", "cc", "zz", "xx", "cc"];

    //移除原来的ul
    var list = baseDiv.children[1].children[1].getElementsByTagName("ul");
    while(list.length){
        list[0].parentNode.removeChild(list[0]);
    }

    //创建内容并追加
    var ul = document.createElement("ul");
    for(var i = 0; i < detailList.length; i++){
        var li = document.createElement("li");
        li.innerHTML = "<li>" + detailList[i] + "</li>";
        ul.appendChild(li);
    }
    baseDiv.children[1].children[1].appendChild(ul);
}
///初始化聊天室
function initChartPart(name, groupName, baseDiv) {
    var createInformation = "aa 创建于 2018-01-10";

    //改标题
    var titleDiv = baseDiv.children[2].children[0];
    titleDiv.innerHTML = "<label class=\"titleLabel\">" + groupName + "</label><label class=\"detailLabel\">" + createInformation + "</label>";

    //删除原内容
    var content = baseDiv.children[2].getElementsByClassName("contentPart")[0].children;
    while(content.length)
        content[0].parentNode.removeChild(content[0]);

    //改具体内容
    createNewInformation(baseDiv.children[2].children[1]);
    baseDiv.children[2].children[1].scrollTop = baseDiv.scrollHeight;
}

///添加消息
function createNewInformation(baseDiv) {
    var sayInformation = [
        {"state": 0, "content": "aa进入聊天室"},
        {"state": 1, "isMy": false, "title": "aa 2018/1/8 18:00:35", "content": "sdfsdfdddddd dddd dddd ddd dddd dddd dddd ddddd dddddd dddd dddd dddddd ddddddd dddsdf"},
        {"state": 1, "isMy": true , "title": "bb 2018/1/8 18:00:35", "content": "aa"},
        {"state": 1, "isMy": false, "title": "aa 2018/1/8 18:00:35", "content": "bb"},
        {"state": 1, "isMy": false, "title": "aa 2018/1/8 18:00:35", "content": "cc"}];

    for(var i = 0; i < sayInformation.length; i++){
        //如果是状态，呈现状态
        if(sayInformation[i].state == 0){
            baseDiv.innerHTML += "<span class=\"stateRow\"><label>" + sayInformation[i].content + "</label></span>";
        } else {
            //如果是我的，则改变内容
            if(sayInformation[i].isMy)
                baseDiv.innerHTML += "<span class=\"sayRow mySay\"><label class=\"informationLabel\">" + sayInformation[i].title + "</label><label class=\"contentLabel\">" + sayInformation[i].content + "</label></span>";
            else
                baseDiv.innerHTML += "<span class=\"sayRow\"><label class=\"informationLabel\">" + sayInformation[i].title + "</label><label class=\"contentLabel\">" + sayInformation[i].content + "</label></span>";
        }
    }
}