
$(document).ready(function(){
	var height = $(window).height();
 	configurarCSS(height);

 	/*Sticky menu*/
    var altura = $('#menu-navegacion').offset().top;
    var d = $(window).scrollTop();
    if ($(window).scrollTop() > 100) {
        configurarMenu();
    }
    if ($(window).width() < 400) {
        quienesSomos();
    }
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > 150 ){
			$('#menu-navegacion').addClass('menu-fixed');
			$('.titulo').css({"color":"#ffffff"});
			$('#logo').attr('src', 'img/iconoweb2.png');
			$('header').css({"height":"20vh"});
        }
        if ($(window).scrollTop() < 150){
			$('#menu-navegacion').removeClass('menu-fixed');
			$('.titulo').css({"color":"#000000"});
			$('#logo').attr('src', 'img/iconoweb.png');
		}
    });
    /*Escuchador de actualizaciones de pagina*/
    $(window).on("beforeunload", function (e) {
        console.log("actualizacion");
    });
    function configurarMenu() {
        $('#menu-navegacion').addClass('menu-fixed');
        $('.titulo').css({ "color": "#ffffff" });
        $('#logo').attr('src', 'img/iconoweb2.png');
        $('header').css({ "height": "20vh" });
    }
    function configurarMenu2() {
        if ($(window).scrollTop() > 150) {
            $('#menu-navegacion').addClass('menu-fixed');
            $('.titulo').css({ "color": "#ffffff" });
            $('#logo').attr('src', 'img/iconoweb2.png');
            $('header').css({ "height": "15vh" });
        }
    }
    //Configuramos el menu desplegable.
    var estadoMenu = false; // Estados: ->False(cerrado) & True(Abierto)
    $('#burguer').click(function () {
        configurarMenu2();
        if (!estadoMenu) {
            /*Lo que ejecutara si el menu es visible*/
            estadoMenu = true;
            /*Vamos a aplicarle la propiedad visible a nuestro menu desplegable*/
            $('#menu_desplegado').attr('class', 'd-block menu-desplegado col-7');
            //console.log(estadoMenu);
        } else {
            /*Lo que se ejecutara si no es visible*/
            $('#menu_desplegado').attr('class', 'd-none menu-desplegado col-7');
            estadoMenu = false;
            //console.log(estadoMenu);
        }
    })
});
/*Modificar quienes somos*/
function quienesSomos() {
    $('#qss').attr('class','sec-quienessomosmovil');
}
/*Funciones de navegacion*/
function ocultarMenu() {
    $("#burguer")[0].click();
}
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
    	scrollTop: $("#qss").offset().top-90
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
/*botones burguer*/
$('#bb-inicio').click(function () {
    ocultarMenu();
        $('html, body').animate({
            // #elemento2 · Será el elemento donde queremos desplazarnos.
            scrollTop: $("#sec-inicio").offset().top - 90
            //1500 · La velocidad que le queremos dar
        }, 1800);
    })
$('#bb-viajes').click(function () {
    ocultarMenu();
        $('html, body').animate({
            // #elemento2 · Será el elemento donde queremos desplazarnos.
            scrollTop: $("#sec-destinos").offset().top - 90
            //1500 · La velocidad que le queremos dar
        }, 1800);
    })
$('#bb-qs').click(function () {
    ocultarMenu();
        $('html, body').animate({
            // #elemento2 · Será el elemento donde queremos desplazarnos.
            scrollTop: $("#qss").offset().top
            //1500 · La velocidad que le queremos dar
        }, 1800);
    })
    /*Calcular el alto de la pantalla*/
function configurarCSS(screen){
	$(".full-page").css({"min-height":screen});
}


