const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

$(document).click(function() {
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

