function MyTableClass(tableUserDescribe) {
    ///表格的描述信息
    ///titleList :标题的描述的数组
    /// titleList.title  : 标题名称
    /// titleList.columns: 对应的数据的名称
    /// titleList.type   : 需要展示的类型，详情看changeDataToShow参数说明
    ///id        :对应dom的id号
    ///rowIdFrom :行id对应的数据来源
    ///dataSource:所有的数据集合
    this.tableDescribe = tableUserDescribe;//内容的描述

    var timeOutIndex = 0; //定时器的序号

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
        //移除原内容
        while (baseEle.children.length)
            baseEle.removeChild(baseEle.children[0]);

        ///创建表格
        var tableELe = document.createElement("div");
        tableELe.className = "tableDiv";
        var header = createMyTableHeader(this.tableDescribe);//创建头部
        tableELe.appendChild(header);
        baseEle.appendChild(tableELe);
        ///创建按钮
        var buttonEle = createMyButton(this.tableDescribe);
        baseEle.appendChild(buttonEle);
    };
    ///创建表格头部
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableHeader(tableDescribe) {
        var header = document.createElement("div");
        header.className = "gridTitle";

        //左侧区域
        var leftHeader = createMyTableHeaderLeft(tableDescribe);
        header.appendChild(leftHeader);
        //左侧区域
        var rightHeader = createMyTableHeaderRight();
        header.appendChild(rightHeader);

        return header;
    }
    ///创建表格头部左侧区域，即表头的列名显示区域
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableHeaderLeft(tableDescribe) {
        var leftHeader = document.createElement("div");
        leftHeader.className = "HeaderLeft";

        var trHeader = document.createElement("ul");
        //第一列为单选/多选框，此处没有，为不影响结构，保留li
        var tdHeader1 = document.createElement("li");
        trHeader.appendChild(tdHeader1);
        //其他列
        for (var i = 0; i < tableDescribe.titleList.length; i++) {
            var tdHeader = document.createElement("li");
            tdHeader.innerText = tableDescribe.titleList[i].title;
            trHeader.appendChild(tdHeader);
        }
        //末尾为列表组
        var tdHeaderOtherList = document.createElement("li");
        trHeader.appendChild(tdHeaderOtherList);
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


    /*-- 中间数据、右键部分 --*/
    ///画数据行、尾部
    this.tableDraw = function () {
        var baseEle = document.getElementById(this.tableDescribe.id).getElementsByClassName("tableDiv")[0]; //基础DOM元素

        ///中部
        var content = createMyTableContent(this.tableDescribe);
        baseEle.appendChild(content);
        ///右键菜单
        var ulMenu = createMyTableUl(this.tableDescribe);
        baseEle.appendChild(ulMenu);

        ///追加中间区域横向滚动条事件，使表头表身联动
        content.onscroll = function () {
            baseEle.children[0].getElementsByTagName("div")[0].scrollLeft = this.scrollLeft;
        }
    };
    ///创建表格中间
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableContent(tableDescribe) {
        var content = document.createElement("div");
        content.className = "gridBody";

        ///创建实际数据内容
        for (var i = 0; i < tableDescribe.dataSource.data.length; i++) {
            var trContent = createRowFunction(tableDescribe, 1, tableDescribe.dataSource.data[i]);//创建行数据
            content.appendChild(trContent);
        }

        ///创建新增按钮行
        var trAddContent = document.createElement("ul");
        trAddContent.className = "addButtonRow";
        //如果第一列显示，则第一个为新增按钮；否则，第二个为新增按钮
        if ((tableDescribe.firstEle == undefined) || (tableDescribe.firstEle.hasRadioOrInputEle == false)) {
            var tdContent = document.createElement("li");
            tdContent.style.display = "none";
            trAddContent.appendChild(tdContent);
        }
        //新增按钮
        var tdAddContent = document.createElement("li");
        var tdAddButton = document.createElement("button");
        tdAddButton.onclick = function () { addButtonOnClickFunction(tableDescribe); };
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
        //正常行
        if (state == 0) {
            trContent.className = "addWritingRow";
        } else {
            trContent.className = "normalRow";
        }

        ///第一列，此处没有，为不影响结构，保留li
        var tdContent1 = document.createElement("li");
        trContent.appendChild(tdContent1);
        ///数据列
        for (var j = 0; j < tableDescribe.titleList.length; j++) {
            var tdContent = document.createElement("li");
            tdContent.ondblclick = function () { trOnDblClickFunction(this); };
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


                tdContent.title = dataContent;//修改title
                writeInput.value = dataContent;//修改输入框内容
                writeInput.onblur = function () { trOnBlurFunction(this, tableDescribe); };//绑定失去焦点事件
                readInput.value = dataContent;//修改显示内容
            } else {
                //绑定失去焦点和获得焦点事件
                writeInput.onblur = function () { timeOutIndex = setTimeout(function () { writeInputOnBlurFunction(tableDescribe); }, 100); };
                writeInput.onfocus = function () { clearTimeout(timeOutIndex); };
            }
        }
        ///删除按钮列
        var tdContentOtherList = document.createElement("li");
        //删除按钮
        var deleteButton = document.createElement("button");
        deleteButton.onclick = function () { deleteOnClickFunction(this, tableDescribe); };
        deleteButton.className = "deleteButton";
        deleteButton.innerHTML = '<img src="Style/img/2.png" title="删除"/>delete';
        if (state == 0) {
            //绑定获得焦点事件
            deleteButton.onfocus = function () { clearTimeout(timeOutIndex); };
        }
        tdContentOtherList.appendChild(deleteButton);
        //恢复按钮
        var recoverButton = document.createElement("button");
        recoverButton.onclick = function () { recoverOnClickFunction(this); };
        recoverButton.className = "recoverButton";
        recoverButton.innerHTML = '<img src="Style/img/6.png" title="恢复"/>renew';
        tdContentOtherList.appendChild(recoverButton);
        trContent.appendChild(tdContentOtherList);

        return trContent;
    }
    ///创建右键菜单
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyTableUl(tableDescribe) {
        var ulMenu = document.createElement("ul");
        ulMenu.className = "gridUlMenu";

        var li = document.createElement("li");
        //删除按钮
        var deleteButton = document.createElement("button");
        deleteButton.onclick = function () { deleteOnClickFunction(this, tableDescribe); };
        deleteButton.className = "deleteButton";
        deleteButton.innerText = "delete";
        li.appendChild(deleteButton);
        //恢复按钮
        var recoverButton = document.createElement("button");
        recoverButton.onclick = function () { recoverOnClickFunction(this); };
        recoverButton.className = "recoverButton";
        recoverButton.innerText = "renew";
        li.appendChild(recoverButton);
        ulMenu.appendChild(li);

        return ulMenu;
    }


    /*-- 保存按钮部分 --*/
    ///创建保存配置的按钮
    ///tableDescribe：数据
    ///返回         ：创建好的元素
    function createMyButton(tableDescribe) {
        var buttonELe = document.createElement("div");
        buttonELe.className = "saveDiv";

        var button = document.createElement("button");
        button.innerText = "保存配置";
        button.disabled = true;
        button.onclick = function () { saveOnClickFunction(tableDescribe); };
        buttonELe.appendChild(button);

        var alertTextELe = document.createElement("div");
        alertTextELe.className = "saveText";
        alertTextELe.innerText = "请记得保存设置";
        buttonELe.appendChild(alertTextELe);

        return buttonELe;
    }


    /*-- 行状态改变部分 --*/
    ///改变行的状态，或进行对应操作
    ///rowEle    ：行DOM元素
    ///operation ；操作（ 1：修改；2：删除；3：恢复；0：正常 ）
    function changeRowState(rowEle, operation) {
        for (var i = 0; i < rowEle.classList.length; i++) {
            if ((rowEle.classList[i] == "normalRow") || (rowEle.classList[i] == "updateRow")) {
                //正常、修改状态中，修改则改为修改状态，删除则修改为删除状态，正常则修改为正常状态
                rowEle.classList.remove("normalRow");
                rowEle.classList.remove("updateRow");
                if (operation == 1) rowEle.classList.add("updateRow");
                else if (operation == 2) rowEle.classList.add("deleteRow");
                else if (operation == 0) rowEle.classList.add("normalRow");
            } else if (rowEle.classList[i] == "deleteRow") {
                //删除状态中，恢复则改为修改状态，正常则删除行
                rowEle.classList.remove("deleteRow");
                if (operation == 3) rowEle.classList.add("updateRow");
                else if (operation == 0) rowEle.parentNode.removeChild(rowEle);
            } else if ((rowEle.classList[i] == "addRow") || (rowEle.classList[i] == "addWritingRow")) {
                //新增状态中，修改则改为新增状态，删除则删除该行，正常则修改为正常状态
                rowEle.classList.remove("addRow");
                rowEle.classList.remove("addWritingRow");
                if (operation == 1) rowEle.classList.add("addRow");
                else if (operation == 2) rowEle.parentNode.removeChild(rowEle);
                else if (operation == 0) rowEle.classList.add("normalRow");
            }
        }
    }
    ///获得行的状态
    ///rowEle ：行DOM元素
    ///返回   ：状态信息（ 0："normal"; 1："add"; 2："update"; 3："delete"）
    function getRowState(rowEle) {
        var state = -1;
        for (var className in rowEle.classList)
        {
            switch (rowEle.classList[className]) {
                case "normalRow": state = 0; break;
                case "addRow": state = 1; break;
                case "updateRow": state = 2; break;
                case "deleteRow": state = 3; break;
            }
        }
        return state;
    }


    /*-- 各种事件部分 --*/
    ///删除按钮的点击事件
    ///clickEle     ：点击的元素
    ///tableDescribe：数据
    function deleteOnClickFunction(clickEle, tableDescribe) {
        var rowEle;//寻找行元素
        //判断是通过右键点击还是点击行内按钮
        if (clickEle.parentNode.parentNode.parentNode.className == "gridBody")
            rowEle = clickEle.parentNode.parentNode;
         else
            rowEle = clickRowEle;

        if(rowEle.dataset.id == "-1"){
            rowEle.parentNode.removeChild(rowEle);
            return;
        }

        //执行外部传来的验证函数
        var bo = true;
        if ((tableDescribe.clickFunctionList != undefined) && (tableDescribe.clickFunctionList.deleteFunction != undefined))
            bo = tableDescribe.clickFunctionList.deleteFunction(rowEle.dataset.id);

        //如果无验证函数、验证正确，修改行状态
        if (bo) {
            changeRowState(rowEle, 2);
            document.getElementById(tableDescribe.id).getElementsByClassName("saveDiv")[0].childNodes[0].disabled = false;
            document.getElementById(tableDescribe.id).getElementsByClassName("saveDiv")[0].childNodes[1].style.display = "block";
        }
    }
    ///恢复按钮的点击事件
    ///clickEle：点击的元素
    function recoverOnClickFunction(clickEle) {
        var rowEle = clickEle.parentNode.parentNode;//寻找行元素
        //判断是通过右键点击还是点击行内按钮
        if (rowEle.parentNode.className == "gridBody")
            changeRowState(rowEle, 3);
        else
            changeRowState(clickRowEle, 3);
    }
    ///双击单元格允许修改
    ///clickEle：点击的li元素
    function trOnDblClickFunction(clickEle) {
        //行删除时不允许修改
        if (getRowState(clickEle.parentNode) != 3) {
            clickEle.classList.add("writeColumns");
            clickEle.getElementsByClassName("writeInput")[0].focus();
        }
    }
    ///输入框失去焦点事件
    ///inputEle     ：input元素
    ///tableDescribe：数据
    function trOnBlurFunction(inputEle, tableDescribe) {
        inputEle.parentNode.classList.remove("writeColumns");//取消输入状态

        //如果没修改内容，则不保存；如果修改则展示内容并更改行状态
        if (inputEle.parentNode.children[1].value != inputEle.value) {
            //执行外部传来的验证函数
            var bo = true;
            if ((tableDescribe.clickFunctionList != undefined) && (tableDescribe.clickFunctionList.updateFunction != undefined)) {
                //获得当前选中的单元格的序号，1开始
                var index = -1;
                for(var i = 0; i < inputEle.parentNode.parentNode.children.length; i++){
                    if (inputEle.parentNode.parentNode.children[i] == inputEle.parentNode)
                        index = i;
                }

                bo = tableDescribe.clickFunctionList.updateFunction(inputEle.parentNode.parentNode.dataset.id, index, inputEle.value);
            }

            //如果无验证函数、验证正确，修改行状态
            if (bo) {
                inputEle.parentNode.children[1].value = inputEle.value;
                changeRowState(inputEle.parentNode.parentNode, 1);
                document.getElementById(tableDescribe.id).getElementsByClassName("saveDiv")[0].childNodes[0].disabled = false;
                document.getElementById(tableDescribe.id).getElementsByClassName("saveDiv")[0].childNodes[1].style.display = "block";
            }
        }
    }
    ///新增点击事件
    ///tableDescribe：数据
    function addButtonOnClickFunction(tableDescribe) {
        timeOutIndex = 0;

        //创建并插入
        var trContent = createRowFunction(tableDescribe, 0, null);
        var tbodyEle = document.getElementById(tableDescribe.id).children[0].children[1];
        tbodyEle.insertBefore(trContent, tbodyEle.children[tbodyEle.children.length - 1]);

        //给第一个框焦点
        trContent.children[1].children[0].focus();

        tbodyEle.scrollTop = tbodyEle.scrollHeight;
    }
    ///新增行输入框失去焦点事件
    ///tableDescribe：数据
    function writeInputOnBlurFunction(tableDescribe) {
        var trEle = document.getElementById(tableDescribe.id).children[0].children[1].getElementsByClassName("addWritingRow")[0];

        //执行外部传来的验证函数
        var bo = true;
        if ((tableDescribe.clickFunctionList != undefined) && (tableDescribe.clickFunctionList.addFunction != undefined))
            bo = tableDescribe.clickFunctionList.addFunction(trEle);

        //如果无验证函数、验证正确，修改行状态
        if (bo) {
            for (var i = 0; i < tableDescribe.titleList.length; i++) {
                trEle.childNodes[i + 1].children[1].value = trEle.childNodes[i + 1].children[0].value;//重新赋值
                trEle.childNodes[i + 1].children[0].onblur = function () { trOnBlurFunction(this, tableDescribe); }; //重新绑定失去焦点事件
            }
            trEle.childNodes[i].childNodes[0].onfocus = ""; //重新绑定删除按钮的获得焦点的函数
            changeRowState(trEle, 1);
            document.getElementById(tableDescribe.id).getElementsByClassName("saveDiv")[0].childNodes[0].disabled = false;
            document.getElementById(tableDescribe.id).getElementsByClassName("saveDiv")[0].childNodes[1].style.display = "block";
        }
    }
    ///保存配置的点击事件
    ///tableDescribe：数据
    function saveOnClickFunction(tableDescribe) {
        //存储数据
        var dataList = [];
        var tbodyEle = document.getElementById(tableDescribe.id).children[0].children[1];
        for (var i = 0; i < tbodyEle.children.length - 1; i++) {
            var data = {};
            ///如果进行过修改则保存
            if (getRowState(tbodyEle.children[i])) {
                data["state"] = getRowState(tbodyEle.children[i]);
                data["id"] = tbodyEle.children[i].dataset.id;
                for (var j = 0; j < tableDescribe.titleList.length; j++) {
                    data[tableDescribe.titleList[j].columns] = tbodyEle.children[i].children[j+1].children[0].value;
                }
                dataList.push(data);
            }
        }

        if ((tableDescribe.clickFunctionList != undefined) && (tableDescribe.clickFunctionList.saveFunction != undefined)) {
            var dataNewList = JSON.parse(tableDescribe.clickFunctionList.saveFunction(JSON.stringify(dataList)));//获得修改成功的数据


            for (var i = 0; i < tbodyEle.children.length - 1; i++) {
                //如果是修改或删除，更改数据状态
                if ((getRowState(tbodyEle.children[i]) == 2) || (getRowState(tbodyEle.children[i]) == 3)) {
                    for(var j = 0; j < dataNewList.length; j++){
                        if(dataNewList[j].id == tbodyEle.children[i].dataset.id){
                            changeRowState(tbodyEle.children[i], 0);
                        }
                    }
                } else if (getRowState(tbodyEle.children[i]) == 1) {
                    for(var j = 0; j < dataNewList.length; j++) {
                        if(dataNewList[j].id == tbodyEle.children[i].dataset.id) {
                            //如果是新增行，先删除后创建
                            tbodyEle.removeChild(tbodyEle.children[i]);//删除原行
                            tbodyEle.insertBefore(createRowFunction(tableDescribe, 1, dataNewList[j]), tbodyEle.children[tbodyEle.children.length - 1]); //创建新行
                        }
                    }
                }
            }
        }

        //判断是否允许继续保存
        var errorList = document.getElementById(tableDescribe.id).getElementsByClassName("normalRow").length;
        var allList = document.getElementById(tableDescribe.id).getElementsByClassName("gridBody")[0].childNodes.length - 1;
        if (errorList == allList){
            tbodyEle.parentNode.parentNode.children[1].children[0].disabled = true;
            tbodyEle.parentNode.parentNode.children[1].childNodes[1].style.display = "none";
        }
    }
}

