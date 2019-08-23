//global variables for page fading
var globalPos = 0
var pagePlace = 1

//custom sleep function (asynchronous)
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//change color of items
$(document).click(function () {
    $(".featureItem").css("background-color", "#266DD3")
    $(".featureItem").css("color", "white")
})

//change color on off click
$(".featureItem").click(async function () {
    await sleep(1)
    $(".featureItem").css("background-color", "#266DD3")
    $(".featureItem").css("color", "white")
    $(this).css("background-color", "white")
    $(this).css("color", "#266DD3")
    $(this).css("border", "solid 0.5vh #266DD3")
    $(".featDesc").html($(this).attr("id"))
})

//fade in submit button after select
$("input").click(async function () {
    await sleep(1000)
    $(".submit").css("visibility", "visible")
    $(".submitImage").css("visibility", "visible")
})


//determines direction of scroll
function scrollDirection() {
    var st = $(window).scrollTop();
    if (st > window.globalPos) {
        return "down"
    } else {
        return "up"
    }
};

//animation function for scroll
const animate2 = async (pos) => {
    $('html, body').animate({
        scrollTop: pos
    }, 1900)
    //problem, animate is called 6 consecutive times which causes issues?
    await sleep(2000)
    window.globalPos = $(window).scrollTop()
    return new Promise(resolve => setTimeout(resolve, 1))
}

//calculates position of various sections dynamically
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
    var sec2pos = featPos - headerHeight - topMargin * .8
    return sec2pos
}

function sec3Pos() {
    var waitPos = $("#upTitle").offset().top * .9
    var headerHeight = $(".headerBar").height()
    var sec3pos = waitPos - headerHeight
    return sec3pos
}

//throttling the scroll call
var throttled = _.throttle(pageSwitch, 2100, {trailing: false})
$(window).scroll(throttled)

//function to switch page
async function pageSwitch() {
    var direction = scrollDirection()
    var sec2pos = sec2Pos()
    var sec21pos = sec21Pos()
    var sec3pos = sec3Pos()
    if ((window.pagePlace == 1) && (direction == "down")) {
        $("#arrow1").fadeOut(1000)
        greetingFade2()
        featureFade()
        await animate2(sec2pos)
        window.pagePlace = 2
    } else if ((window.pagePlace == 2) && (direction == "up")) {
        greetingFade()
        featureFade2()
        $("#arrow1").fadeIn(1000)
        await animate2(0)
        window.pagePlace = 1
    } else if ((window.pagePlace == 2) && (direction == "down")) {
        featureFade2()
        uploadFade()
        $("#arrow2").fadeOut(1000)
        await animate2(sec3pos)
        window.pagePlace = 3
    } else if ((window.pagePlace == 3) && (direction == "up")) {
        featureFade()
        uploadFade2()
        $("#arrow2").fadeIn(1000)
        await animate2(sec21pos)
        window.pagePlace = 2
    }
}

//arrow functionality
$("#arrow1").click(async function() {
    greetingFade2()
    featureFade()
    $("#arrow1").fadeOut(1000)
    await animate2(sec2Pos())
    window.pagePlace = 2
}
)

$("#arrow2").click(async function() {
    featureFade2()
    $("#arrow2").fadeOut(1000)
    await animate2(sec3Pos())
    window.pagePlace = 3

}
)

//fade functions
function featureFade() {
    $(".features").animate({
        opacity: 1
    }, 3000)
}

function featureFade2() {
    $(".features").animate({
        opacity: 0
    }, 1000)
}

function greetingFade() {
    $(".greeting").animate({
        opacity: 1
    }, 3000)
}

function greetingFade2() {
    $(".greeting").animate({
        opacity: 0
    }, 1000)
}

function uploadFade() {
    $(".upload").animate({
        opacity: 1
    }, 3000)
}

function uploadFade2() {
    $(".upload").animate({
        opacity: 0
    }, 1000)

}

$('.fileUpload').change(function() {
    console.log("test")
    $(".fileName").text("Selected file: " + $('.fileUpload')[0].files[0].name)
  });