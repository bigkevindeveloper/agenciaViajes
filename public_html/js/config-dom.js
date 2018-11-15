
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
			$('header').css({"height":"15vh"});
		} else {
			$('#menu-navegacion').removeClass('menu-fixed');
			$('.titulo').css({"color":"#000000"});
			$('#logo').attr('src', 'md/iconoweb.png');
		}
	});
});
/*Funciones de navegacion*/
/*Scroll a secciones*/

$('#btn-destinos').click(function(){
	$('html, body').animate({
        // #elemento2 · Será el elemento donde queremos desplazarnos.
    	scrollTop: $("#sec-destinos").offset().top-90
        //1500 · La velocidad que le queremos dar
	 	}, 1800);
})

$('#btn-quien').click(function(){
	$('html, body').animate({
        // #elemento2 · Será el elemento donde queremos desplazarnos.
    	scrollTop: $("#sec-quienessomos").offset().top-90
        //1500 · La velocidad que le queremos dar
	 	}, 1800);
})
$('#btn-donde').click(function(){
	$('html, body').animate({
        // #elemento2 · Será el elemento donde queremos desplazarnos.
    	scrollTop: $("#sec-contacto").offset().top-90
        //1500 · La velocidad que le queremos dar
	 	}, 1800);
})
$('#btn-home').click(function(){
	$('html, body').animate({
        // #elemento2 · Será el elemento donde queremos desplazarnos.
    	scrollTop: $("#sec-inicio").offset().top
        //1500 · La velocidad que le queremos dar
	 	}, 1800);
})
/*Calcular el alto de la pantalla*/
function configurarCSS(screen){
	$(".full-page").css({"min-height":screen});
}


