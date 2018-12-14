const controlador = require('../controlador');
const usuarioModelo = require('../../Models/usuarioModelo');
const encriptador = require('../../servicios/encriptamiento');
/*Pasword-hash*/ 
var passwordHash = require('password-hash');

class loginControlador extends controlador {
    constructor(res, req, next) {
        super(res, req, next)
    }
    index() {
        if (this.req.session.username) {
            this.res.render('login', { username: this.req.session.username });
        }
        if (this.req.flash.passfail) {
            this.res.render('login', { error: this.req.flash.passfail });
            this.req.flash.error = null;
        }
        if (this.req.flash.noactivo) {
            this.res.render('login', { noactivo: this.req.flash.noactivo });
            this.req.flash.noactivo = null;
        }
        this.res.render('login');
    }

    async comprobacionLogeo() {
        let Ipass = this.req.body.passwordlogin;
        /*Hacemos peticion a la base de datos para recibir el usuario con ese email y comparar las contraseñas*/
        try {
            let respuesta = await usuarioModelo.find({ where: { email: this.req.body.emaillogin } });
            console.log(respuesta.active);

            if (respuesta.active) {
                //#Comprobamos contraseña.
                if (encriptador.comparePass(Ipass, respuesta.password)) {
                    this.req.session.username = respuesta.usuario;
                    this.req.session.carrito = [];
                    this.res.redirect('/');
                } else {
                    this.req.flash.passfail = 'El password es incorrecto';
                    console.log(this.req.flash.passfail);
                    this.res.redirect('/iniciarsesion');
                }
            } else {
                this.req.flash.noactivo = 'El usuario no se encuentra activado';
                this.res.redirect('/iniciarsesion');
            }
            
        
        } catch (e) {
            this.res.send('Fallo de verificacion' + e);
        }
    }
    
}
module.exports = loginControlador;