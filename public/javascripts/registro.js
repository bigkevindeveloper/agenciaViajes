console.log('javascript ready!');

var btnregistro = $('#btnregistro');
var pass1 = $('#pass1');
var pass2 = $('#pass2');
var formulario = $('#formularioRegistro');
var log = $('#log');
var logFull = false;
var email = $('.email-input');
btnregistro.click(function () {
    log.text('');
    var x = email.val();
    var estadoEmail = false;
    for (var i = 0; i <= x.length; i++) {
        if (x[i] === '@') {
            estadoEmail = true;
        }
    }
    if (estadoEmail) {
        if (pass1.val() === pass2.val()) {
            enviar();
        } else {
            log.text('Las claves no coinciden');
        }
    } else {
        log.text('Formato de email invalido');
    }
});

function emailvalidate() {
    console.log('entra en email');
    var validacion = false;
    var cadena = email.val();
    for (var i = 0; i < cadena.length; i++) {
        console.log(cadena[i]);
        if (cadena[i] === '@') {
            validacion = true;
        }
    }
    return validacion;
}

function enviar() {
    formulario.submit();
}
   


