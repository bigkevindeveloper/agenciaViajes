const controlador = require('./controlador');
const viajeModelo = require('../Models/viajeModelo');

class controladorCarrito extends controlador {
    constructor(res, req, next) {
        super(res, req, next);
        
    }

    async index() {
        let viajes = [];
        //Buscamos cada viaje mediante el ID que exista en el carrito.
        viajes = this.req.session.carrito.slice();
        console.log(viajes);
        
    }

    async agregarProducto() {
        let IDNUEVOVIAJE = this.req.params.id;
        this.req.session.carrito.push(IDNUEVOVIAJE);
        this.index();
        this.res.redirect('/#sec-destinos');
    }

    verCarrito() {
        console.log('carrito:' + this.req.session.carrito);
    }
}

module.exports = controladorCarrito;