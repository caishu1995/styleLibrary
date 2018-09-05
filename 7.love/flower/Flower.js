var Flower = function(canvasId, direction) {
    this.canvasId = canvasId;  //存储画布的id
    this.context = null;      //画布的2d对象
    this.rects = [];           //用来存储方块

    this.init = function() {
        this.context = document.getElementById(this.canvasId).getContext("2d");
        this.context.translate(200, 200);             //修改中心点坐标

        var that = this;
        // 重新绘制画布信息
        setInterval(function() {
            var context = that.context;
            context.clearRect(-200, -200, 400, 400); //清空内容

            for(var i = 0; i < that.rects.length; i++){
                redrawBlock(that.rects[i], context);
                changeBlockData(that.rects, i);
            }

             that.context = context;
        }, 200);
        // 初始化块
        setInterval(function() {
            that.rects.push({
                angle: 0,     //角度
                color:"rgb(" + getRandom() + ",0,0)", //颜色
                length: 70, //距离中心点的长度
                scale: 0.2     //大小
            });
        }, 200); //每秒生成方块
    };


    //生成随机数
    function getRandom(){
        //排除过于黑色的情况
        return (Math.floor( Math.random() * 160 ) + 95);
    }

    ///重绘块内容
    function redrawBlock(rect, context) {
        context.save();
        context.rotate(rect.angle * Math.PI / 180); //旋转
        context.scale(rect.scale, rect.scale);      //放大缩小

        context.beginPath();
        context.moveTo(0,0);
        context.strokeStyle = rect.color;   //设置边线颜色

        var point1X = rect.length / ( 2 * Math.cos(15)) * Math.sin(-15);
        var point1Y = rect.length / ( 2 * Math.cos(15)) * Math.cos(-15);
        context.quadraticCurveTo(point1X, point1Y, 0, rect.length); //画线

        context.moveTo(0, rect.length);
        var point3X = rect.length / ( 2 * Math.cos(15)) * Math.sin(15);
        var point3Y = rect.length / ( 2 * Math.cos(15)) * Math.cos(15);
        context.quadraticCurveTo(point3X, point3Y, 0, 0); //画线

        context.fillStyle = rect.color;   //设置填充颜色
        context.fill();
        context.stroke();

        //恢复上次保存的状态，如果不恢复，其他方块就会在此基础上变位
        context.restore();
    }

    ///修改块信息
    function changeBlockData(rects, index) {
        //角度
        rects[index].angle += 45;
        if(rects[index].angle > 360){
            rects[index].angle -= 360;

            //长度
            rects[index].length += 20;
            if(rects[index].length >= 180){ rects.splice(index,1); return; }

            rects[index].scale = ((rects[index].scale + 0.2) >= 1) ? 1: (rects[index].scale + 0.2); //大小
        }
    }
};


var Heart = function() {
    //生成随机数
    function getRandom(size){
        return Math.floor( Math.random() * size );
    }


    this.init = function() {
        for(var i = 0; i < 10; i++){
            var _div = document.createElement("div");
            _div.className="h_love_heart";
            _div.style.left = getRandom(document.body.clientWidth - 50) + "px";
            _div.style.top = getRandom(document.body.clientHeight - 50) + "px";
            _div.innerHTML = "<svg  viewBox='0 0 32 32'><path d='M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z'></path></svg>";
            var _rotate = getRandom(360);
            $(_div).css("-ms-transform", "rotate(" + _rotate + "deg) scale(0.2)");
            $(_div).css("-moz-transform", "rotate(" + _rotate + "deg) scale(0.2)");
            $(_div).css("-webkit-transform", "rotate(" + _rotate + "deg) scale(0.2)");
            $(_div).css("-o-transform", "rotate(" + _rotate + "deg) scale(0.2)");
            $(_div).css("transform", "rotate(" + _rotate + "deg) scale(0.2)");
            $("body").append(_div);
        }
    };
    this.init();
};