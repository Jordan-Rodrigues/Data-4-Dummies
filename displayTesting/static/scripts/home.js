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
    $(".submit").fadeIn(1000)
    $(".submitImage").fadeIn(1000)
})

function scrollDirection() {
    var st = $(window).scrollTop();
    console.log("st is " + st + "global is " + window.globalPos)
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
    console.log("new pos is " + window.globalPos)
    return new Promise(resolve => setTimeout(resolve, 1))
}

function sec2Pos() {
    var featPos = $(".featTitle").offset().top
    var headerHeight = $(".headerBar").height()
    var topMargin = parseFloat($(".featTitle").css("margin-top"))
    var sec2pos = featPos - headerHeight - topMargin
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
    console.log("function is called")
    var direction = scrollDirection()
    console.log(direction)
    //section definitions
    var sec2pos = sec2Pos()
    var sec3pos = sec3Pos()
    console.log(sec2pos + " " + sec3pos)
    if ((window.pagePlace == 1) && (direction == "down")) {
        await animate(sec2pos)
        window.pagePlace = 2
    } else if ((window.pagePlace == 2) && (direction == "up")) {
        await animate(0)
        window.pagePlace = 1
    } else if ((window.pagePlace == 2) && (direction == "down")) {
        await animate(sec3pos)
        window.pagePlace = 3
    } else if ((window.pagePlace == 3) && (direction == "up")) {
        await animate(sec2pos)
        window.pagePlace = 2
    }
}

$(window).scroll(throttled)