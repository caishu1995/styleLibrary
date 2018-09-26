function MyTableClass(tableUserDescribe) {
    ///表格的描述信息
    ///titleList :标题的描述的数组
    ///     titleList.title  : 标题名称
    ///     titleList.columns: 对应的数据的名称
    ///     titleList.type   : 需要展示的类型，详情看changeDataToShow参数说明
    ///id        :对应dom的id号
    ///dataSource:所有的数据集合
    ///     dataSource.data:所有的数据
    ///     dataSource.idFrom:行id来源
    ///clickFunctionList:所有的数据集合
    ///     clickFunctionList.deleteFunction:删除函数
    ///     clickFunctionList.saveFunction  :保存函数
    this.tableDescribe = tableUserDescribe;
    this.clickRowEle = null; //点击的行

    ///绑定具体数据部分
    this.boundData = function (data) {
        this.tableDescribe.dataSource.data = data;
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
        tableELe.appendChild(createMyTableHeader(this.tableDescribe));//创建头部

        baseEle.appendChild(tableELe);
    };
    ///创建表格头部
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableHeader(tableDescribe) {
        var header = document.createElement("div");
        header.className = "gridTitle";

        header.appendChild(createMyTableHeaderLeft(tableDescribe));//左侧区域
        header.appendChild(createMyTableHeaderRight());//右侧区域

        return header;
    }
    ///创建表格头部左侧区域，即表头的列名显示区域
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableHeaderLeft(tableDescribe) {
        var leftHeader = document.createElement("div");
        leftHeader.className = "HeaderLeft";

        var trHeader = document.createElement("ul");
        //第一列为列表组
        var tdHeaderOtherList = document.createElement("li");
        trHeader.appendChild(tdHeaderOtherList);
        //其他列
        for (var i = 0; i < tableDescribe.titleList.length; i++) {
            var tdHeader = document.createElement("li");
            tdHeader.innerText = tableDescribe.titleList[i].title;
            trHeader.appendChild(tdHeader);
        }
        leftHeader.appendChild(trHeader);

        return leftHeader;
    }
    ///创建表格头部右侧区域，即表头的滚动条空白区域
    ///返回 ：创建好的元素
    function createMyTableHeaderRight() {
        var rightHeader = document.createElement("div");//右侧区域，滚动条上侧区域
        rightHeader.className = "HeaderRight";
        return rightHeader;
    }

    /*-- 中间数据部分 --*/
    ///画数据行、右键
    this.tableDraw = function () {
        var baseEle = document.getElementById(this.tableDescribe.id).getElementsByClassName("tableDiv")[0]; //基础DOM元素

        baseEle.appendChild(createMyTableContent(this.tableDescribe));//中部
        baseEle.appendChild(createMyTableUl(this.tableDescribe)); //右键菜单
    };
    ///创建表格中间
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableContent(tableDescribe) {
        var content = document.createElement("div");
        content.className = "gridBody";
        //追加中间区域横向滚动条事件，使表头表身联动
        content.onscroll = function () {
            this.parentNode.children[0].children[0].scrollLeft = this.scrollLeft;
        };

        ///创建实际数据内容
        for (var i = 0; i < tableDescribe.dataSource.data.length; i++) {
            var trContent = createRowFunction(tableDescribe, 1, tableDescribe.dataSource.data[i]);//创建行数据
            content.appendChild(trContent);
        }

        ///创建新增按钮行
        var trAddContent = document.createElement("ul");
        trAddContent.className = "addButtonRow";
        //新增按钮
        var tdAddContent = document.createElement("li");
        var tdAddButton = document.createElement("button");
        tdAddButton.onclick = function () { addOnClickFunction(tableDescribe) };
        tdAddButton.innerHTML = '<img src="Style/img/1.png" title="新增"/>add';
        tdAddContent.appendChild(tdAddButton);
        trAddContent.appendChild(tdAddContent);
        content.appendChild(trAddContent);

        return content;
    }
    ///创建行的函数
    ///tableDescribe：数据
    ///state        : 状态；0 新增空白行，1新增数据行
    ///data         ：数据
    ///返回         ：创建好的元素
    function createRowFunction(tableDescribe, state, data) {
        ///创建行内元素
        var trContent = document.createElement("ul");
        //记录主键
        if(data != null){
            var str = [];
            for (var k = 0; k < tableDescribe.dataSource.idFrom.length; k++) {
                str.push(data[tableDescribe.dataSource.idFrom[k]]);
            }
            trContent.setAttribute("data-id", str.join("`"));
        } else {
            trContent.setAttribute("data-id", -1);
        }
        //右键
        trContent.oncontextmenu = function (event) {
            var event = event || window.event;

            var ul = this.parentNode.parentNode.children[2];
            ul.classList.remove("writing");
            ul.classList.remove("normal");

            if (this.className == "writingRow") ul.classList.add("writing");
            else ul.classList.add("normal");

            ul.style.left = event.clientX + "px";
            ul.style.top = event.clientY + "px";

            this.parentNode.parentNode.boundObj.clickRowEle = this;
            event.preventDefault();
        };
        //正常行
        if (state == 0) {
            trContent.className = "writingRow";
        } else {
            trContent.className = "normalRow";
        }

        ///第一列为按钮列
        var tdContentOtherList = document.createElement("li");
        //保存按钮
        var saveButton = document.createElement("button");
        saveButton.onclick = function () { saveOnClickFunction(this); };
        saveButton.className = "saveButton";
        saveButton.innerHTML = '<img src="Style/img/3.png" title="保存"/>save';
        tdContentOtherList.appendChild(saveButton);
        //修改按钮
        var updateButton = document.createElement("button");
        updateButton.onclick = function () { updateOnClickFunction(this); };
        updateButton.className = "updateButton";
        updateButton.innerHTML = '<img src="Style/img/4.png" title="修改"/>update';
        tdContentOtherList.appendChild(updateButton);
        //删除按钮
        var deleteButton = document.createElement("button");
        deleteButton.onclick = function () { deleteOnClickFunction(this); };
        deleteButton.className = "deleteButton";
        deleteButton.innerHTML = '<img src="Style/img/2.png" title="删除"/>delete';
        tdContentOtherList.appendChild(deleteButton);
        trContent.appendChild(tdContentOtherList);
        //取消按钮
        var cancelButton = document.createElement("button");
        cancelButton.onclick = function () { cancelOnClickFunction(this); };
        cancelButton.className = "cancelButton";
        cancelButton.innerHTML = '<img src="Style/img/5.png" title="修改"/>cancel';
        tdContentOtherList.appendChild(cancelButton);
        ///数据列
        for (var j = 0; j < tableDescribe.titleList.length; j++) {
            var tdContent = document.createElement("li");
            //输入框
            var writeInput = document.createElement("input");
            writeInput.className = "writeInput";
            tdContent.appendChild(writeInput);
            //只读框
            var readInput = document.createElement("input");
            readInput.className = "readInput";
            readInput.readOnly = "readonly";
            tdContent.appendChild(readInput);
            trContent.appendChild(tdContent);

            if (state == 1) {
                //如果为null则不展示
                if (data[tableDescribe.titleList[j].columns] == null)
                    data[tableDescribe.titleList[j].columns] = "";

                //转换数据
                var dataContent = data[tableDescribe.titleList[j].columns];
                if(tableDescribe.titleList[j].type != undefined) dataContent = changeDataToShow(dataContent, tableDescribe.titleList[j].type);

                tdContent.title = dataContent;
                writeInput.value = dataContent;
                readInput.value = dataContent;
            }
        }

        return trContent;
    }

    /*-- 右键 --*/
    ///创建右键菜单
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableUl(tableDescribe) {
        var ulMenu = document.createElement("ul");
        ulMenu.className = "gridUlMenu";

        //保存按钮
        var li1 = document.createElement("li");
        li1.className = "saveButton";
        var saveButton = document.createElement("button");
        saveButton.onclick = function () { saveOnClickFunction(this); };
        saveButton.innerHTML = 'save';
        li1.appendChild(saveButton);
        ulMenu.appendChild(li1);
        //修改按钮
        var li2 = document.createElement("li");
        li2.className = "updateButton";
        var updateButton = document.createElement("button");
        updateButton.onclick = function () { updateOnClickFunction(this); };
        updateButton.innerHTML = 'update';
        li2.appendChild(updateButton);
        ulMenu.appendChild(li2);
        //删除按钮
        var li3 = document.createElement("li");
        li3.className = "deleteButton";
        var deleteButton = document.createElement("button");
        deleteButton.onclick = function () { deleteOnClickFunction(this); };
        deleteButton.innerHTML = 'delete';
        li3.appendChild(deleteButton);
        ulMenu.appendChild(li3);
        //取消按钮
        var li4 = document.createElement("li");
        li4.className = "cancelButton";
        var cancelButton = document.createElement("button");
        cancelButton.onclick = function () { cancelOnClickFunction(this); };
        cancelButton.innerHTML = 'cancel';
        li4.appendChild(cancelButton);
        ulMenu.appendChild(li4);
        
        return ulMenu;
    }

    ///修改按钮的点击事件
    ///clickEle     ：点击的元素
    ///tableDescribe：数据
    function updateOnClickFunction(clickEle) {
        var rowEle;//寻找行元素
        //判断是通过右键点击还是点击行内按钮
        if (clickEle.parentNode.parentNode.parentNode.className == "gridBody")
            rowEle = clickEle.parentNode.parentNode;
        else
            rowEle = clickEle.parentNode.parentNode.parentNode.boundObj.clickRowEle;

        rowEle.classList.remove("normalRow");
        rowEle.classList.add("writingRow");
    }
    ///删除按钮的点击事件
    ///clickEle     ：点击的元素
    ///tableDescribe：数据
    function deleteOnClickFunction(clickEle) {
        var rowEle;//寻找行元素
        var tableDescribe = null;
        //判断是通过右键点击还是点击行内按钮
        if (clickEle.parentNode.parentNode.parentNode.className == "gridBody"){
            tableDescribe = clickEle.parentNode.parentNode.parentNode.parentNode.boundObj.tableDescribe;
            rowEle = clickEle.parentNode.parentNode;
        } else{
            tableDescribe = clickEle.parentNode.parentNode.parentNode.boundObj.tableDescribe;
            rowEle = clickEle.parentNode.parentNode.parentNode.boundObj.clickRowEle;
        }

        //执行外部传来的验证函数
        var bo = true;
        if ((tableDescribe.clickFunctionList != undefined) && (tableDescribe.clickFunctionList.deleteFunction != undefined))
            bo = tableDescribe.clickFunctionList.deleteFunction(rowEle.dataset.id);

        //如果无验证函数、验证正确，修改行状态
        if (bo)
            rowEle.parentNode.removeChild(rowEle);
    }
    ///保存按钮的点击事件
    ///clickEle     ：点击的元素
    ///tableDescribe：数据
    function saveOnClickFunction(clickEle) {
        var rowEle;//寻找行元素
        var tableDescribe = null;
        //判断是通过右键点击还是点击行内按钮
        if (clickEle.parentNode.parentNode.parentNode.className == "gridBody"){
            tableDescribe = clickEle.parentNode.parentNode.parentNode.parentNode.boundObj.tableDescribe;
            rowEle = clickEle.parentNode.parentNode;
        } else{
            tableDescribe = clickEle.parentNode.parentNode.parentNode.boundObj.tableDescribe;
            rowEle = clickEle.parentNode.parentNode.parentNode.boundObj.clickRowEle;
        }

        //执行外部传来的验证函数
        var id = 0;
        if ((tableDescribe.clickFunctionList != undefined) && (tableDescribe.clickFunctionList.saveFunction != undefined))
            id = tableDescribe.clickFunctionList.saveFunction(rowEle);

        //如果无验证函数、验证正确，修改行状态
        if (id != -1) {
            rowEle.dataset.id = id;

            for (var j = 0; j < tableDescribe.titleList.length; j++) {
                rowEle.children[j + 1].title = rowEle.children[j + 1].children[1].value;
                rowEle.children[j + 1].children[1].value = rowEle.children[j + 1].children[0].value;
            }

            rowEle.classList.remove("writingRow");
            rowEle.classList.add("normalRow");
        }
    }
    ///新增按钮的点击事件
    ///tableDescribe：数据
    function addOnClickFunction(tableDescribe) {
        var tr = createRowFunction(tableDescribe, 0, null);
        var tbodyEle = document.getElementById(tableDescribe.id).getElementsByClassName("gridBody")[0];
        tbodyEle.insertBefore(tr, tbodyEle.childNodes[tbodyEle.childNodes.length - 1]);
    }
    ///取消按钮的点击事件
    ///tableDescribe：数据
    function cancelOnClickFunction(clickEle) {
        var rowEle;//寻找行元素
        //判断是通过右键点击还是点击行内按钮
        if (clickEle.parentNode.parentNode.parentNode.className == "gridBody"){
            rowEle = clickEle.parentNode.parentNode;
        } else{
            rowEle = clickEle.parentNode.parentNode.parentNode.boundObj.clickRowEle;
        }

        if (rowEle.dataset.id == "-1") {
            rowEle.parentNode.removeChild(rowEle);
        } else {
            for (var j = 1; j < rowEle.children.length; j++) {
                rowEle.children[j].children[0].value = rowEle.children[j].children[1].value;
            }
            rowEle.classList.remove("writingRow");
            rowEle.classList.add("normalRow");
        }
    }
}

///绑定右键事件
window.onload = function () {
    document.onclick = function (event) {
        var event = event || window.event;

        clickRowEle = null;//清空点击行

        //隐藏右键的按钮
        for (var i = 0; i < document.getElementsByClassName("gridUlMenu").length; i++) {
            document.getElementsByClassName("gridUlMenu")[i].classList.remove("writing");
            document.getElementsByClassName("gridUlMenu")[i].classList.remove("normal");
        }

        return true;
    }
};