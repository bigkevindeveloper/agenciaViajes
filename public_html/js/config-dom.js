
$(document).ready(function(){
	var height = $(window).height();
 	configurarCSS(height);
});

function configurarCSS(screen){
	$(".full-page").css({"min-height":screen});
}