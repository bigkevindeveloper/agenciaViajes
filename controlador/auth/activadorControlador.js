const controladorbase = require('../controlador');
const usuariomodelo = require('../../Models/userModel');

class controladorActivacion extends controladorbase {
    constructor(res,req,next) {
        super(res,req,next)
    }
    async activarUsuario() {
        var hash = this.req.params.hash;
        var modelo = new usuariomodelo();
        /*Buscamos el usuario con ese hash*/
        try {
            let resultado = await modelo.obtenerByHash(hash);
            //Resultado nos proporciona el id del cliente.
            //Ahora intentamos activar el usuario.
            try {
                console.log(resultado[0].id)
                let respuesta = await modelo.activarUsuario(resultado[0].id);
                /*Borramos el hash del usuario y redirijimos al login*/
                let answer = await modelo.borrarHash(resultado[0].id);
                //Desde aqui enviamos los usuario a una vista que te dira que el usuario ya esta activado.
                this.req.session.usuario = resultado[0].usuario;
                this.res.redirect('/activado');
            } catch (e) {
                console.log('Error al activar el usuario porque: -> ' + respuesta);
            }
            //Funciona...
        } catch (e) {
            console.log('Error en la consulta por ->' + e);
        }
    }
}

module.exports = controladorActivacion;