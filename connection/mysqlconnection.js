const Mysql = require('mysql');

class mysqlConnection {
    static getConnection() {
        return Mysql.createConnection({
            // Datos de conexión
            host: 'localhost',
            user: 'root',
            password: 'mysql',
            database: 'agenciaApp'
        })
    }
}



module.exports = mysqlConnection;