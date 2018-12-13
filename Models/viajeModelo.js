const Sequelize = require('sequelize');
const conexion = require('../connection/sequelize').obtenerConexion();

let VIAJE = conexion.define('viajes', {
    viaje: {
        type: Sequelize.STRING(200)
    },
    descripcion: {
        type: Sequelize.STRING(200)
    },
    estado: {
        type: Sequelize.BOOLEAN()
    },
    precio: {
        type: Sequelize.INTEGER(10)
    },
    tipo: {
        type: Sequelize.STRING(40)
    },
    ruta: {
        type: Sequelize.STRING(150)
    },
})

module.exports = VIAJE;