///绑定右键事件
var clickRowEle = null;//当右键时记录点击的行
window.onload = function () {
    document.oncontextmenu = function (event) {
        var event = event || window.event;

        //如果是在中间区域且不是新增按钮行，则保存当前表格的右键ul元素
        var trEle = null;
        var ulEle = null;
        if ((event.target.parentNode.parentNode.className == "gridBody") && (event.target.parentNode.className != "addButtonRow")){
            trEle = event.target.parentNode;
            ulEle = event.target.parentNode.parentNode.parentNode.children[2];
        }
        else if ((event.target.parentNode.parentNode.parentNode.className == "gridBody") && (event.target.parentNode.parentNode.className != "addButtonRow")) {
            trEle = event.target.parentNode.parentNode;
            ulEle = event.target.parentNode.parentNode.parentNode.parentNode.children[2];
        }

        if (ulEle == null) {
            //如果不该显示右键，则隐藏右键的按钮
            for (var i = 0; i < document.getElementsByClassName("gridUlMenu").length; i++) {
                document.getElementsByClassName("gridUlMenu")[i].classList.remove("delete");
                document.getElementsByClassName("gridUlMenu")[i].classList.remove("normal");
            }
        } else {
            //如果该显示右键，则显示右键的按钮 
            ulEle.classList.remove("delete");
            ulEle.classList.remove("normal");

            if (trEle.className == "deleteRow") ulEle.classList.add("delete");
            else ulEle.classList.add("normal");

            ulEle.style.left = event.clientX + "px";
            ulEle.style.top = event.clientY + "px";

            clickRowEle = trEle;
        }

        return false;//返回false,为了屏蔽默认事件 
    };

    document.onclick = function (event) {
        var event = event || window.event;

        clickRowEle = null;//清空点击行

        //隐藏右键的按钮
        for (var i = 0; i < document.getElementsByClassName("gridUlMenu").length; i++) {
            document.getElementsByClassName("gridUlMenu")[i].classList.remove("delete");
            document.getElementsByClassName("gridUlMenu")[i].classList.remove("normal");
        }

        return true;
    }
};
window.onbeforeunload = function () {
    if (document.getElementsByClassName("saveText")) {
        return "还有数据没有保存，确认真的离开?";
    }
};