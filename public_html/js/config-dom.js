
$(document).ready(function(){
	var height = $(window).height();
 	configurarCSS(height);

 	/*Sticky menu*/
 	var altura = $('#menu-navegacion').offset().top;
	
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura+100 ){
			$('#menu-navegacion').addClass('menu-fixed');
			$('.titulo').css({"color":"#ffffff"});
			$('#logo').attr('src', 'md/iconoweb2.png');
		} else {
			$('#menu-navegacion').removeClass('menu-fixed');
			$('.titulo').css({"color":"#000000"});
			$('#logo').attr('src', 'md/iconoweb.png');
		}
	});
});

/*Calcular el alto de la pantalla*/
function configurarCSS(screen){
	$(".full-page").css({"min-height":screen});
}


