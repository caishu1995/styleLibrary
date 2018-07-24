function SpecialInput(baseId, count) {
    this.SpecialInputVersion = "2018.0724";
    this.baseId = baseId;
    this.count = count;
    this.widthList = {
        inputWidth: 38,
        pointWidth: 9
    };

    this.init = function() {
        ///创建显示html
        var _div = document.createElement("div");
        _div.className = "multipartInput";
        $(_div).data("count", this.count);
        //设置宽度
        var _width = this.count * this.widthList.inputWidth + (this.count - 1) * this.widthList.pointWidth;
        $(_div).width(_width + "px");
        //设置展示内容
        for(var i = 0; i < this.count; i++){
            //加 .
            if(i){
                var _label = document.createElement("label");
                _label.innerHTML = ".";
                _div.appendChild(_label);
            }

            //加输入的框
            var _label = document.createElement("label");
            _label.className = "input";
            $(_label).data("index", i);
            _label.className = "input";
            _label.onclick = function(ev) { inputShowList(ev, this); };
            _div.appendChild(_label);
        }
        $("#" + this.baseId).html("");
        $("#" + this.baseId).append(_div);

        //添加样式
        $("#" + this.baseId).css("position", "relative");
    };

    function inputShowList(e, thisEle) {
        //当前输入框增加样式
        $(thisEle).parent().children(".selectedInput").removeClass("selectedInput"); //移除原有的
        $(".selectPart").remove();
        $(thisEle).addClass("selectedInput");                                        //在此元素上增加


        //展示ul
        var data = [
            {
                index: '011',
                text: '啊啊啊啊啊啊'
            },{
                index: '012',
                text: '啊啊啊啊'
            },{
                index: '013',
                text: '啊啊啊啊'
            },{
                index: '014',
                text: '啊啊啊啊啊'
            },{
                index: '015',
                text: '啊啊啊'
            },{
                index: '016',
                text: '啊啊啊啊啊'
            },{
                index: '017',
                text: '啊啊啊啊啊'
            },{
                index: '018',
                text: '啊啊啊'
            }
        ];
        //data = { index, text }
        var _ul = document.createElement("ul");
        _ul.className = "selectPart";
        _ul.style.left = e.target.offsetLeft + 'px';
        _ul.innerHTML += '<li><label>代码</label><label style="margin-right: 25px">名称</label></li>';
        for(var i = 0; i < data.length; i++){
            var _li = document.createElement("li");
            $(_li).data("index", data[i].index);
            _li.innerHTML = '<label>' + data[i].index + '</label><label>' + data[i].text + '</label></li>';
            _li.onclick = function() {
                $(this).parent().children(".selectedUl").removeClass("selectedUl");
                $(this).addClass("selectedUl");
            };
            _li.ondblclick = function(e){
                e.keyCode = 13;
                liUpAndDown(e);      //类似回车
                labelLeftAndRight(e);//label左右移动
            };

            _ul.appendChild(_li);
        }
        $(thisEle).parent().parent().append(_ul);
    }
}

///事件的
$(document)
    .on("keyup", function(e){
        liUpAndDown(e);      //li上下移动
        labelLeftAndRight(e);//label左右移动
    })
    .on("click",function(e) {
        //隐藏样式和下拉框
        if((!$(e.target).parents(".multipartInput").length) && (!$(e.target).parents(".selectPart").length)){
            $(".multipartInput .selectedInput").removeClass("selectedInput");
            $(".selectPart").remove();
        }
    } );

///label 左、右、0-9、回车、删除移动
function labelLeftAndRight(e) {
    var selectedLabel = $(".multipartInput .selectedInput");
    if(selectedLabel.length){
        if(e.keyCode == 39){
            //右
            if(selectedLabel.next().next().length && selectedLabel.next().next().eq(0).hasClass("input")){
                $(selectedLabel).next().next().click();
            } else {
                $(selectedLabel).removeClass("selectedInput"); //移除原有的
                $(".selectPart").remove();
            }
        } else if(e.keyCode == 37){
            //左
            if(selectedLabel.prev().prev().length && selectedLabel.prev().prev().eq(0).hasClass("input")){
                $(selectedLabel).prev().prev().click();
            } else {
                $(selectedLabel).removeClass("selectedInput"); //移除原有的
                $(".selectPart").remove();
            }
        } else if((e.keyCode == 13) || ((e.keyCode >= 96) && (e.keyCode <= 105)) || ((e.keyCode >= 48) && (e.keyCode <= 57))) {
            //0-9 两种按键 回车
            var num = selectedLabel.get(0).innerText;
            if(e.keyCode == 13){
                changeValueFunction(num);
            } else {
                //0-9
                var thisNum = -1; //当前数字
                if((e.keyCode >= 96) && (e.keyCode <= 105)) thisNum = e.keyCode - 96;
                else thisNum = e.keyCode - 48;

                if(num.length >= 3) {
                    num = num[1] + num[2] + thisNum;
                    changeValueFunction(num);
                }
                else{
                    num += thisNum;
                    if(num.length == 3) changeValueFunction(num);
                    else  selectedLabel.get(0).innerText = num;
                }
            }

            if(((e.keyCode == 13) || (num.length == 3)) && (selectedLabel.eq(0).data("index") == ($(".multipartInput").data("count") - 1))){
                //如果是第最后一位，且长度为3或回车，则移除样式
                $(document).click();
            }
        } else if(e.keyCode == 8){
            //删除
            var num = selectedLabel.get(0).innerText;
            var resultNum = "";
            switch (num.length){
                case 3: resultNum = num[1] + resultNum;
                case 2: resultNum = num[0] + resultNum;
                default: break;
            }
            selectedLabel.get(0).innerText = resultNum;
        }
    }
}

///li 上、下、回车移动
function liUpAndDown(e) {
    var ul = $(".selectPart");
    if(ul.length){
        //上下转移li
        var selectedUl = ul.find(".selectedUl");
        if(selectedUl.length){
            if(e.keyCode == 40) {
                //往下移动
                if(selectedUl.next().length){
                    selectedUl.next().click();
                }
            } else if(e.keyCode == 38) {
                //往上移动
                if(selectedUl.prev().length){
                    selectedUl.prev().click();
                }
            } else if(e.keyCode == 13) {
                //回车
                $(".multipartInput .selectedInput").text(selectedUl.data("index"));
                ul.remove();//删除
            }
        } else {
            if(e.keyCode == 40) {
                //往下移动
                //如果li未被选中，则选中第二个
                ul.children().eq(1).addClass("selectedUl");
            }
        }
    }
}

///改变值后触发的函数
function changeValueFunction(value) {
    var input = $(".multipartInput .selectedInput");
    input.text(value);    //改值
    input.next().next().click(); //点击下一个

    //将后面的内容清空
    while(input.next().next().length){
        input.next().next().text("");
        input = input.next().next();
    }
}