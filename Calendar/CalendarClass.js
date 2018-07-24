function CalendarClass(DOMId) {
    this.dataList = null;             //数据集合
    this.GetMonthDataFunction = null; //每次改变月份时获得数据的函数，参数 year 年 month 月，返回 该月的数据内容

    this.DOMId = DOMId;                //对应dom结构id
    this.year = -1;                    //查看的年
    this.month = -1;                   //查看的月
    this.selectedDate = -1;            //选择的日期


    /*--  初始化  --*/
    ///初始化
    this.init = function() {
        this.initData();  //初始化数据
        initDOM(this.year, this.month, this.dataList, this.DOMId); //创建页面内容
        this.selectedDate = parseInt(document.getElementById(this.DOMId).getElementsByClassName("thisDay")[0].innerText);//获得选中的日期
        document.getElementById(DOMId).MySetObj = this;              //将DOM通过MySetObj方式获得本对象
    };
    ///初始化数据
    this.initData = function(){
        //获得年月
        var thisDate = new Date();
        this.year = thisDate.getFullYear();
        this.month = parseInt(thisDate.getMonth()) + 1;

        //获得数据并存储
        if(typeof(this.GetMonthDataFunction) == "function"){
            this.dataList = this.GetMonthDataFunction(this.year, this.month);
        }
    };
    ///初始化界面
    ///year     ：年
    ///month    ：月
    ///dataList ：数据内容
    ///DOMId    : 需追加的DOM的id
    function initDOM(year, month, dataList, DOMId){
        ///创建内容
        var baseDiv = document.createElement("div");
        baseDiv.className = "calendarShow normalDay";
        document.getElementById(DOMId).appendChild(baseDiv);

        //左侧
        baseDiv.appendChild(initLeftPart(year, month, dataList));

        //右侧
        var index = document.getElementById(DOMId).getElementsByClassName("thisDay")[0].dataset.index;//找到index
        baseDiv.appendChild(initRightPart(dataList[index]));          //右侧
    }


    /*--  事件集合  --*/
    ///日期点击事件
    this.dayOnClickFunction = function(thisEle){
        //改变左侧内容
        this.selectedDate = thisEle.innerText; //改变选中的日
        var selected = document.getElementById(this.DOMId).getElementsByClassName("selectedDate");
        if(selected.length)
            selected[0].classList.remove("selectedDate"); //移除原选中
        thisEle.classList.add("selectedDate");         //给当前点击内容加样式，表示选中

        //改变右侧内容
        var rightPart = document.getElementById(DOMId).getElementsByClassName("calendarRightShow")[0];
        var basePart = rightPart.parentNode;
        basePart.removeChild(rightPart);
        basePart.appendChild(initRightPart(this.dataList[thisEle.dataset.index]));
    };
    ///上一年、下一年、上一月、下一月点击事件
    ///control : 1-1 上一年； 1+1 下一年； 2-1 上一月； 2+1 下一月；A*B A为年 B为月
    this.yearAndMonthControlFunction = function(thisEle, control){
        //根据是增加还是减，控制年月份改变
        if(control == "1-1"){
            this.year--;
            thisEle.nextElementSibling.value = this.year;//改变年展示内容
        } else if(control == "1+1"){
            this.year++;
            thisEle.previousElementSibling.value = this.year;//改变年展示内容
        } else if(control == "2-1"){
            //考虑是否跨年
            if(this.month > 1)
                this.month--;
            else if(this.month == 1){
                this.year--;
                this.month = 12;
            }

            thisEle.parentNode.previousElementSibling.children[1].value = this.year;//改变年展示内容
            thisEle.nextElementSibling.value = this.month;//改变月展示内容
        } else if(control == "2+1"){
            //考虑是否跨年
            if(this.month < 12)
                this.month++;
            else if(this.month == 12){
                this.year++;
                this.month = 1;
            }

            thisEle.parentNode.previousElementSibling.children[1].value = this.year;//改变年展示内容
            thisEle.previousElementSibling.value = this.month;//改变月展示内容
        } else {
            var list = control.split('*');
            if(list.length == 2){
                this.year = list[0];
                this.month = list[1];
            }

            thisEle.parentNode.parentNode.parentNode.childNodes[0].children[1].value = this.year;//改变年展示内容
            thisEle.parentNode.parentNode.parentNode.childNodes[2].children[1].value = this.month;//改变月展示内容
        }


        //改变数据
        if(typeof(this.GetMonthDataFunction) == "function"){
            this.dataList = this.GetMonthDataFunction(this.year, this.month);
        }

        ///改变表格内容
        var left = thisEle.parentNode.parentNode.nextElementSibling.nextElementSibling;
        //删除之前数据
        while(left.getElementsByClassName("dateUl").length){
            left.removeChild(left.getElementsByClassName("dateUl")[0]);
        }
        //创建新数据
        initLeftTableContent(this.dataList, left, this.selectedDate);

        ///改变右侧内容
        var rightPart = document.getElementById(DOMId).getElementsByClassName("calendarRightShow")[0];
        var basePart = rightPart.parentNode;
        basePart.removeChild(rightPart);
        for(var i = 0; i < this.dataList.length; i++){
            if(this.dataList[i].DAY == this.selectedDate) basePart.appendChild(initRightPart(this.dataList[i]));
        }
    };


    /*--  左侧展示区 --*/
    ///创建左侧区域
    ///year     ：年
    ///month    ：月
    ///dataList ：数据内容
    ///返回     ：创建好的元素
    function initLeftPart(year, month, dataList) {
        var baseDiv = document.createElement("div");
        baseDiv.className = "calendarLeftShow";

        baseDiv.appendChild(initLeftSelectPart(year, month)); //查询区
        baseDiv.appendChild(document.createElement("hr"));    //hr
        baseDiv.appendChild(initLeftTable(dataList));         //表格区

        return baseDiv;
    }
    ///创建查询区域
    ///year ：年
    ///month：月
    ///返回 ：创建好的元素
    function initLeftSelectPart(year, month) {
        var baseDiv = document.createElement("div");
        baseDiv.className = "calendarLeftHeader";

        //年选择区
        var div = document.createElement("div");
        div.className = "calendarLeftSelect";
        var label1 = document.createElement("label");
        label1.className = "prevYear";
        label1.innerText = "<";
        label1.onclick = function(ev) {
            var thisObj = this.parentNode.parentNode.parentNode.parentNode.parentNode.MySetObj;
            thisObj.yearAndMonthControlFunction(this, "1-1");
        };
        div.appendChild(label1);
        var select2 = document.createElement("select");
        select2.className = "thisYear";
        select2.innerHTML = "<option value='2010'>2010年</option><option value='2011'>2011年</option><option value='2012'>2012年</option><option value='2013'>2013年</option><option value='2014'>2014年</option><option value='2015'>2015年</option><option value='2016'>2016年</option><option value='2017'>2017年</option><option value='2018'>2018年</option><option value='2019'>2019年</option><option value='2020'>2020年</option>";
        select2.onchange = function(ev) {
            var thisObj = this.parentNode.parentNode.parentNode.parentNode.parentNode.MySetObj;
            thisObj.yearAndMonthControlFunction(this, this.value + "*" + this.parentNode.nextElementSibling.children[1].value);
        };
        select2.value = year;
        div.appendChild(select2);
        var label3 = document.createElement("label");
        label3.className = "nextYear";
        label3.innerText = ">";
        label3.onclick = function(ev) {
            var thisObj = this.parentNode.parentNode.parentNode.parentNode.parentNode.MySetObj;
            thisObj.yearAndMonthControlFunction(this, "1+1");
        };
        div.appendChild(label3);
        baseDiv.appendChild(div);

        //月选择区
        var div = document.createElement("div");
        div.className = "calendarLeftSelect";
        var label1 = document.createElement("label");
        label1.className = "prevMonth";
        label1.innerText = "<";
        label1.onclick = function(ev) {
            var thisObj = this.parentNode.parentNode.parentNode.parentNode.parentNode.MySetObj;
            thisObj.yearAndMonthControlFunction(this, "2-1");
        };
        div.appendChild(label1);
        var select2 = document.createElement("select");
        select2.className = "thisMonth";
        select2.innerHTML = "<option value='1'>一月</option><option value='2'>二月</option><option value='3'>三月</option><option value='4'>四月</option><option value='5'>五月</option><option value='6'>六月</option><option value='7'>七月</option><option value='8'>八月</option><option value='9'>九月</option><option value='10'>十月</option><option value='11'>十一月</option><option value='12'>十二月</option>";
        select2.value = month;
        select2.onchange = function(ev) {
            var thisObj = this.parentNode.parentNode.parentNode.parentNode.parentNode.MySetObj;
            thisObj.yearAndMonthControlFunction(this, this.parentNode.previousElementSibling.children[1].value + "*" + this.value);
        };
        div.appendChild(select2);
        var label3 = document.createElement("label");
        label3.className = "nextMonth";
        label3.innerText = ">";
        label3.onclick = function(ev) {
            var thisObj = this.parentNode.parentNode.parentNode.parentNode.parentNode.MySetObj;
            thisObj.yearAndMonthControlFunction(this, "2+1");
        };
        div.appendChild(label3);
        baseDiv.appendChild(div);

        return baseDiv;
    }
    ///创建表格展示区域
    ///dataList ：数据列表
    ///返回     ：创建好的元素
    function initLeftTable(dataList) {
        var baseDiv = document.createElement("div");
        baseDiv.className = "calendarLeftContent";
        //标题
        var titleHTML = '<ul class="titleUl"><li class="week"></li><li class="sun">日</li><li class="mon">一</li><li class="tue">二</li><li class="wed">三</li><li class="thur">四</li><li class="fri">五</li><li class="sat">六</li></ul>';
        baseDiv.innerHTML = titleHTML;
        initLeftTableContent(dataList, baseDiv, -1);
        return baseDiv;
    }
    ///创建表格展示区域，并追加
    ///dataList ：数据列表
    ///baseDiv  ：父级元素
    ///selectDay：选中的天
    function initLeftTableContent(dataList, baseDiv, selectDay) {
        var lastWeek = -1;     //上个记录的周
        var ul = null;

        for(var i = 0; i < dataList.length; i++){
            //根据周数不同，创建ul
            if(lastWeek != dataList[i].WEEK){
                if(lastWeek != -1) baseDiv.appendChild(ul); //如果不是第一次，则追加ul

                lastWeek = dataList[i].WEEK; //记录周

                //创建新的ul,并追加周的li
                ul = document.createElement("ul");
                ul.className = "dateUl";
                var li = document.createElement("li");
                li.className = "week";
                li.innerText = dataList[i].WEEK;
                ul.appendChild(li);
            }

            //转换周日为0
            var thisWeekday = dataList[i].WEEKDAY;
            if(thisWeekday == 7) thisWeekday = 0;

            //判断1号前面有几个空格
            if(i == 0){
                if(thisWeekday > 0) { var li = document.createElement("li"); li.className = "sun noneDate"; ul.appendChild(li);}
                if(thisWeekday > 1) { var li = document.createElement("li"); li.className = "mon noneDate"; ul.appendChild(li);}
                if(thisWeekday > 2) { var li = document.createElement("li"); li.className = "tue noneDate"; ul.appendChild(li);}
                if(thisWeekday > 3) { var li = document.createElement("li"); li.className = "wed noneDate"; ul.appendChild(li);}
                if(thisWeekday > 4) { var li = document.createElement("li"); li.className = "thur noneDate"; ul.appendChild(li);}
                if(thisWeekday > 5) { var li = document.createElement("li"); li.className = "fri noneDate"; ul.appendChild(li);}
            }

            ///增加信息
            var li = document.createElement("li");
            li.dataset.index = i;
            li.innerText = dataList[i].DAY;
            //判断周几
            switch (thisWeekday){
                case 0: li.className="sun"; break;
                case 1: li.className="mon"; break;
                case 2: li.className="tue"; break;
                case 3: li.className="wed"; break;
                case 4: li.className="thur"; break;
                case 5: li.className="fri"; break;
                case 6: li.className="sat"; break;
            }
            //判断是不是当天
            var isToday = "";
            var date = new Date();
            if((dataList[i].YEAR == date.getFullYear()) && (dataList[i].MONTH == (parseInt(date.getMonth()) + 1)) && (dataList[i].DAY == date.getDate())) isToday = " thisDay";
            li.className += " hasDate" + isToday;
            //判断是不是默认天
            if((selectDay != -1) && (selectDay == dataList[i].DAY)) li.className += " selectedDate";
            li.onclick = function() {
                //创建右侧内容
                var thisObj = this.parentNode.parentNode.parentNode.parentNode.parentNode.MySetObj;
                thisObj.dayOnClickFunction(this);
            };
            ul.appendChild(li);

            //判断最后一天后面有几个空格
            if(i == (dataList.length - 1)){
                if(thisWeekday < 1) { var li = document.createElement("li"); li.className = "mon noneDate"; ul.appendChild(li);}
                if(thisWeekday < 2) { var li = document.createElement("li"); li.className = "tue noneDate"; ul.appendChild(li);}
                if(thisWeekday < 3) { var li = document.createElement("li"); li.className = "wed noneDate"; ul.appendChild(li);}
                if(thisWeekday < 4) { var li = document.createElement("li"); li.className = "thur noneDate"; ul.appendChild(li);}
                if(thisWeekday < 5) { var li = document.createElement("li"); li.className = "fri noneDate"; ul.appendChild(li);}
                if(thisWeekday < 6) { var li = document.createElement("li"); li.className = "sat noneDate"; ul.appendChild(li);}
            }
        }
        baseDiv.appendChild(ul);
    }


    /*--  右侧展示区  --*/
    ///data：数据
    ///返回：创建的右侧的DOM内容
    function initRightPart(data){
        var baseDiv = document.createElement("div");
        baseDiv.className = "calendarRightShow";

        baseDiv.innerHTML = changeRightPart(data); //修改右侧内容

        return baseDiv;
    }
    ///修改右侧展示内容
    ///data：数据
    ///返回：右侧的innerHTML
    function changeRightPart(data) {
        return "<div class=\"calendarRightRow\"><label class=\"calendarRightDate\">" + data.date + "</label>&nbsp;<label class=\"calendarRightDayOfWeek\">" + data["星期"] + "</label></div><div class=\"calendarRightDayRow\"><div class=\"calendarRightDayShow\">" + data.DAY + "</div></div><div class=\"calendarRightRow\"><label class=\"calendarRightLunarDate\">" + data["农历日期"] + "</label></div><div class=\"calendarRightRow\"><label class=\"calendarRightSolarTermDate\">" + data["农历节气"] + "</label></div>";
    }
}
