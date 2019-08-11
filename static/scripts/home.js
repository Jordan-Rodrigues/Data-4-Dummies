var globalPos = 0
var pagePlace = 1

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

$(document).click(function () {
    $(".featureItem").css("background-color", "#16994F")
    $(".featureItem").css("color", "white")
})

$(".featureItem").click(async function () {
    await sleep(1)
    $(".featureItem").css("background-color", "#16994F")
    $(".featureItem").css("color", "white")
    $(this).css("background-color", "white")
    $(this).css("color", "#16994F")
})

$("input").click(async function () {
    await sleep(1000)
    $(".submit").css("visibility", "visible")
    $(".submitImage").css("visibility", "visible")
})

function scrollDirection() {
    var st = $(window).scrollTop();
    if (st > window.globalPos) {
        return "down"
    } else {
        return "up"
    }
};

const animate = async (pos) => {
    $('html, body').animate({
        scrollTop: pos
    }, 1900)
    //problem, animate is called 6 consecutive times which causes issues?
    await sleep(2000)
    window.globalPos = $(window).scrollTop()
    return new Promise(resolve => setTimeout(resolve, 1))
}

function sec2Pos() {
    var featPos = $(".featTitle").offset().top
    var headerHeight = $(".headerTitle").height()
    var topMargin = parseFloat($(".featTitle").css("margin-top"))
    var sec2pos = featPos - headerHeight - topMargin * 1.05
    return sec2pos
}

function sec21Pos() {
    var featPos = $(".featTitle").offset().top
    var headerHeight = $(".headerTitle").height()
    var topMargin = parseFloat($(".featTitle").css("margin-top"))
    var sec2pos = featPos - headerHeight - topMargin * 1.00
    return sec2pos
}

function sec3Pos() {
    var waitPos = $("#upTitle").offset().top
    var headerHeight = $(".headerBar").height()
    var sec3pos = waitPos - headerHeight
    return sec3pos
}

var throttled = _.throttle(pageSwitch, 2100, {trailing: false})

async function pageSwitch() {
    var direction = scrollDirection()
    var sec2pos = sec2Pos()
    var sec21pos = sec21Pos()
    var sec3pos = sec3Pos()
    if ((window.pagePlace == 1) && (direction == "down")) {
        $("#arrow1").fadeOut(1000)
        await animate(sec2pos)
        window.pagePlace = 2
    } else if ((window.pagePlace == 2) && (direction == "up")) {
        $("#arrow1").fadeIn(1000)
        await animate(0)
        window.pagePlace = 1
    } else if ((window.pagePlace == 2) && (direction == "down")) {
        $("#arrow2").fadeOut(1000)
        await animate(sec3pos)
        window.pagePlace = 3
    } else if ((window.pagePlace == 3) && (direction == "up")) {
        $("#arrow2").fadeIn(1000)
        await animate(sec21pos)
        window.pagePlace = 2
    }
}

$(window).scroll(throttled)

$("#arrow1").click(async function() {
    $("#arrow1").fadeOut(1000)
    await animate(sec2Pos())
    window.pagePlace = 2
}
)

$("#arrow2").click(async function() {
    $("#arrow2").fadeOut(1000)
    await animate(sec3Pos())
    window.pagePlace = 3
}
)