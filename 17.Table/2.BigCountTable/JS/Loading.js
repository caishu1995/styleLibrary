///名称：loading
///说明：这里面包括显示隐藏加载页面等与加载页内容相关的函数,暂时没用到
///时间：2017-9-11~2017-09-16

///显示loading
function showLoading() {
    ///over
    //如果存在原数据，删除原数据
    var overDiv = document.getElementById("over");
    if (overDiv != null)
        document.getElementById("weaper").removeChild(overDiv);
    //创建元素
    var overEle = document.createElement("div");
    overEle.id = "over";


    ///layout
    //如果存在原数据，删除原数据
    var layoutDiv = document.getElementById("layout");
    if (layoutDiv != null)
        document.getElementById("weaper").removeChild(layoutDiv);
    //创建元素
    var layoutEle = document.createElement("div");
    layoutEle.id = "layout";
    //创建子元素
    var imgEle = document.createElement("img");
    imgEle.src = "http://files.jb51.net/file_images/article/201311/2013112931.gif";
    layoutEle.appendChild(imgEle);


    document.getElementById("weaper").appendChild(overEle);
    document.getElementById("weaper").appendChild(layoutEle);
    document.getElementById("searchButton").disabled = true;//禁用查询
}
///隐藏loading
function hideLoading() {
    //移除over
    var overDiv = document.getElementById("over");
    if (overDiv != null)
        document.getElementById("weaper").removeChild(overDiv);

    //移除layout
    var layoutDiv = document.getElementById("layout");
    if (layoutDiv != null)
        document.getElementById("weaper").removeChild(layoutDiv);

    document.getElementById("searchButton").disabled = false;//不禁用按钮
}

///显示无数据
function showNonSource() {
    ///删除数据
    //删除表头内容
    var theadUIDiv = document.getElementById("tHeadUl");
    if (theadUIDiv != null)
        document.getElementById("theadDiv").removeChild(theadUIDiv);
    //删除表内容
    var tbodyUIDiv = document.getElementById("tbodyContentDiv");
    if (tbodyUIDiv != null)
        document.getElementById("tbodyDiv").removeChild(tbodyUIDiv);
    //删除纵向滚动条内容
    var scrollDiv = document.getElementById("scrollBarRowDiv");
    if (scrollDiv != null)
        document.getElementById("tbodyDiv").removeChild(scrollDiv);
    //删除表尾内容
    var tfootUIDiv = document.getElementById("tfootDiv").getElementsByTagName("ul")[0];
    if (tfootUIDiv != null)
        document.getElementById("tfootDiv").removeChild(tfootUIDiv);
    //删除原数据
    var noneDiv = document.getElementById("noneDiv");
    if (noneDiv != null)
        document.getElementById("weaper").removeChild(noneDiv);


    //追加元素
    var nonEle = document.createElement("div");
    nonEle.id = "noneDiv";
    var content = document.createElement("p");
    content.innerText = "没有数据！";
    nonEle.appendChild(content);
    document.getElementById("weaper").appendChild(nonEle);
    nonEle.parentNode.style.padding = "0px";
}
///隐藏无数据
function hideNonSource() {
    var noneDiv = document.getElementById("noneDiv");
    if (noneDiv != null)
        document.getElementById("weaper").removeChild(noneDiv);
}