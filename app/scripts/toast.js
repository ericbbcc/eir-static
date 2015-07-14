function take(text){
    if(undefined != $("#toast")){
        $("body").prepend('<div id="toast" style="border-radius:5px;color:#FFF;position:absolute;background-color:#000;opacity:0.5;z-index:10010;padding:10px;display:none;">'+text+'</div>');
    }
    var left = ( screen.width - parseInt($("#toast").css("width").replace("px","")) ) * 0.9 / 2;
    var top = ( screen.height - parseInt($("#toast").css("height").replace("px","")) ) * 0.8 / 2;
    $("#toast").css("left",parseInt(left)+"px");
    $("#toast").css("top",parseInt(top)+"px");
    $("#toast").fadeIn("slow");
    $("#toast").fadeOut("slow");
}
