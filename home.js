var lastScroll = 0;
$(document).scroll(function(){
    console.log("test")
    var el = $(this),
        scroll = el.scrollTop(),
        round = lastScroll < scroll ? Math.ceil : Math.floor;
    lastScroll = round(scroll/128) * 128;
    el.scrollTop(lastScroll);
});