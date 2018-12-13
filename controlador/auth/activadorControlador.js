const controladorbase = require('../controlador');
const usuariomodelo = require('../../Models/usuarioModelo');
const mu = require('../../Models/viajeModelo');
class controladorActivacion extends controladorbase {
    constructor(res,req,next) {
        super(res,req,next)
    }
    async activarUsuario() {
        var hash = this.req.params.hash;
        /*Buscamos el usuario con ese hash*/
        try {
            let resultado = await usuariomodelo.find({ where: { hash: this.req.params.hash } });
            //Resultado nos proporciona el id del cliente.
            //Ahora intentamos activar el usuario.
            try {
                /*Borramos el hash del usuario y redirijimos al login*/
                let answer = await mu.update({ hash: '' }, { id: JSON.stringify(resultado.id) });
                //Desde aqui enviamos los usuario a una vista que te dira que el usuario ya esta activado.
                this.req.session.usuario = JSON.stringify(resultado.usuario);
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