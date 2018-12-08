const controlador = require('../controlador');
const modeloViaje = require('../../Models/viajeModel');
const modeloUsuario = require('../../Models/userModel');
class controladorPrincipal extends controlador {
    constructor(res, req, next) {
        super(res, req, next);
    }
    async index() {
        if (!this.req.session.username) {
            this.res.redirect('/');
        }
        /*Comprabaremos que el usuario sea administrador*/
        /*Si es administrador tendra acceso al panel de control*/
        let modelo = new modeloUsuario();
        try {
            let res = await modelo.obtenerByUsername(this.req.session.username);
            if (res[0].role != 2) {
                this.res.redirect('/');
            }
            console.log('----------------------------------------');
        } catch (e) {
            console.log('error -------------------->' + e);
        }
        /*Si no es administrador sera redirijido al home*/

        /*-----------------------------------------------------*/
        console.log('entro a la funcion');
        //Desde aqui renderizamos la vista de panel de control.
        //Pasandole como parametro a la renderizacion de la vista un array con todos los
        //viajes los cuales se rellenaran en la tabla.
        if (this.req.flash.borrado) {
            console.log('SE: ' + this.req.flash.borrado);
        }
        /*1ºCargamos los viajes...!*/
        try {
            let modeloviaje = new modeloViaje();
            var viajes = await modeloviaje.obtenerTodos();
        } catch (e) {
            console.log('error -> ' + e);
        }
        /*Renderizamos la vista*/
        this.res.render('administracion', { arrayviajes: viajes, username: this.req.session.username });
    }

    
}

module.exports = controladorPrincipal;