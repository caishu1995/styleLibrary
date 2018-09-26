function MyTableClass(tableUserDescribe) {
    ///表格的描述信息
    ///titleList :标题的描述的数组
    ///     titleList.title  : 标题名称
    ///     titleList.columns: 对应的数据的名称
    ///     titleList.type   : 需要展示的类型，详情看changeDataToShow参数说明
    ///     titleList.content: 其他内容
    ///IsHasFooter:是否存在分页
    ///pageSet   :分页设置
    ///     pageSet.pageIndex : 当前是第几页
    ///     pageSet.pageSize  : 每页的数量
    ///     pageSet.allCount  : 总数
    ///     pageSet.pageSelectIndex: 设置分页时触发的函数
    ///id        :对应dom的id号
    ///idFrom    :行id对应的数据来源
    ///dataSource:所有的数据集合
    ///menuList  :右键菜单列表,数组
    ///     menuList.name   : 名称
    ///     menuList.onclick: 点击事件
    ///newRow    :是否存在新行
    this.tableDescribe = tableUserDescribe;

    ///绑定具体数据部分
    this.boundData = function (data) {
        this.tableDescribe.dataSource = data;
    };

    ///改变内容为可展示的内容
    ///data: 原数据
    ///type：类型
    ///     1: yyyy-mm-dd hh:mm:ss -> yyyy-mm-dd
    ///     2: 保留两位小数
    function changeDataToShow(data, type) {
        switch (type) {
            case 1: return data.split(" ")[0];
            case 2:
                var d = parseFloat(data);
                return d.toFixed(2);
        }
    }

    /*-- 表头部分 --*/
    ///创建整个节点、表头元素
    this.baseDraw = function () {
        var baseEle = document.getElementById(this.tableDescribe.id); //基础DOM元素

        ///创建表格
        var tableELe = document.createElement("div");
        tableELe.className = "tableDiv";
        tableELe.boundObj = this;

        var header = createMyTableHeader(this.tableDescribe);//创建头部
        tableELe.appendChild(header);

        baseEle.appendChild(tableELe);
    };
    ///创建表格头部
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableHeader(tableDescribe) {
        var header = document.createElement("div");
        header.className = "gridTitle";

        header.appendChild(createMyTableHeaderLeft(tableDescribe));//左侧区域
        header.appendChild(createMyTableHeaderRight());//右侧区域

        return header;
    }
    ///创建表格头部左侧区域，即表头的列名显示区域
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableHeaderLeft(tableDescribe) {
        var leftHeader = document.createElement("div");
        leftHeader.className = "HeaderLeft";

        //创建行内元素
        var trHeader = document.createElement("ul");
        for (var i = 0; i < tableDescribe.titleList.length; i++) {
            var tdHeader = document.createElement("li");
            tdHeader.innerText = tableDescribe.titleList[i].title;
            trHeader.appendChild(tdHeader);
        }

        leftHeader.appendChild(trHeader);

        return leftHeader;
    }
    ///创建表格头部右侧区域，即表头的滚动条空白区域
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableHeaderRight() {
        var rightHeader = document.createElement("div");//右侧区域，滚动条上侧区域
        rightHeader.className = "HeaderRight";
        return rightHeader;
    }


    /*-- 中间数据部分 --*/
    ///画数据行、尾部
    this.tableDraw = function () {
        var baseEle = document.getElementById(this.tableDescribe.id).getElementsByClassName("tableDiv")[0]; //基础DOM元素

        var content = createMyTableContent(this.tableDescribe);
        baseEle.appendChild(content);//中部

        ///尾部
        if (this.tableDescribe.IsHasFooter) {
            baseEle.appendChild(createMyTableFooter(this.tableDescribe));//如果存在分页，则创建尾部
        } else {
            //如果不存在分页，则扩大中间区域内容
            content.style.height = "calc(100% - 29px)";
        }

        ///右键菜单
        var ulMenu = createMyTableUl(this.tableDescribe);
        if(ulMenu != null)
            baseEle.appendChild(ulMenu);
    };
    ///更改数据
    this.changeData = function() {
        var bodyEle = document.getElementById(this.tableDescribe.id).getElementsByClassName("tableDiv")[0]; //基础DOM元素
        bodyEle.removeChild(bodyEle.children[1]);

        var content = createMyTableContent(this.tableDescribe);
        bodyEle.insertBefore(content, bodyEle.children[1]);//中部

        ///尾部
        if (this.tableDescribe.IsHasFooter) {
            var footLeftEle = document.getElementById(this.tableDescribe.id).getElementsByClassName("gridFootLeft")[0];
            footLeftEle.childNodes[0].childNodes[1].childNodes[0].value = this.tableDescribe.pageSet.pageIndex;

            var footRightEle = document.getElementById(this.tableDescribe.id).getElementsByClassName("gridFootRight")[0];
            var startIndex = (parseInt(this.tableDescribe.pageSet.pageIndex) - 1) * this.tableDescribe.pageSet.pageSize + 1;
            var endIndex = (parseInt(this.tableDescribe.pageSet.pageIndex) * parseInt(this.tableDescribe.pageSet.pageSize)) > this.tableDescribe.pageSet.allCount ? this.tableDescribe.pageSet.allCount : (parseInt(this.tableDescribe.pageSet.pageIndex) * parseInt(this.tableDescribe.pageSet.pageSize));
            footRightEle.children[0].innerText = startIndex;
            footRightEle.children[1].innerText = endIndex;
        }
    };
    ///创建表格中间
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableContent(tableDescribe) {
        var content = document.createElement("div");
        content.className = "gridBody";
        ///追加中间区域横向滚动条事件，使表头表身联动
        content.onscroll = function () {
            this.parentNode.children[0].children[0].scrollLeft = this.scrollLeft;
        };

        for (var i = 0; i < tableDescribe.dataSource.length; i++) {
            ///创建行内元素
            var trContent = document.createElement("ul");
            trContent.className = "showRow";
            //记录主键
            var str = [];
            for (var k = 0; k < tableDescribe.idFrom.length; k++) {
                str.push(tableDescribe.dataSource[i][tableDescribe.idFrom[k]]);
            }
            trContent.setAttribute("data-id", str.join("`"));

            //创建内容列
            for (var j = 0; j < tableDescribe.titleList.length; j++) {
                var tdContent = document.createElement("li");
                if(tableDescribe.titleList[j].columns != undefined){
                    //转换数据
                    var data = tableDescribe.dataSource[i][tableDescribe.titleList[j].columns];
                    if (data == null) data = "";
                    if(tableDescribe.titleList[j].type != undefined) data = changeDataToShow(data, tableDescribe.titleList[j].type);

                    tdContent.innerHTML = '<input class="writeInput" value="' + data + '"/><label>' + data + '</label>';
                    tdContent.title = data;
                } else if(tableDescribe.titleList[j].content != undefined){
                    tdContent.innerHTML = tableDescribe.titleList[j].content;
                }
                trContent.appendChild(tdContent);
            }
            //右键
            if(tableDescribe.menuList != undefined){
                trContent.oncontextmenu = function (event) {
                    var event = event || window.event;
                    var menu = this.parentNode.parentNode.children[3];
                    menu.style.display = "block";
                    menu.style.left = event.clientX + "px";
                    menu.style.top = event.clientY + "px";
                    event.preventDefault();
                };
            }
            content.appendChild(trContent);
        }

        if (tableDescribe.newRow != undefined) {
            ///创建行内元素
            var trContent = document.createElement("ul");
            trContent.className = "newRow";

            var tdContent = document.createElement("li");
            tdContent.innerHTML = "add";
            tdContent.style.width = "calc(100% - 21px)";
            trContent.appendChild(tdContent);

            content.appendChild(trContent);
        }

        return content;
    }
    ///创建表格尾部
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableFooter(tableDescribe) {
        var footer = document.createElement("div");
        footer.className = "gridFoot";


        //左侧内容
        var footerLeft = document.createElement("div");
        footerLeft.className = "gridFootLeft";
        var trFooter = document.createElement("ul");

        var tdFooterPrevious = document.createElement("li");//上一页按钮
        tdFooterPrevious.innerText = "◀";
        tdFooterPrevious.onclick = function () {
            var pageIndex = this.nextElementSibling.childNodes[0].value <= 1 ? 1 : (parseInt(this.nextElementSibling.childNodes[0].value) - 1);
            var thisBoundObj = this.parentNode.parentNode.parentNode.parentNode.boundObj;

            if (thisBoundObj.tableDescribe.pageSet.pageIndex == pageIndex)return;
            else thisBoundObj.tableDescribe.pageSet.pageIndex = pageIndex;

            thisBoundObj.tableDescribe.pageSet.pageSelectIndex(thisBoundObj.tableDescribe);
            thisBoundObj.changeData();
        };
        trFooter.appendChild(tdFooterPrevious);

        var tdFooterInput = document.createElement("li");//输入框
        tdFooterInput.innerHTML = '<input value="' + tableDescribe.pageSet.pageIndex + '">';
        tdFooterInput.onchange = function () {
            var allPage = this.nextElementSibling.children[0].innerText;
            var pageIndex = this.children[0].value;
            pageIndex = pageIndex <= allPage ? pageIndex : allPage;
            pageIndex = pageIndex >= "1" ? pageIndex : 1;
            var thisBoundObj = this.parentNode.parentNode.parentNode.parentNode.boundObj;

            if (thisBoundObj.tableDescribe.pageSet.pageIndex == pageIndex) return;
            else thisBoundObj.tableDescribe.pageSet.pageIndex = pageIndex;

            thisBoundObj.tableDescribe.pageSet.pageSelectIndex(thisBoundObj.tableDescribe);
            thisBoundObj.changeData();
        };
        trFooter.appendChild(tdFooterInput);

        var tdFooterLabel = document.createElement("li");//文字区
        var all = parseInt(tableDescribe.pageSet.allCount);
        var size = parseInt(tableDescribe.pageSet.pageSize);
        var allPage = (all % size) == 0 ? (all / size) : (parseInt(all / size) + 1);
        tdFooterLabel.innerHTML = 'of&nbsp<label>' + allPage + '</label>';
        trFooter.appendChild(tdFooterLabel);

        var tdFooterNext = document.createElement("li");//下一页按
        tdFooterNext.innerText = "▶";
        tdFooterNext.onclick = function () {
            var allPage = this.previousElementSibling.children[0].innerText;
            var pageIndex = this.previousElementSibling.previousElementSibling.children[0].value;
            pageIndex = pageIndex >= allPage ? allPage : (parseInt(pageIndex) + 1);
            var thisBoundObj = this.parentNode.parentNode.parentNode.parentNode.boundObj;

            if (thisBoundObj.tableDescribe.pageSet.pageIndex == pageIndex)  return;
            else thisBoundObj.tableDescribe.pageSet.pageIndex = pageIndex;

            thisBoundObj.tableDescribe.pageSet.pageSelectIndex(tableDescribe);
            thisBoundObj.changeData();
        };

        trFooter.appendChild(tdFooterNext);
        footerLeft.appendChild(trFooter);

        footer.appendChild(footerLeft);


        //右侧内容
        var footerRight = document.createElement("div");
        footerRight.className = "gridFootRight";
        var startIndex = (parseInt(tableDescribe.pageSet.pageIndex) - 1) * tableDescribe.pageSet.pageSize + 1;
        var endIndex = (parseInt(tableDescribe.pageSet.pageIndex) * parseInt(tableDescribe.pageSet.pageSize)) > tableDescribe.pageSet.allCount ? tableDescribe.pageSet.allCount : (parseInt(tableDescribe.pageSet.pageIndex) * parseInt(tableDescribe.pageSet.pageSize));
        footerRight.innerHTML = "<span>" +startIndex + "</span>-<span>" + endIndex + "</span> 共<span>" + tableDescribe.pageSet.allCount + "</span>条";

        footer.appendChild(footerRight);

        return footer;
    }

    ///创建右键菜单
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableUl(tableDescribe) {
        if(tableDescribe.menuList != undefined){
            var ulMenu = document.createElement("ul");
            ulMenu.className = "gridUlMenu";

            for (var i = 0; i < tableDescribe.menuList.length; i++) {
                var li = document.createElement("li");
                li.innerHTML = '<button onclick="' + tableDescribe.menuList[i].onclick + '">' + tableDescribe.menuList[i].name + '</button>';
                ulMenu.appendChild(li);
            }
            return ulMenu;
        }

        return null;
    }
}

window.onload = function () {
    document.onclick = function (event) {
        var event = event || window.event;
        var menuList = document.getElementsByClassName("gridUlMenu");
        for(var i = 0; i < menuList.length; i++){
            if(menuList[i].style.display == "block") menuList[i].style.display = "none";
        }
    }
};