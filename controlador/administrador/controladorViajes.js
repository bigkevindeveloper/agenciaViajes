const controlador = require('../controlador');
const mv = require('../../Models/viajeModelo');
class controladorViaje extends controlador {
    constructor(res, req, next) {
        super(res, req, next);
    }

    index() {
        this.res.send('pagina okey');
    }
    async addviaje(imagen) {

        /*Recogemos los datos del formulario*/
        
        var viaje = this.req.body.viaje;
        var descripcion = this.req.body.descripcion;
        var precio = this.req.body.precio;
        var tipoviaje = this.req.body.tipoviaje;

        var estado = this.req.body.estado;
        var opEstado = false;

        /*Comprobamos el valor del estado (activado o desactivado) Para darle un valor al objeto que subiremos a la BD*/
        if (estado === 'activo') {
            opEstado = true;
        }
        if (estado === 'desactivo') {
            opEstado = false;
        }
        console.log(tipoviaje);
        try {
            /*Creamos el model que se subira a la base de datos*/
            var ruta = {
                viaje: viaje,
                descripcion: descripcion,
                estado: opEstado,
                precio: precio,
                tipo: tipoviaje,
                ruta: imagen
            }
            /*Preparamos la subida a la base de datos*/
            let resultado = await mv.create(ruta);
            this.res.redirect('/panelcontrol');
        } catch (e) {
            console.log('Error al realizar la peticion -> ' + e);
        }
        
    }

    async borrarViaje() {
        console.log('entro a la funcion');
        let idviaje = this.req.body.id;
        try {
            var respuesta = await mv.destroy({ where: { id: idviaje } });
            this.req.flash.borrado = 'Viaje borrado correctamente';
            this.res.redirect('/panelcontrol');
        } catch (e) {
            this.req.flash.borrado = 'Error al borrar el viaje';
            this.res.redirect('/panelcontrol');
            console.log('Error al borra el modelo porque -> ' + e);
        }
    }
}

module.exports = controladorViaje;