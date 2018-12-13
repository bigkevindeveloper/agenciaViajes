const controlador = require('../controlador');
const encriptador = require('../../servicios/encriptamiento');
const uuidv1 = require('uuid/v1');
const email = require('../../servicios/email');
/*Sequelize*/
const usuarioModelo = require('../../Models/usuarioModelo');
/*password-hash*/
var passwordHash = require('password-hash');


class registroControlador extends controlador {
    constructor(res, req, next) {
        super(res,req,next)
    }
    index() {
        //Si hay una session habilitamos el nombre de usuario en el header.
        if (this.req.session.username) {
            this.res.render('registro', { username: this.req.session.username });
            console.log('existe el usuario');
        }
        if (this.req.flash.error) {
            this.res.render('registro', { error: this.req.flash.error });
            this.req.flash.error = null;
        }
        
        this.res.render('registro', {title:'register'});
    }
    async insertarUsuario() {
        /*Limpiamos la peticion*/
        this.req.flash.error = null; 
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
            var tabla_usuarios = await usuarioModelo.all();
           
            console.log('++++TABLA USAURIOS++++');
            for (var i = 0; i < tabla_usuarios.length; i++) {
                console.log(tabla_usuarios[i].usuario);
                if (tabla_usuarios[i].email === emailcampo) {
                    existeEmail = true;
                }
                if (tabla_usuarios[i].usuario === usuario) {
                    existeUser = true;
                }
            }
            
        } catch (e) {
            console.log("ERROR No se han podido recibir los usuarios::::" + e);
        }
       
        /*Si existe es igual a false podremos procedes a registrar al usuario*/
        if (!existeEmail && !existeUser) {
            let user = {
                usuario: usuario,
                email: emailcampo,
                password: encriptador.encriptarPass(password),
                hash: uuidv1(),
                role: 1
            }
            try {
                let resultado = await usuarioModelo.create(user);
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