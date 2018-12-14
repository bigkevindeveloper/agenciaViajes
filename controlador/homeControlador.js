const controlador = require('../controlador/controlador');
const viajeModelo = require('../Models/viajeModelo');


class controladorMain extends controlador {
    constructor (res,req,next){
        super(res, req, next);
    }
    async index() {
        /*Recogemos todos los viajes de la base de datos y los acomodamos en la seccion de destinos*/
        //let modelo = new viajeModelo();

        try {
            var data = await viajeModelo.findAll();
        } catch (e) {
            console.log('error:' + e);
        }
       
        
        //Si hay una session habilitamos el nombre de usuario en el header.
        if (this.req.session.username) {
            this.res.render('index', { username: this.req.session.username , viajes:data});
        }
        //Si no simplemente dejamos el main como esta.
        this.res.render('index', {viajes:data});
    }
}
module.exports = controladorMain;