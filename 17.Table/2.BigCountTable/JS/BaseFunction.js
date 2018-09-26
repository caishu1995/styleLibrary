function MyTableClass(tableUserDescribe) {
    ///表格的描述信息
    ///titleList :标题的描述的数组
    /// titleList.title  : 标题名称
    /// titleList.columns: 对应的数据的名称
    /// titleList.type   : 需要展示的类型，详情看changeDataToShow参数说明
    ///id        :对应dom的id号
    ///rowIdFrom :行id对应的数据来源
    ///dataSource:所有的数据集合
    this.tableDescribe = tableUserDescribe;
    this.rowPos = 0;             //行滚动条的开始位置
    this.dataSelectRemember = -1;//记录选中的行的在数据中的下标号


    var pageCount = 15;         //每页上显示的数量

    ///绑定具体数据部分
    this.boundData = function (data) {
        this.tableDescribe.dataSource = data;
    };

    ///计算行数
    function calculateRow(tableDescribe) {
        var centerNeedHeight = parseFloat(document.getElementById(tableDescribe.id).clientHeight) - 76; //获得表格中间区域实际高度，97是表头+表尾+横向滚动条
        pageCount = parseInt(centerNeedHeight / 35);                                                    //设置一页上显示的数量，35是行高

        document.getElementById(tableDescribe.id).style.paddingTop = parseFloat(centerNeedHeight - pageCount * 35) / 2 + 'px'; //加padding
        document.getElementById(tableDescribe.id).style.height = pageCount * 35 + 76 + "px";            //更新高度，35是行高，97是表头+表尾+横向滚动条
    }

    ///选中行，更改选中行的颜色
    ///thisEle：选中的行元素
    function selectRowFunction(thisEle) {
        //移除原选中的行颜色
        var aa = document.getElementsByClassName("selectRow");
        while (aa.length) {
            aa[0].classList.remove("selectRow");
        }

        thisEle.parentNode.parentNode.parentNode.boundObj.dataSelectRemember = thisEle.dataset.id;//记录选中的行
        thisEle.classList.add("selectRow");//选中本行
    }

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
        calculateRow(this.tableDescribe);

        ///创建表格
        var baseEle = document.getElementById(this.tableDescribe.id); //基础DOM元素
        var tableELe = document.createElement("div");
        tableELe.className = "tableDiv";
        tableELe.boundObj = this;
        tableELe.addEventListener("keyup", function (e) { baseKeyDownFunction(e, this) });

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
        header.appendChild(createMyTableHeaderRight());//左侧区域

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

        baseEle.appendChild(this.createMyTableContent());//中部
        baseEle.appendChild(createMyTableFooter(this.tableDescribe));//尾部
    };
    ///创建表格中间
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    this.createMyTableContent = function() {
        var body = document.createElement("div");
        body.className = "gridBody";

        body.appendChild(createMyTableContentLeft(this.tableDescribe, this.rowPos, this.dataSelectRemember));//设置中间内容
        body.appendChild(createRowScrollBar(this.tableDescribe, this.rowPos));//设置纵向滚动条

        return body;
    };
    ///创建表格左侧
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableContentLeft(tableDescribe, rowPos, dataSelectRemember) {
        var content = document.createElement("div");
        content.className = "gridBodyLeft";
        ///追加中间区域横向滚动条事件，使表头表身联动
        content.onscroll = function () {
            this.parentNode.parentNode.children[0].children[0].scrollLeft = this.scrollLeft;
        };

        //设置中间显示内容，从fromRowCount开始
        for (var i = rowPos; i < (rowPos + pageCount) ; i++) {
            if (i >= tableDescribe.dataSource.length) break; //如果超界即停止

            //创建行元素
            var trAdd = document.createElement("ul");
            trAdd.addEventListener("click", function () { selectRowFunction(this); }, false); //为行加点击事件
            //记录主键
            var str = [];
            for (var k = 0; k < tableDescribe.rowIdFrom.length; k++) {
                str.push(tableDescribe.dataSource[i][tableDescribe.rowIdFrom[k]]);
            }
            trAdd.setAttribute("data-id", str.join("`"));

            //设置单双行背景色,如果记录显示原来被选中，则依然被选中
            if (i % 2 == 0)
                trAdd.className = "whiteBack";
            else
                trAdd.className = "noWhiteBack";
            if (dataSelectRemember == str.join("`"))
                trAdd.classList.add("selectRow");


            //创建每个单元格并追加，从fromColumnsCount开始
            for (var j = 0; j < tableDescribe.titleList.length; j++) {
                //转换数据
                var data = tableDescribe.dataSource[i][tableDescribe.titleList[j].columns];
                if(tableDescribe.titleList[j].type != undefined) data = changeDataToShow(data, tableDescribe.titleList[j].type);

                var tdAdd = document.createElement("li");
                tdAdd.title = data;            //title
                tdAdd.classList.add("ShowLi"); //展示此列

                //在li中创建input,允许用户复制
                var inputAdd = document.createElement("input");
                inputAdd.readOnly = true;
                inputAdd.value = data;
                tdAdd.appendChild(inputAdd);

                trAdd.appendChild(tdAdd);
            }
            content.appendChild(trAdd);
        }

        return content;
    }


    /*-- 中间滚动条部分 --*/
    ///设置纵向滚动条
    ///tableDescribe：表格的说明，用户定义
    ///返回值      ：创建的滚动条对象
    function createRowScrollBar(tableDescribe, rowPos) {
        //创建显示滚动条的div
        var scrollBarEle = document.createElement("div");
        scrollBarEle.className = "scrollBarRowDiv";
        scrollBarEle.addEventListener("scroll", function () { this.parentNode.parentNode.boundObj.rowScrollBarScrollFunction(this); }, false);  //绑定滑动事件
        scrollBarEle.addEventListener("mousewheel", function (e) { contentMouseWheelFunction(e, this)});
        scrollBarEle.addEventListener("DOMMouseScroll", function (e) { contentDOMMouseScrollFunction(e, this) });

        //创建内容，并追加
        var scrollBarContentEle = document.createElement("div");
        scrollBarContentEle.style.height = tableDescribe.dataSource.length * 35 + "px";//设置内容的高度
        scrollBarEle.appendChild(scrollBarContentEle);

        return scrollBarEle;
    }
    ///根据纵向滚动条滑动的位置，更新中间区域内容
    ///divEle： 滚动条所在的div
    ///tableDescribe：表格的说明，用户定义
    this.rowScrollBarScrollFunction = function(divEle) {
        var left = 0;
        //计算开始位置，如果滚动条存在数据计算不准确，则延后一个单元格显示；如果此时在左侧开头，则归零。如果滚动条计算正确，则正常显示
        var top = divEle.scrollTop;
        var all = divEle.scrollHeight;
        if (top == 0)
            this.rowPos = 0;
        else
            this.rowPos = parseInt((top / all) * this.tableDescribe.dataSource.length);

        //添加新内容
        var tbodyAdd = createMyTableContentLeft(this.tableDescribe, this.rowPos, this.dataSelectRemember);
        var body = document.getElementById(this.tableDescribe.id).getElementsByClassName("gridBody")[0];
        if (body.children[0].className == "gridBodyLeft") {
            var left = body.children[0].scrollLeft;//获得当前横向滚动条的位置
            body.removeChild(body.children[0]);
        }
        body.insertBefore(tbodyAdd, body.children[0]);
        tbodyAdd.scrollLeft = left;  //要求先追加元素，再修改距离左侧宽度
    };
    ///纵向滚动条滚动
    function contentMouseWheelFunction(e, thisEle) {
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                thisEle.scrollTop -= 35;
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                thisEle.scrollTop += 35;
            }
        }
    }
    function contentDOMMouseScrollFunction(e, thisEle) {
        e = e || window.event;
        if (e.detail) {  //Firefox滑轮事件
            if (e.detail > 0) { //当滑轮向上滚动时
                thisEle.scrollTop += 35;
            }
            if (e.detail < 0) { //当滑轮向下滚动时
                thisEle.scrollTop -= 35;
            }
        }
    }
    function baseKeyDownFunction(e, thisEle) {
        var e = window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 38)//上
            thisEle.children[1].children[1].scrollTop -= 35;
        if (e && e.keyCode == 40)//下
            thisEle.children[1].children[1].scrollTop += 35;
    }


    /*-- 尾部部分 --*/
    ///创建表格尾部
    ///tableDescribe：表格的说明，用户定义
    ///返回         ：创建好的元素
    function createMyTableFooter(tableDescribe) {
        var trEle = document.createElement("div");//创建行元素
        trEle.className = "gridFoot";
        var tdAdd = document.createElement("div");
        tdAdd.innerText = "共" + tableDescribe.dataSource.length + "条";
        trEle.appendChild(tdAdd);

        return trEle;
    }
}