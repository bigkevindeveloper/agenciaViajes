const controlador = require('./controlador');
const viajeModelo = require('../Models/viajeModelo');

class controladorCarrito extends controlador {
    constructor(res, req, next) {
        super(res, req, next);
        
    }

    async index() {
        let idViajesActuales = [];
        //Buscamos cada viaje mediante el ID que exista en el carrito.
        idViajesActuales = this.req.session.carrito.slice();
        /*
        //Iteramos sobre cada id para extraer de la base de datos el viaje que corresponde a cada ID
        //Para luego guardar cada instancia de viaje en un array el cual es el que le devolveremos a 
        //La vista del carrito.
        */
        var VIAJES = [];

        for (var i = 0; i < idViajesActuales.length; i++) {
            try {
                let modelo = await viajeModelo.find({ where: { id: idViajesActuales[i] } });
                VIAJES.push(modelo);
            } catch (e) {
                console.log('No se a podido buscar el modelo porque:' + e);
            }
        }
        /*Ya con los viajes cargado en el array de viajes en el carrito podemos mandarselos a la vista para el manejo con
         handlebars*/

        this.res.render('cart', { viajes: VIAJES });
    }

    async agregarProducto() {
        let IDNUEVOVIAJE = this.req.params.id;
        this.req.session.carrito.push(IDNUEVOVIAJE);
        this.res.redirect('/#sec-destinos');
    }

    verCarrito() {
        console.log('carrito:' + this.req.session.carrito);
    }
}

module.exports = controladorCarrito;