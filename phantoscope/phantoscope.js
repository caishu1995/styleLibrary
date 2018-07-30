var Phantoscope = function(canvasId) {
    this.canvasId = canvasId;  //存储画布的id
    this.context = null;      //画布的2d对象
    this.rects = [];           //用来存储方块

    this.init = function() {
        this.context = document.getElementById(this.canvasId).getContext("2d");
        this.context.translate(200, 200);             //修改中心点坐标

        var that = this;
        //重新绘制画布信息
        setInterval(function() {
            var context = that.context;
            context.clearRect(-200, -200, 400, 500); //清空内容

            for(var i = 0; i < that.rects.length; i++){
                context.save();

                context.scale(that.rects[i].scale, that.rects[i].scale);//放大缩小
                context.rotate(that.rects[i].angle * Math.PI / 180);    //旋转

                context.fillStyle = that.rects[i].color;   //设置填充颜色
                context.fill();                            //填充
                context.fillRect(that.rects[i].length, that.rects[i].length, 50, 50); //画矩形

                //恢复上次保存的状态，如果不恢复，其他方块就会在此基础上变位
                context.restore();
            }

            that.context = context;
        }, 60);
        //初始化方块
        setInterval(function() {
            that.rects.push({
                angle: 0,     //角度
                color:"rgb(" + getRandom() + "," + getRandom() + "," + getRandom() + ")", //颜色
                length: 150, //距离中心点的长度
                scale: 1     //大小
            })
        }, 1000); //每秒生成方块
        //修改方块信息
        setInterval(function() {
            var rects = that.rects;
            for ( var i = 0; i < rects.length; i++) {
                rects[i].length = rects[i].length - 0.2;
                if(rects[i].length <= 0){
                    rects.splice(i,1);
                    continue;
                }

                rects[i].scale = rects[i].scale - 0.002;
                if(rects[i].scale <= 0.2){
                    rects[i].scale = 0.2;
                }

                rects[i].angle = rects[i].angle + 2;
                if(rects[i].angle >= 360){
                    rects[i].angle = rects[i].angle - 360;
                }
            }
            that.rects = rects;
        }, 60);
    };

    //生成随机数
    function getRandom(){
        return Math.floor( Math.random() * 255 );
    }
};