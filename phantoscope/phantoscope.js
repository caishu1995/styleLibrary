var Phantoscope = function(canvasId, direction) {
    this.canvasId = canvasId;  //存储画布的id
    this.context = null;      //画布的2d对象
    this.rects = [];           //用来存储方块
    this.direction = {
        ///旋转方向，true顺时针，false逆时针
        userDirection: (direction == undefined) ? true: direction,
        ///顺时针
        clockwise: {
            ///创建方块
            createBlock: function () {
                return {
                    angle: 0,     //角度
                    color:"rgb(" + getRandom() + "," + getRandom() + "," + getRandom() + ")", //颜色
                    length: 150, //距离中心点的长度
                    scale: 1     //大小
                };
            },
            ///修改方块信息
            changeBlockData: function (rects, index) {
                rects[index].scale = ((rects[index].scale - 0.001) <= 0.01) ? 0.01: (rects[index].scale - 0.001);

                rects[index].length -= 0.05;
                if(rects[index].length <= 0){ rects.splice(index,1); return; }

                rects[index].angle = ((rects[index].angle + 2) >= 360) ? (rects[index].angle - 358): (rects[index].angle + 2);
            }
        },
        ///逆时针
        anticlockwise: {
            ///创建方块
            createBlock: function () {
                return {
                    angle: 0,     //角度
                    color:"rgb(" + getRandom() + "," + getRandom() + "," + getRandom() + ")", //颜色
                    length: 0, //距离中心点的长度
                    scale: 0.01     //大小
                };
            },
            ///修改方块信息
            changeBlockData: function (rects, index) {
                rects[index].scale = ((rects[index].scale + 0.002) >= 1) ? 1: (rects[index].scale + 0.002);

                rects[index].length += 0.25;
                if(rects[index].length >= 140){ rects.splice(index,1); return; }

                rects[index].angle = ((rects[index].angle - 2) <= 0) ? (358 + rects[index].angle): (rects[index].angle - 2);
            }
        }
    };

    this.init = function() {
        this.context = document.getElementById(this.canvasId).getContext("2d");
        this.context.translate(250, 300);             //修改中心点坐标

        var that = this;
        //重新绘制画布信息
        setInterval(function() {
            var context = that.context;
            context.clearRect(-250, -300, 500, 600); //清空内容

            for(var i = 0; i < that.rects.length; i++){
                redrawBlock(that.rects[i], context);

                if(that.direction.userDirection) that.direction.clockwise.changeBlockData(that.rects, i);
                else that.direction.anticlockwise.changeBlockData(that.rects, i);
            }

            that.context = context;
        }, 60);
        //初始化方块
        setInterval(function() {
            if(that.direction.userDirection) that.rects.push(that.direction.clockwise.createBlock());
            else that.rects.push(that.direction.anticlockwise.createBlock());
        }, 500); //每秒生成方块
    };


    //生成随机数
    function getRandom(){
        return Math.floor( Math.random() * 255 );
    }

    ///重绘方块内容
    function redrawBlock(rect, context) {
        context.save();

        context.scale(rect.scale, rect.scale);      //放大缩小
        context.rotate(rect.angle * Math.PI / 180); //旋转

        context.fillStyle = rect.color;   //设置填充颜色
        context.fill();                   //填充
        context.fillRect(rect.length, rect.length, 50, 50); //画矩形

        //恢复上次保存的状态，如果不恢复，其他方块就会在此基础上变位
        context.restore();
    }
};