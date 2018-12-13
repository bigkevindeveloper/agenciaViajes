const Sequelize = require('sequelize');
const configuracion = require('../connection/sequelize');
const conexion = configuracion.obtenerConexion();

const USUARIO = conexion.define('usuarios', {
    usuario: {
        type: Sequelize.STRING(50)
    },
    email: {
        type: Sequelize.STRING(100)
    },
    password: {
        type: Sequelize.STRING(200)
    },
    active: {
        type: Sequelize.BOOLEAN()
    },
    hash: {
        type: Sequelize.STRING(100)
    },
    role: {
        type: Sequelize.INTEGER(10)
    },

});

module.exports = USUARIO;