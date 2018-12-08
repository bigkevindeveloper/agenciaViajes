let conn = require('../connection/mysqlconnection');

class viaje {
    constructor() {
        this.conn = conn.getConnection();
    }

    /*Insertar viaje en la base de datos*/
    insert(viaje) {
        return new Promise((res, req) => {
            if (!conn) return rej('No se conecto a la BDD');
            let CONSULTA = 'INSERT INTO viajes SET ?';
            this.conn.query(CONSULTA, [viaje], (error, respuesta) => {
                if (error) return rej('No se pudo insertar el viaje por: ' + error);
                return res(respuesta);
            });
        });
    }
    /*Obtener todos los viajes de la base de datos*/
    obtenerTodos() {
        return new Promise((res, req) => {
            if (!conn) return rej("No se conecto a la BDD");
            let CONSULTA = 'SELECT * FROM viajes';
            this.conn.query(CONSULTA, (error, respuesta) => {
                if (error) return rej("No se pudieron obtener los viajes -> " + error);
                return res(respuesta);
            })
        })
    }

    /*Borrar usuario*/
    borrarViaje(id) {
        return new Promise((res, req) => {
            if (!conn) return rej("No se conecto a la BDD");
            let CONSULTA = `DELETE FROM viajes WHERE id = ${id}`;
            this.conn.query(CONSULTA, (error, respuesta) => {
                if (error) return rej("No se pudo borrar el viaje -> " + error);
                return res(respuesta);
            })
        })
    }

}

module.exports = viaje;