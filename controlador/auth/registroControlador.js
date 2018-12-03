const controlador = require('../controlador');
const modelousuario = require('../../Models/userModel');
const encriptador = require('../../servicios/encriptamiento');
const uuidv1 = require('uuid/v1');
const email = require('../../servicios/email');


class registroControlador extends controlador {
    constructor(res, req, next) {
        super(res,req,next)
    }
    index() {
        if (this.req.flash.error) {
            this.res.render('registro', { error: this.req.flash.error });
            this.req.flash.error = null;
        }
        
        this.res.render('registro', {title:'register'});
    }
    async insertarUsuario() {
        /*Limpiamos la peticion*/
        this.req.flash.error = null;
        /*Controlador de usuarios*/
        let controlUsuario = new modelousuario();
        /*Recibir los parametros enviados en el formulario*/
        var usuario = this.req.body.usuario;
        var emailcampo = this.req.body.email;
        var password = this.req.body.password;
        
        /*Variable de usuarios*/
        var tabla;
        
        /*Comprobamos que el email no exista en la base de datos*/
        let existeEmail = false;
        let existeUser = false;
        try {
            var tabla_usuarios = await controlUsuario.obtenerTodos();
            tabla = tabla_usuarios.slice();
            for (var i = 0; i <= tabla.length; i++) {
                if (tabla[i].email === this.req.body.email) {
                    existeEmail = true;
                    //Si el email existe hacemos una redireccion a rejistro hbs con el error de email existente.
                }
                if (tabla[i].usuario === this.req.body.usuario) {
                    existeUser = true;
                }

            }
        } catch (e) {
            console.log("No se han podido recibir los usuarios" + e);
        }
        /*Encriptacion de la contraseña*/
        var passEncrypt = encriptador.encriptarPass(password);
        /*Si existe es igual a false podremos procedes a registrar al usuario*/
        if (!existeEmail && !existeUser) {
            let user = {
                usuario: usuario,
                email: emailcampo,
                password: passEncrypt,
                hash: uuidv1()
            }
            try {
                let resultado = await controlUsuario.insert(user);
                /*Comprobamos q se envie el correo*/
                try {
                    var x = new email();
                    var emailR = this.req.body.email;
                    var hashR = user.hash;
                    let resultado = await x.enviarEmailRegistro({ PostEmail: emailR, PostHash: hashR });
                } catch (e) {
                    console.log('No se envio el correo ->' + e);
                }
                this.res.redirect('/');
            } catch (e) {
                console.log("No se puede realizar el registro" + e);
            }
        } else {
            if (existeEmail) {
                this.req.flash.error = "El email ya existe";
                this.res.redirect('/registrar');
            }
            if (existeUser) {
                this.req.flash.error = "El usuario ya existe";
                this.res.redirect('/registrar');
            }
            //Creamos una sesion flash.
            
        }

        
    }

}
module.exports = registroControlador;