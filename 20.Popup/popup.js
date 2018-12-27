/// 基础样式
//入
$(".J-button").click(function() {
    var _id = this.dataset.index;
    $(".overlay").addClass("overlay_" + _id);
    setTimeout(function() {
        $(".overlay").addClass("open");
        $(".overlay_Div button").get(0).onclick = function(){ closeFunction(_id, $(".overlay")); };
    }, 500);
});
//出
function closeFunction(_id, baseEle) {
    $(baseEle).addClass("close");
    $(baseEle).removeClass("open");

    setTimeout(function() {
        $(baseEle).removeClass("close");
        $(baseEle).removeClass("overlay_" + _id);
    }, 500);
}

/// --------------------------------------------------------------------------------------------------

/// 掉落
//入
$(".J-drop").click(function() {
    $("body").addClass("body_drop");

    setTimeout(function() {
        $(".overlay").addClass("open");
        $(".overlay_Div button").get(0).onclick = function(){ closeDropFunction(); };
    }, 100);
});
//出
function closeDropFunction() {
    $(".overlay").removeClass("open");
    $(".overlay").addClass("close");

    setTimeout(function() {
        $(".overlay").removeClass("close");
        $(".body_drop").removeClass("body_drop");
    }, 500);
}