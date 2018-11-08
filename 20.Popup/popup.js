/// 从上往下滚入，从上往下滚出
//滚入
$(".scale").click(function() {
    $(".overlay").addClass("overlay_scale");
    setTimeout(function() {
        $(".overlay").addClass("open");
        $(".overlay_Div button").get(0).onclick = scaleFunction;
    }, 300);
});
//滚出
function scaleFunction() {
    $(this).parents(".overlay_Div").addClass("close");
    $(this).parents(".overlay_Div").removeClass("open");

    setTimeout(function() {
        $(".overlay_Div").removeClass("close");
        $(".overlay_scroll1").removeClass("overlay_scroll1");
    }, 500);
}

/// --------------------------------------------------------------------------------------------------
