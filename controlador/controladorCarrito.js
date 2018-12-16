const controlador = require('./controlador');
const viajeModelo = require('../Models/viajeModelo');

class controladorCarrito extends controlador {
    constructor(res, req, next) {
        super(res, req, next);
        
    }

    async index() {
        
        /*----CHECK-----*/ 
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
                let modelo = await viajeModelo.find({ where: { id: idViajesActuales[i].id } });
                VIAJES.push(modelo);
            } catch (e) {
                console.log('No se a podido buscar el modelo porque:' + e);
            }
        }
        /*Ya con los viajes cargado en el array de viajes en el carrito podemos mandarselos a la vista para el manejo con
         handlebars*/
        /*Cargamos el generador que nos mostraras los gastos actuales*/
        let factura = await this.panelPago();
        var totalFactura = factura.total;
        var productosFactura = factura.productos;
       
        this.res.render('cart', { viajes: VIAJES, precio: totalFactura, productos: productosFactura });
    }

    async modificarPasajeros() {
        let idViaje = this.req.params.idviaje;
        let pasajeros = this.req.body.viajeros;

        let viajesActuales = this.req.session.carrito.slice();
        console.log(viajesActuales);
        let posicion;
        for (var i = 0; i < viajesActuales.length; i++) {
            if (viajesActuales[i].id === idViaje) {
                posicion = i;
            }
        }

        this.req.session.carrito[posicion].pasajeros = pasajeros;
        this.res.redirect('/cart');
    }

    async agregarProducto() {
        let IDNUEVOVIAJE = {
            id: this.req.params.id,
            pasajeros: 1
        };
        this.req.session.carrito.push(IDNUEVOVIAJE);
        this.res.redirect('/#sec-destinos');
    }

    async panelPago() {
        let CARRITO = this.req.session.carrito.slice();
        let totalCompra = 0;
        let totalProductos ;
        for (var i = 0; i < CARRITO.length; i++) {
            //Buscamos el precio de cada Viaje y lo multiplicamos por el numero de pasajeros. 
            //Y guardamos el total en una variable, luego le aplicamos el porcentaje.
            try {
                var modelo = await viajeModelo.find({ where: { id: CARRITO[i].id } });
                
            } catch (e) {
                console.log('Error interno al obtener datos: ' + e);
            }
            totalCompra += modelo.precio * CARRITO[i].pasajeros;
            totalProductos += CARRITO[i].pasajeros;
        }
        let totalIva = (totalCompra * 19) / 100;
        totalCompra += totalIva;
        let datosCompra = {
            total: totalCompra,
            productos: totalProductos
        }
        return datosCompra;
        
    }
    

    verCarrito() {
        console.log('carrito:' + JSON.stringify(this.req.session.carrito));
    }
}

module.exports = controladorCarrito;