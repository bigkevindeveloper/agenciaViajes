const Sequelize = require('sequelize');

class SequelizeConf {

    static obtenerConexion() {
        /*Creamo los parametros de conexion con la base de datos.*/
        return new Sequelize('agenciaApp', 'root', 'mysql', {
            host: '127.0.0.1',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 1000
            }
        });
    }
}

module.exports = SequelizeConf;