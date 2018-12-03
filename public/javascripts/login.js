var btnlogin = $('#logueo');
var checkbox = $('#recuerdaUsuario');
var campoEmail = $('#emaillogin');
btnlogin.click(function () {
    /*Guaramos usuario en local storage*/
    localStorage.setItem('emailUsuario', campoEmail.val());
});