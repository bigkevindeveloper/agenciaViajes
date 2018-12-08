$(document).ready(function () {
    //Declaracion de elementos de la interfaz
    var vistaVentanaSubida = $('#ventanaSubida'); //Ventana de subir viajes
    var vistaVentanaBorrar = $('#ventanaBorrar'); //Ventana de borrar viajes
    var botonSalirSubida = $('#btn-salir'); //Boton para salir de la ventana de añadir viajes
    var botonSalirBorrado = $('#btn-salirEliminar'); //Boton para salir de la ventana de borrar viajes
    var botonAgregar = $('#btn-subir'); //Boton para mostrar pestaña.
    var botonBorrar = $('#btn-borrar');

    //Evento para cuando se apriete el boton de borrar.
    botonBorrar.click(function () {
        vistaVentanaBorrar.removeClass('d-none');
    });
    botonSalirBorrado.click(function () {
        vistaVentanaBorrar.addClass('d-none');
    });
    //Evento para cuando se aprite el boton de agregar.
    console.log('rady kevin');
    botonAgregar.click(function () {
        vistaVentanaSubida.removeClass('d-none'); 
    });
    botonSalirSubida.click(function () {
        vistaVentanaSubida.addClass('d-none');
    });
});