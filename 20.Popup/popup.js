/// 从上往下滚入，从上往下滚出
//滚入
$(".scale").click(function() {
    $(".overlay").addClass("overlay_scale");
    setTimeout(function() {
        $(".overlay").addClass("open");
        $(".overlay_Div button").get(0).onclick = scaleFunction;
    }, 500);
});
//滚出
function scaleFunction() {
    $(this).parents(".overlay_scale").addClass("close");
    $(this).parents(".overlay_scale").removeClass("open");

    setTimeout(function() {
        $(".overlay_scale").removeClass("close");
        $(".overlay_scale").removeClass("overlay_scale");
    }, 500);
}

/// --------------------------------------------------------------------------------------------------
