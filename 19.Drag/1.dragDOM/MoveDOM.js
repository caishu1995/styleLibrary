let downInformation = { downLeft: 0, downTop: 0 }; //记录按下鼠标右键的位置，用于画选择范围的框

function MoveDOM() {
    /// 描述信息，数组
    /// moveFromDiv : 支持从哪个div，移动到当前元素。 支持 *（全部） .（class） #（id）。支持多区域，请用 - 连接
    /// thisDivId   : 当前div的id
    /// moveToDiv   : 移动到的div的id。 支持 *（全部） .（class） #（id）。支持多区域，请用 - 连接
    this.describeObj = [];
    ///初始函数
    this.init = function() {
        for(var i = 0; i < this.describeObj.length; i++){
            var baseDiv = document.getElementById(this.describeObj[i].thisDivId);
            initThisElement(baseDiv); //初始化

            supportRemove(baseDiv, this.describeObj[i].moveToDiv);  //支持移出
            supportMoveIn(baseDiv, this.describeObj[i].moveFromDiv);//支持移入
        }
    };

    /// 初始化当前元素
    /// thisEle : 当前元素
    function initThisElement(thisEle) {
        if(!thisEle.dataset) thisEle.dataset = {};//判断是否存在dataset

        //绑定右键的选择事件
        thisEle.onmousedown = function(e) {
            //如果是右键按下
            if(e.button == 2){
                //如果没有区域
                if((downInformation.downLeft == 0) && (downInformation.downTop == 0)){
                    //获得坐标，并用全局变量储存
                    downInformation.downLeft = parseInt(e.x);
                    downInformation.downTop = parseInt(e.y);

                    //创建元素
                    var div = document.createElement("div");
                    div.className = "selectArea";
                    div.style.top = downInformation.downTop + "px";
                    div.style.left = downInformation.downLeft + "px";
                    this.appendChild(div);
                }
            }
        };
        thisEle.onmousemove = function(e) {
            if((downInformation.downLeft != 0) || (downInformation.downTop != 0)) {
                //获得div右下坐标
                var baseLeft = this.offsetLeft + this.offsetWidth;
                var baseTop = this.offsetHeight + this.offsetTop;

                //获得当前坐标
                var endLeft = (baseLeft < e.x) ? baseLeft : e.x;
                var endTop = (baseTop < e.y) ? baseTop : e.y;

                //计算宽高
                this.getElementsByClassName("selectArea")[0].style.width = (endLeft - downInformation.downLeft) + "px";
                this.getElementsByClassName("selectArea")[0].style.height = (endTop - downInformation.downTop) + "px";
            }
        };
        thisEle.onmouseup = function(e) {
            //如果是右键弹起
            if(e.button == 2) {
                //如果不是ctrl+右键，则清除其他选中
                if (e.ctrlKey != 1)
                {
                    var list = this.getElementsByClassName("selected");
                    while(list.length){
                        list[0].classList.remove("selected");
                    }
                }

                //如果有区域
                if((downInformation.downLeft != 0) || (downInformation.downTop != 0)) {
                    //获得选择的范围，并移除区域
                    var selectArea = document.getElementsByClassName("selectArea")[0];
                    var fromX = selectArea.offsetLeft;
                    var fromY = selectArea.offsetTop;
                    var toX = selectArea.offsetLeft + selectArea.offsetWidth;
                    var toY = selectArea.offsetTop + selectArea.offsetHeight;
                    selectArea.parentNode.removeChild(selectArea);

                    //判断是否被选中，如果被选中，增加样式，等待使用
                    var list = [];
                    recursionFind(this, list); //查找元素
                    for(var i = 0 ; i < list.length; i++){
                        var startX = list[i].offsetLeft;
                        var startY = list[i].offsetTop;
                        var endX = list[i].offsetLeft + list[i].offsetWidth;
                        var endY = list[i].offsetTop + list[i].offsetHeight;
                        var isCanMove = (list[i].getAttribute("data-needMoveIndex") != undefined);
                        if((startX <= toX) && (startY <= toY) && (endX >= fromX) && (endY >= fromY) && (isCanMove)){
                            var count = list[i].classList.length;

                            //如果是已经被选中，则取消
                            for(var j = 0; j < count; j++){
                                if(list[i].classList[j] == "selected"){
                                    list[i].classList.remove("selected");
                                    break;
                                }
                            }
                            //如果未被选中则选中
                            if(j == count)
                                list[i].classList.add("selected");
                        }
                    }

                    downInformation = { downLeft: 0, downTop: 0 };//恢复数据
                }
            }
        };

        //找到所有放入的子节点
        var list = [];
        recursionFindDrop(thisEle, list); //查找元素

        //给这些子节点绑定事件
        for(var i = 0; i < list.length; i++){
            list[i].dataset.parentsId = thisEle.id;

            list[i].ondrop = function(e) { dropDiv(e, true, document.getElementById(this.dataset.parentsId), this) };
            list[i].ondragover = function(e){ e.preventDefault() };
            list[i].ondragenter = function(e){ e.preventDefault() };
        }
    }
    /// 支持移出
    /// thisEle  ：当前元素
    /// moveToDiv：支持移动到的div
    function supportRemove(thisEle, moveToDiv) {
         if(moveToDiv != undefined) thisEle.dataset.moveToDiv = moveToDiv;

        //找到所有支持移动的子节点
        var list = [];
        recursionFind(thisEle, list); //查找元素

        //给这些子节点绑定事件
        for(var i = 0; i < list.length; i++){
            list[i].draggable = true;
            list[i].dataset.parentsId = thisEle.id;

            list[i].onclick = function(e) {
                //如果是已经被选中，点击表示取消
                for(var i = 0; i < this.classList.length; i++){
                    if(this.classList[i] == "selected"){
                        this.classList.remove("selected");
                        return;
                    }
                }

                //如果没被选中的，则移除选中的，选中此元素
                if(this.getAttribute("data-needMoveIndex") != undefined){
                    //如果不是ctrl+点击，则取消其他的选中
                    if (e.ctrlKey != 1)
                    {
                        var list = this.parentNode.getElementsByClassName("selected");
                        while(list.length){
                            list[0].classList.remove("selected");
                        }
                    }

                    //添加选中
                    this.classList.add("selected");
                }
            };
            list[i].ondragstart = function(e) {
                if (e.ctrlKey == 1){ return; } //如果是ctrl+，则视为误操作

                var parentsDiv = document.getElementById(this.dataset.parentsId);

                //如果当前元素未被选中，则清除其他选中当前
                for(var i = 0; i < this.classList.length; i++){
                    if(this.classList[i] == "selected") break;
                }
                if((i == this.classList.length) && (this.getAttribute("data-needMoveIndex") != undefined)){
                    //移除其他选中
                    var list = parentsDiv.getElementsByClassName("selected");
                    while(list.length){
                        list[0].classList.remove("selected");
                    }

                    this.classList.add("selected");
                }

                //找到所有选中的内容，追加，并移除selected
                var dragList = [];
                var list = parentsDiv.getElementsByClassName("selected");
                while(list.length){
                    dragList.push(list[0].dataset.needmoveindex);
                    list[0].classList.remove("selected");
                }

                //设置传输过程中携带的数据
                e.dataTransfer.setData("Text", "{\"moveFrom\":\"" + this.dataset.parentsId + "\", \"moveTo\":\"" + parentsDiv.dataset.moveToDiv + "\", \"content\":\"" + dragList.join("-") + "\"}");
            };

            list[i].ondrop = function(e) { dropDiv(e, false, document.getElementById(this.dataset.parentsId), this.parentNode, this)};
            list[i].ondragover = function(e){ e.preventDefault() };
            list[i].ondragenter = function(e){ e.preventDefault() };
        }
    }
    /// 支持移入
    /// thisEle : 当前元素
    /// moveFromDiv: 元素来源
    function supportMoveIn(thisEle, moveFromDiv) {
        if(moveFromDiv != undefined) thisEle.dataset.moveFromDiv = moveFromDiv;

        thisEle.ondrop = function(e) { dropDiv(e, true, this, this);};
        thisEle.ondragover = function(e){ e.preventDefault() };
        thisEle.ondragenter = function(e){ e.preventDefault() };
    }

    ///放置函数
    /// e        : 事件参数
    /// isAppend : 找到元素后是追加还是插入。 true 追加； false 插入
    /// baseEle  : 基础元素，即该区域最大范围，即 describeObj.thisDivId 中定义的内容
    /// moveToEle: 需要移动到的元素
    /// thisEle  : 当前元素。当 isAppend = false 的时候才必须传入
    function dropDiv(e, isAppend, baseEle, moveToEle, thisEle) {
        e.preventDefault();

        if(e.dataTransfer.getData("Text") == "") return;
        var data = JSON.parse(e.dataTransfer.getData("Text"));

        //检查 来源、到达的位置
        if(checkTo(baseEle, data.moveTo, data.moveFrom) && checkFrom(baseEle, data.moveFrom)){
            var dragList = data.content.split("-");

            //找到所有区域内可拖动的元素
            var allList = [];
            recursionFind(document.getElementById(data.moveFrom), allList); //查找元素

            //根据Index，找到元素，并追加元素
            for(var i = 0; i < dragList.length; i++){
                for(var j = 0; j < allList.length; j++){
                    if(allList[j].dataset.needmoveindex == dragList[i]){
                        allList[j].dataset.parentsId = baseEle.id; //更改父级id

                        if(isAppend) moveToEle.appendChild(allList[j]);
                        else moveToEle.insertBefore(allList[j], thisEle);

                        break;
                    }
                }
            }
        }
        e.stopPropagation(); //阻止冒泡
    }

    //检查来源是否合理
    /// thisEle : 当前元素
    /// moveFrom: 元素来源
    function checkFrom(thisEle, moveFrom) {
        if(moveFrom == thisEle.id) return true;             //检查是否仅为内部移动
        if(thisEle.dataset.moveFromDiv == "*") return true; //检查当前元素的来源是否为任意

        //检查是否和允许的来源一致
        var list = document.getElementById(moveFrom).classList;
        var canFromList = thisEle.dataset.moveFromDiv.split("-");
        for(var j = 0; j < canFromList.length; j++){
            if(canFromList[j][0] == "#"){
                if(canFromList[j].substr(1) == moveFrom)return true;
            } else if(canFromList[j][0] == "."){
                for(var i = 0; i < list.length; i++){
                    if(list[i] == canFromList[j].substr(1)) return true;
                }
            }
        }

        return false;
    }
    //检查移动到的位置是否合理
    /// thisEle : 当前元素
    /// moveTo  : 元素允许的去处
    /// moveFrom: 元素来源
    function checkTo(thisEle, moveTo, moveFrom) {
        if(moveFrom == thisEle.id) return true; //检查是否仅为内部移动
        if(moveTo == "*") return true;          //检查当前元素的来源是否为任意

        //检查是否和允许的来源一致
        var list = moveTo.split("-");
        for(var i = 0; i < list.length; i++){
            if(list[i][0] == "."){
                for(var j = 0; j < thisEle.classList.length; j++){
                    if(list[i].substr(1) == thisEle.classList[j]) return true;
                }
            } else if(list[i][0] == "#"){
                if(list[i].substr(1) == thisEle.id) return true;
            }
        }

        return false;
    }

    /// 递归查找有属性data-needMoveIndex的元素
    /// thisDOM : 当前元素
    /// list    :存储所有找到的元素
    function recursionFind(thisDOM, list) {
        if(thisDOM.children.length){
            for(var i = 0; i < thisDOM.children.length; i++){
                var childrenDOM = thisDOM.children[i];

                //如果元素存在属性data-needMoveIndex，则绑定事件
                if(childrenDOM.getAttribute("data-needMoveIndex") != undefined){
                    list.push(childrenDOM);
                }

                recursionFind(childrenDOM, list);//继续查找子元素
            }
        }
    }
    /// 递归查找有属性data-canDrop的元素
    /// thisDOM : 当前元素
    /// list    :存储所有找到的元素
    function recursionFindDrop(thisDOM, list) {
        if(thisDOM.children.length){
            for(var i = 0; i < thisDOM.children.length; i++){
                var childrenDOM = thisDOM.children[i];

                //如果元素存在属性data-canDrop，则绑定事件
                if(childrenDOM.getAttribute("data-candrop")){
                    list.push(childrenDOM);
                }

                recursionFindDrop(childrenDOM, list);//继续查找子元素
            }
        }
    }
}

document.oncontextmenu = function(e) { e.preventDefault(); };