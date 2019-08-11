//var globalPos = 0;

$(document).ready(function() {
	$('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true
	});

	//methods
	$.fn.fullpage.setAllowScrolling(false);
});

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

$("input").click(function () {
    $(".submit").fadeIn()
    $(".submitImage").fadeIn()
})

/*
$(window).scroll(async function () {
    var direction = scrollDirection()
    console.log(direction)
    //section definitions
    var sec2pos = sec2Pos()
    var sec3pos = sec3Pos()
    if (($(window).scrollTop() <= 100) && (direction == "down")) {
        animate(sec2pos)
        await sleep(2000)
        window.globalPos = $(window).scrollTop()
    }
    console.log((secRC(sec2pos, $(window).scrollTop()) && direction == "up"))
    if (secRC(sec2pos, $(window).scrollTop()) && direction == "up") {
        console.log("yeet")
        animate(0)
        await sleep(2000)
        window.globalPos = $(window).scrollTop()
    }

    if (secRC(sec2pos, $(window).scrollTop()) && direction == "down") {
        animate(sec3pos)
        await sleep(2000)
        window.globalPos = $(window).scrollTop()
    }

    if (secRC(sec3pos, $(window).scrollTop()) && direction == "up") {
        animate(sec2pos)
        await sleep(2000)
        window.globalPos = $(window).scrollTop()
    }
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

//checks to see if you're roughly where the second section is
function secRC(secPos, currentPos) {
    if (currentPos >= secPos * .9 && currentPos <= secPos * 1.1) {
        return true
    } else {
        return false
    }
}


function animate(pos) {
    $('html, body').animate({
        scrollTop: pos
    }, 1000)
}

/*
const animate = (pos) => {
    return new Promise(resolve => $('html, body').animate({
        scrollTop: pos
    }, 2000))
}

function sec2Pos() {
    var featPos = $(".featTitle").offset().top
    var headerHeight = $(".headerBar").height()
    var topMargin = parseFloat($(".featTitle").css("margin-top"))
    var sec2pos = featPos - headerHeight - topMargin
    return sec2pos
}

function sec3Pos() {
    var waitPos = $("#upTitle").offset.top
    var headerHeight = $(".headerBar").height()
    var sec3pos = waitPos - headerHeight
    return sec3pos
}
*/ 