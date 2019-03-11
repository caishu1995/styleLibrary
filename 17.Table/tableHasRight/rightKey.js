var RightKey = function(id) {
    this.menu = {
        height: 250,  //宽
        width: 250,   //高

        id: id,       //id号
        ele: document.getElementById(id)    //右键菜单元素
    }; //菜单列表宽高定义

    ///{
    ///     selector:'',                //定义执行的范围
    ///     getData:function(ele){
    ///         return [{ text: "", isEnabled: true }] //text为展示的文字，isEnabled表示是否激活
    ///     } //获得数据的函数，参数为点击的元素ele。返回为数组，不超过10个
    ///}
    this.range = [];

    this.init = function(){
        //给特定位置元素，绑定内容
        var _this = this;
        for(var i = 0; i < this.range.length; i++){
            var _eleList = document.querySelectorAll(this.range[i].selector);
            for(var j = 0; j < _eleList.length; j++) {
                _eleList[j].dataset = { };
                _eleList[j].dataset.index = i ; //加入dataset.index
                _eleList[j].onmousedown = function(ev, lowerEle){
                    //判断右键
                    if(ev.button ==2){
                        //根据点击数据的内容，创建内容
                        var _data = (lowerEle == undefined)?
                                    _this.range[this.dataset.index].getData(ev.target):
                                    _this.range[this.dataset.index].getData(lowerEle); //获得点击元素可以展示的菜单内容
                        var _count = (_data.length >= 10)? 10: _data.length;      //获得总数，不大于10
                        var _str = "";
                        for(var j = 0 ; j < _count; j++){
                            _str += "<li" + (_data[j].isEnabled? "": " disabled") + "><a>" + _data[j].text + "</a></li>";
                        }
                        _this.menu.ele.getElementsByClassName("rightKeyMenu")[0].innerHTML = _str;


                        //定位并展示
                        _this.menu.ele.style.left = ((ev.clientX >= (document.body.clientWidth - _this.menu.width / 2))? (document.body.clientWidth - _this.menu.width):
                            ((ev.clientX <= (_this.menu.width / 2))? 0: (ev.clientX - _this.menu.width / 2))) + 'px';
                        _this.menu.ele.style.top =  ((ev.clientY >= (document.body.clientHeight - _this.menu.height / 2))? (document.body.clientHeight - _this.menu.height):
                            ((ev.clientY <= (_this.menu.height / 2))? 0: (ev.clientY - _this.menu.height / 2))) + 'px';
                        _this.menu.ele.style.opacity  = 1;
                        _this.menu.ele.style.visibility  = "visible";

                        //改变旋转角度
                        if ((window.navigator.userAgent.indexOf("MSIE") >= 1) || (window.navigator.userAgent.indexOf("trident") >= 1)){//兼容IE
                            for(var i = 0; i < _count; i++){
                                _this.menu.ele.getElementsByClassName("rightKeyMenu")[0].childNodes[i].style.transform = "scale(1) rotate(" + (360/_count * i) + "deg)";
                            }
                        } else {
                            _this.menu.ele.style.setProperty('--range', 360/_count);
                        }

                        //阻止冒泡
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                };  //鼠标按下事件
            }
        }

        ///加入右键元素的鼠标按下事件
        _this.menu.ele.onmousedown = function(ev){
            //右键
            if(ev.button ==2){
                if ((window.navigator.userAgent.indexOf("MSIE") >= 1) || (window.navigator.userAgent.indexOf("trident") >= 1)){//支持ie
                    var hitTargets = document.msElementsFromPoint(ev.clientX, ev.clientY);//获得鼠标按下位置上的元素列表
                    for(var i = 0; i < hitTargets.length - 1; i++){
                        //如果找到了右键菜单的最外级，则触发他的上级的mousedown事件
                        if(hitTargets[i].id == _this.menu.id) {
                            (hitTargets[i+1].onmousedown != null)?hitTargets[i+1].onmousedown(ev, hitTargets[i+1]): null;
                            break;
                        }
                    }
                } else {
                    this.style.pointerEvents = "none";      //将当前元素置为穿透
                    var _ele = document.elementFromPoint(ev.clientX, ev.clientY);//底层元素
                    (_ele.onmousedown != null)? _ele.onmousedown(ev, _ele): null; //人为触发当前位置上的元素的mousedown事件
                    this.style.pointerEvents = "auto";     //恢复当前元素置为正常
                }
            }
        };

        window.oncontextmenu = function(ev) { ev.preventDefault(); }; //禁止window的右键

        //中心点点击、鼠标移出右键区域，则隐藏
        this.menu.ele.getElementsByClassName("rightKeyCenter")[0].onclick =
        this.menu.ele.onmouseleave =
        function(ev) {
            //将菜单旋转角度初始化
            if ((window.navigator.userAgent.indexOf("MSIE") >= 1) || (window.navigator.userAgent.indexOf("trident") >= 1)){
                //兼容IE，遍历并修改角度
                var _liList = _this.menu.ele.getElementsByClassName("rightKeyMenu")[0].childNodes;
                for(var i = 0; i < _liList.length; i++){
                    _liList[i].style.transform = "scale(1) rotate(" + (360/_liList.length * i) + "deg)";
                }
            } else {
                //直接修改css变量
                _this.menu.ele.style.setProperty('--range', 0);
            }

            //隐藏菜单
            _this.menu.ele.style.opacity  = 0;
            _this.menu.ele.style.visibility  = "hidden";
        };
    };
};


