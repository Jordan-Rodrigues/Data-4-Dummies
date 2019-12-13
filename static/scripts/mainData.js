$(".pageOption").hover(function() {
    $(this).css("color", "#0A369D")
    $(this).css("background-color", "white")
    $(".pageDesc").css("visibility", "visible")
    $(".pageDesc").html(this.id)
})

$(".pageOption").mouseleave(function() {
    $(this).css("color", "white")
    $(this).css("background-color", "#0A369D")
    $(".pageDesc").html("A")
    $(".pageDesc").css("visibility", "hidden")
}) 