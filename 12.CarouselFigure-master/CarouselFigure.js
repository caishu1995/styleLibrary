(function (exports) {
    exports.$carouselFigure = {
        "index": 0,        //选中的序号
        "liHeight": 227,   //每个li高度
        "serVal" : -1,     //定时器
        "Id": "",          //对应的id号

        //创建元素
        "init": function(dataList, id) {
            //创建左侧
            var leftDiv = document.createElement("div");
            leftDiv.className = "leftDiv";
            var ul = document.createElement("ul");
            for(var i = 0; i < dataList.length; i++){
                var li = document.createElement("li");
                li.innerHTML = "<img data-href=" + dataList[i].hrefTo + " data-show=" + dataList[i].systemName + " src=" + dataList[i].srcFrom + " />";
                li.onclick = function(){
                    //更改滚动的位置
                    $carouselFigure.index = $(this).parent().children().index(this);
                    var lastTop = $carouselFigure.index * $carouselFigure.liHeight;
                    $(this).parent().scrollTop(lastTop);

                    $carouselFigure.showPic($carouselFigure.index);   //选中当前

                    //重置自动轮播的定时器
                    clearInterval($carouselFigure.serVal);
                    $carouselFigure.serVal = setInterval($carouselFigure.setIntervalAction, 2000);
                }; //点击后右侧展示
                ul.appendChild(li);
            }
            leftDiv.appendChild(ul);
            document.getElementById(id).appendChild(leftDiv);

            //创建右侧
            var rightDiv = document.createElement("div");
            rightDiv.className = "rightDiv";
            rightDiv.innerHTML = "<div class=\"rightImgClass\"><img /><div><p></p><button><a target=\"_blank\">进入</a></button></div></div>";
            document.getElementById(id).appendChild(rightDiv);

            $carouselFigure.Id = id;
            $carouselFigure.showPic(0);        //默认选中第一个
            $carouselFigure.serVal = setInterval($carouselFigure.setIntervalAction, 2000);
        },

        ///展示右侧内容
        ///index: 当前选中的序号
        "showPic": function (index){
            var selectNode = $("#" + $carouselFigure.Id + " .leftDiv li").get(index);
            //移除之前选中
            while($("#" + $carouselFigure.Id + " .leftDiv .selectLi").length){
                $("#" + $carouselFigure.Id + " .leftDiv .selectLi").get(0).classList.remove("selectLi");
            }
            selectNode.classList.add("selectLi");                             //左侧改颜色

            var selectNodeImg = $(selectNode).children("img").get(0);
            $("#" + $carouselFigure.Id + " .rightDiv img").attr("src", selectNodeImg.src);			//图片路径
            $("#" + $carouselFigure.Id + " .rightDiv p").text(selectNodeImg.dataset.show);	        //展示的文字
            $("#" + $carouselFigure.Id + " .rightDiv a").attr("href", selectNodeImg.dataset.href);	//超链接
        },

        ///自动轮播的函数
        "setIntervalAction": function (){
            $carouselFigure.index++;//更改选中的内容
            $("#" + $carouselFigure.Id + " .leftDiv ul").scrollTop($carouselFigure.index * $carouselFigure.liHeight);

            //如果超界，则回到第一个
            if($carouselFigure.index == $("#" + $carouselFigure.Id + " .leftDiv li").length){
                $carouselFigure.index = 0;
                $("#" + $carouselFigure.Id + " .leftDiv ul").scrollTop(0);
            }

            $carouselFigure.showPic($carouselFigure.index);//选中当前
        }
    };
})(this);