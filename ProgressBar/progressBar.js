function ProgressBar(baseDomID) {
    this.progressBarVersion = "2017.1214";
    this.userSet_domID = baseDomID;

    //初始化进度条
    this.init = function(){
        document.getElementById(this.userSet_domID).innerHTML = getProgressBarHTML();
    };
    this.init();

    //获得初始化的字符串
    function getProgressBarHTML() {
        var str = "<div class='progressAll'><div class='progressThis'><p></p><div class='progressError'></div></div></div>";
        return str;
    }

    ///修改进度条的进度
    ///hasSendCount ：已经发送的总数
    ///hasErrorCount：出错的总数
    ///allCount     ：总数
    this.changeProgressBarWidth = function(hasSendCount, hasErrorCount, allCount) {
        var allPercent = 0;
        var errorPercent = 0;

        //计算总上传比例
        if(allCount == 0) allPercent = 0;
        else allPercent = parseInt((hasSendCount * 100 * 100) / allCount) / 100;

        //如果最后一个文件未传完，不能到达100
        if ((hasSendCount < allCount) && (allPercent > 99.99)) allPercent = 99.99;

        //计算上传错误比例
        if(hasSendCount == 0) errorPercent = 0;
        else errorPercent = parseInt((hasErrorCount * 100 * 100) / hasSendCount) / 100;

        //改变宽度
        document.getElementById(this.userSet_domID).getElementsByClassName("progressThis")[0].style.width = allPercent + '%';     //改总宽度
        document.getElementById(this.userSet_domID).getElementsByTagName("p")[0].innerText = allPercent + '%';                    //改文字
        document.getElementById(this.userSet_domID).getElementsByClassName("progressError")[0].style.width = errorPercent + '%';  //改错误宽度
    }
}