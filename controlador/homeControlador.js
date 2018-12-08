const controlador = require('../controlador/controlador');
const viajeModelo = require('../Models/viajeModel');

class controladorMain extends controlador {
    constructor (res,req,next){
        super(res, req, next);
    }
    async index() {
        /*Recogemos todos los viajes de la base de datos y los acomodamos en la seccion de destinos*/
        let modelo = new viajeModelo();
        try {
            var resultado = await modelo.obtenerTodos();
        } catch (e) {
            console.log('Error------------>' + e);
        }
        /*Guardamos en el array solo los viajes que esten activos*/
        var viajesActivos = [];
        for (var i = 0; i < resultado.length; i++) {
            if (resultado[i].estado === 1) {
                var viaje = {
                    "viaje": resultado[i].viaje,
                    "descripcion": resultado[i].descripcion,
                    "estado": resultado[i].estado,
                    "precio": resultado[i].precio,
                    "tipo": resultado[i].tipo,
                    "ruta": resultado[i].ruta
                }
                viajesActivos.push(viaje);
            }
        }

        //Si hay una session habilitamos el nombre de usuario en el header.
        if (this.req.session.username) {
            this.res.render('index', { username: this.req.session.username, viajes: viajesActivos });
        }
        //Si no simplemente dejamos el main como esta.
        this.res.render('index', { viajes: viajesActivos });
    }
}
module.exports = controladorMain;