///问答定义
///eleId         问答创建位置id
///QList         问题列表
///endFunction   问答结束触发的函数
///validateCheck 问答校验函数
var QA = function(eleId, QList, endFunction, validateCheck) {
    var obj = {
        _elementId : eleId,                     //记录问答区域id
        _questionList : QList,                  //记录问题
        _validateCheckFunction : validateCheck, //记录验证函数
        _endFunction: endFunction,              //记录结束处理函数

        _allQuestionCount : QList.length,       //记录问题总数
        _thisQuestionIndex : 1                 //记录当前问题编号
    };
    obj._answerList = new Array(obj._questionList.length);                        //记录填写的答案

    obj.nextClickFunction = function(e) {
        //验证
        var _isPass = true;
        if(obj._validateCheckFunction != undefined){
            var _str = this._validateCheckFunction(
                this._thisQuestionIndex,
                document.querySelector("#" + this._elementId + " .answerPart input").value
            );

            _isPass = (_str == "") ? true: false;
        }

        if(_isPass) {
            document.querySelector("#" + this._elementId + " .errorText").innerHTML = ""; //清空错误提示
            this.changeData();
            this.changeStyle();
        } else { document.querySelector("#" + this._elementId + " .errorText").innerHTML = _str; }
    };
    //改变数据
    obj.changeData = function() {
        var _inputElement = document.querySelector("#" + this._elementId + " .answerPart input");

        obj._answerList[this._thisQuestionIndex - 1] = _inputElement.value;  //存储数据
        _inputElement.value = "";                                            //清空输入框
        this._thisQuestionIndex ++;                                         //当前问题编号增加
    };
    //改变样式
    obj.changeStyle = function() {
        //如果问答结束，则执行用户定义的结束函数
        //否则改变问题位置
        if(this._thisQuestionIndex > this._allQuestionCount) this._endFunction(obj._answerList);
        else{
            var baseEle = document.getElementById(this._elementId);
            baseEle.querySelector(".questionPart span").style.marginTop = ((this._thisQuestionIndex - 1) * -50) + "px";               //改变问题位置
            baseEle.querySelector(".progressLine span").style.width = (this._thisQuestionIndex * 100 / this._allQuestionCount) + "%";//改变进度条
            baseEle.querySelector(".progressNumber").innerText = this._thisQuestionIndex + "/" + this._allQuestionCount;             //改变进度数字

            baseEle.querySelector(".answerPart input").focus();                    //输入框获得焦点
        }
    };

    (function init(_this) {
        //组织问题字符串
        var _questionStr = "";
        _this._questionList.forEach(function(value){
            _questionStr += "<label>" + value + "</label>";
        });

        //创建元素
        document.getElementById(_this._elementId).innerHTML =
            "<div class='questionPart'><span style='margin-top: " + ((this._thisQuestionIndex - 1) * -50) + "px'>" + _questionStr + "</span></div>" +
            "<div class='answerPart'><input><button></button></div>" +
            "<div class='progressPart'>" +
            "   <div class='progressLine'><span style='width: " + (_this._thisQuestionIndex * 100 / _this._allQuestionCount) + "%;'></span></div>" +
            "   <label class='errorText'></label>" +
            "   <label class='progressNumber'>" + _this._thisQuestionIndex + "/" + _this._allQuestionCount + "</label>" +
            "</div>";

        //加入点击事件
        document.getElementById(_this._elementId).getElementsByTagName("button")[0].onclick = function(e) { _this.nextClickFunction(e); };
        document.getElementById(_this._elementId).querySelector(".answerPart input").focus();
    })(obj);

    return obj;
};