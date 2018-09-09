var Racing = {
    baseCanvas: "clock1", //canvas的id
    context: null,
    size: {
        height: 600,
        width: 330
    },

    init: function () {
        var dom = document.getElementById(this.baseCanvas);
        this.context = dom.getContext("2d");
        dom.setAttribute("height", this.size.height);
        dom.setAttribute("width", this.size.width);
        dom.style.backgroundColor = "#494a5f";

        setInterval(function(){
            var time = new Date();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            Racing.timeInterval(hour, minute, second);
        }, 1000);
    },

    //定时器事件
    timeInterval: function(hour, minute, second) {
        var context = this.context;
        context.clearRect(0, 0, this.size.width, this.size.height);    //清空区域

        //画表盘
        this.drawCircle(context, this.size.width / 2, this.size.width / 2, this.size.width / 2 - 15, "white");
        this.drawCircle(context, this.size.width / 2, this.size.width / 2, this.size.width / 2 - 30, "#e0e0e0");
        this.drawCircle(context, this.size.width / 2, this.size.width / 2, 80, "white");
        this.drawCircle(context, this.size.width / 2, this.size.width / 2, 30, "#46a0ff");
        this.drawCircle(context, this.size.width / 2, this.size.width / 2, 7, "#857155");
        for(var i = 0; i < 60; i++){
            if(i % 5 == 0) {
                this.drawLine(context, this.size.width / 2, this.size.width / 2, this.size.width / 2 -  30, 15, 3, Math.PI * i / 30, "#46a0ff");
                this.drawLine(context, this.size.width / 2, this.size.width / 2, 80, this.size.width / 2 - 110, 3, Math.PI * i / 30, "white");
            }
            else this.drawLine(context, this.size.width / 2, this.size.width / 2, this.size.width / 2 - 25, 10, 1, Math.PI * i / 30, "#46a0ff");
        }

        //画表针
        var newHour = (hour > 12)? hour - 12: hour;
        var hourRangle = ((newHour * 3600 + minute * 60 + second) - 10800) * Math.PI / 21600;
        this.drawNeedle(context, this.size.width / 2, this.size.width / 2, 50, hourRangle, "#fc9a13");
        var minuteRangle = ((minute * 60 + second) - 900) * Math.PI / 1800;
        this.drawNeedle(context, this.size.width / 2, this.size.width / 2, this.size.width / 2 - 70, minuteRangle, "#fc9a13");
        var secondRangle = (second - 15) * Math.PI / 30;
        this.drawNeedle(context, this.size.width / 2, this.size.width / 2, this.size.width / 2 - 50, secondRangle, "#fc9a13");

        //画中心点和文字
        this.drawCircle(context, this.size.width / 2, this.size.width / 2, 2, "#857155");
        var text = (hour > 12)? "PM": "AM";
        this.drawText(context, this.size.width / 2 + 40, this.size.width / 2 + 10, text, "20px Courier New", "#fc9a13");

        this.drawText(context, this.size.width / 4 - 18, this.size.width + 40, hour, "30px Courier New", "black");
        this.drawSector(context, this.size.width / 4, this.size.width + 30, hour, 24, "#fc9a13");
        this.drawText(context, this.size.width * 2 / 4 - 18, this.size.width + 40, minute, "30px Courier New", "black");
        this.drawSector(context, this.size.width * 2 / 4, this.size.width + 30, minute, 60, "#46a0ff");
        this.drawText(context, this.size.width * 3 / 4 - 18, this.size.width + 40, second, "30px Courier New", "black");
        this.drawSector(context, this.size.width * 3 / 4, this.size.width + 30, second, 60, "#FFF");

        this.context = context;
    },

    ///画圆盘
    /// context：画布
    /// pointX ：中心点坐标X
    /// pointY ：中心点坐标Y
    /// r  ：半径
    /// color : 颜色
    drawCircle: function (context, pointX, pointY, r, color){
        context.save();

        context.translate(pointX, pointY);   //修改中心点坐标
        context.beginPath();
        context.arc(0, 0, r, 0, Math.PI * 2, false);//创建圆
        context.strokeStyle = color;
        context.stroke();
        context.fillStyle = color;
        context.fill();

        context.restore();//恢复上次保存的状态
    },
    ///画线
    /// context：画布
    /// pointX ：中心点坐标X
    /// pointY ：中心点坐标Y
    /// r  ：半径
    /// length ：长度
    /// width  ：宽度
    /// rangle ：旋转角度
    /// color : 颜色
    drawLine: function (context, pointX, pointY, r, length, width, rangle, color){
        context.save();

        context.translate(pointX, pointY);   //修改中心点坐标
        context.rotate(rangle);
        context.beginPath();
        context.moveTo(r, 0);
        context.lineTo(r + length, 0);
        context.strokeStyle = color;
        context.lineWidth = width;
        context.stroke();

        context.restore();//恢复上次保存的状态
    },
    ///画指针
    /// context：画布
    /// pointX ：中心点坐标X
    /// pointY ：中心点坐标Y
    /// length ：长度
    /// rangle ：旋转角度
    /// color : 颜色
    drawNeedle: function (context, pointX, pointY, length, rangle, color){
        context.save();

        context.translate(pointX, pointY);   //修改中心点坐标
        context.rotate(rangle);
        context.strokeStyle = color;
        context.lineWidth = 0.1;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(0, 3);
        context.lineTo(length, 0);
        context.lineTo(0, -3);
        context.lineTo(-10, 0);
        context.lineTo(0, 3);
        context.stroke();
        context.fill();

        context.restore();//恢复上次保存的状态
    },
    ///画文字
    /// context：画布
    /// pointX ：中心点坐标X
    /// pointY ：中心点坐标Y
    /// text  ：文字
    /// fontSize  ：文字样式
    /// color : 颜色
    drawText: function (context, pointX, pointY, text, fontSize, color){
        context.save();

        context.beginPath();
        context.fillStyle = color;
        context.font = fontSize;
        context.fillText(text, pointX, pointY, 50);

        context.restore();
    },
    ///画文字
    /// context：画布
    /// pointX ：中心点坐标X
    /// pointY ：中心点坐标Y
    /// text  ：文字
    /// maxText  ：最大值
    /// color : 颜色
    drawSector: function (context, pointX, pointY, text, maxText, color){
        context.save();

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 10;
        context.arc(pointX, pointY, 30, (-1 * Math.PI / 2), (text * 2 / maxText - 1 / 2) * Math.PI, false);
        context.stroke();

        context.restore();
    },
};
Racing.init();