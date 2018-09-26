/// jQuery 淡入淡出
//淡入函数
$(".jQueryFadeIn").click(function() {
    $(".overlay_hide").addClass("overlay_jQueryHide");
    $(".overlay_jQueryHide").fadeIn("slow");
    $(".overlay_jQueryHide button").get(0).onclick = jQueryFadeOutFunction;
});
//淡出函数
function jQueryFadeOutFunction() {
    $(this).removeClass("jQueryFadeOut");
    $(this).parents(".overlay_jQueryHide").fadeOut("slow");
    $(this).parents(".overlay_jQueryHide").removeClass("overlay_jQueryHide");
}

/// --------------------------------------------------------------------------------------------------

/// jQuery 滑动
//滑入函数
$(".jQuerySlideDown").click(function() {
    $(".overlay_hide").addClass("overlay_jQueryHide");
    $(".overlay_jQueryHide").slideDown("slow");
    $(".overlay_jQueryHide button").get(0).onclick = jQuerySlideOutFunction;
});
//滑出函数
function jQuerySlideOutFunction() {
    $(this).removeClass("jQuerySlideUp");
    $(this).parents(".overlay_jQueryHide").slideUp("slow");
    $(this).parents(".overlay_jQueryHide").removeClass("overlay_jQueryHide");
}

/// --------------------------------------------------------------------------------------------------

/// 从上往下滚入，从上往下滚出
//滚入
$(".scrollDown").click(function() {
    $(".overlay_visibility").addClass("overlay_scroll1");
    setTimeout(function() {
        $(".overlay_scroll1").addClass("open");
        $(".overlay_scroll1 button").get(0).onclick = scroll1Function;
    }, 300);
});
//滚出
function scroll1Function() {
    $(this).parents(".overlay_scroll1").addClass("close");
    $(this).parents(".overlay_scroll1").removeClass("open");

    setTimeout(function() {
        $(".overlay_scroll1").removeClass("close");
        $(".overlay_scroll1").removeClass("overlay_scroll1");
    }, 500);
}

/// --------------------------------------------------------------------------------------------------

/// 从右下往左上滚入，原路滚出
//滚入
$(".scrollLeftTop").click(function() {
    $(".overlay_visibility").addClass("overlay_scroll2");
    setTimeout(function() {
        $(".overlay_scroll2").addClass("open");
        $(".overlay_scroll2 button").get(0).onclick = scroll2Function;
    }, 300);
});
//滚出
function scroll2Function() {
    $(this).parents(".overlay_scroll2").removeClass("open");

    setTimeout(function() {
        $(".overlay_scroll2").removeClass("overlay_scroll2");
    }, 500);
}

/// --------------------------------------------------------------------------------------------------

/// 放大
//放大
$(".scrollScale").click(function() {
    $(".overlay_visibility").addClass("overlay_scale");
    setTimeout(function() {
        $(".overlay_scale").addClass("open");
        $(".overlay_scale button").get(0).onclick = scaleFunction;
    }, 300);
});
//缩小
function scaleFunction() {
    $(this).parents(".overlay_scale").removeClass("open");

    setTimeout(function() {
        $(".overlay_scale").removeClass("overlay_scale");
    }, 500);
}

/// --------------------------------------------------------------------------------------------------

/// 横向打开
//横向打开
$(".scrollDoor").click(function() {
    $(".overlay_visibility").addClass("overlay_widthChange");
    setTimeout(function() {
        $(".overlay_widthChange").addClass("open");
        $(".overlay_widthChange button").get(0).onclick = doorFunction;
    }, 300);
});
//横向关闭
function doorFunction() {
    $(this).parents(".overlay_widthChange").removeClass("open");

    setTimeout(function() {
        $(".overlay_widthChange").removeClass("overlay_widthChange");
    }, 500);
}

/// --------------------------------------------------------------------------------------------------

/// 横向推出
//横向打开
$(".pushRight").click(function() {
    $("body").addClass("overlay_waitPushRight");
    setTimeout(function() {
        $("body").addClass("overlay_pushRight");
        $(".overlay_visibility").addClass("open");
        $(".overlay_visibility button").get(0).onclick = pushRightFunction;
    }, 300);
});
//横向关闭
function pushRightFunction() {
    $(this).parents(".open").removeClass("open");
    $(".overlay_pushRight").removeClass("overlay_pushRight");
    setTimeout(function() {
        $("body").removeClass("overlay_waitPushRight");
    }, 300);
}

/// --------------------------------------------------------------------------------------------------

/// 缩小主页面并从下往上推
//缩小主页面并从下往上推
$(".pushTop").click(function() {
    $("body").addClass("overlay_waitPushTop");
    setTimeout(function() {
        $("body").addClass("overlay_pushTop");
        $(".overlay_visibility").addClass("open");
        $(".overlay_visibility button").get(0).onclick = pushTopFunction;
    }, 300);
});
//放大并从下侧推出
function pushTopFunction() {
    $(this).parents(".open").removeClass("open");
    $(".overlay_pushTop").removeClass("overlay_pushTop");
    setTimeout(function() {
        $("body").removeClass("overlay_waitPushTop");
    }, 300);
}

/// --------------------------------------------------------------------------------------------------

/// svg改变
//svg打开
$(".pageTurning").click(function() {
    // setTimeout(function() {
    // var to = "m 0,0 1439.999975,0 0,805.99999 -1439.999975,0 z";
    var to = 'M0,0C0,0,1439.999975,0,1439.999975,0C1439.999975,0,1439.999975,805.99999,1439.999975,805.99999C1439.999975,805.99999,0,805.99999,0,805.99999C0,805.99999,0,0,0,0';
        $('.overlay_svg svg path').animate( { 'd' : to }, 400, "linear" );
    //     $(".overlay_visibility").addClass("open");
    //     $(".overlay_visibility button").get(0).onclick = pageTurningFunction;
    // }, 300);
});
//svg关闭
function pageTurningFunction() {
    $(this).parents(".open").removeClass("open");
    $(".overlay_pushTop").removeClass("overlay_pushTop");
    setTimeout(function() {
        $("body").removeClass("overlay_waitPushTop");
    }, 300);
}

