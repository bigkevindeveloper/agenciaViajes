let conn = require('../connection/mysqlconnection');

class usuario {
    constructor() {
        this.conn = conn.getConnection();
    }
   
    //Insertar usuario.
    insert(user) {
        return new Promise((res, req) => {
            if (!conn) return rej('No se conecto a la BDD');
            let CONSULTA = 'INSERT INTO usuarios SET ?';
            this.conn.query(CONSULTA, [user], (error, respuesta) => {
                if (error) return rej('No se pudo insertar el usuario por: ' + error);
                return res(respuesta);
            });
        });
    }
    obtenerTodos() {
        return new Promise((res, req) => {
            if (!conn) return rej("No se conecto a la BDD");
            let CONSULTA = 'SELECT * FROM usuarios';
            this.conn.query(CONSULTA, (error, respuesta) => {
                if (error) return rej("No se pudieron obtener los usuario -> " + error);
                return res(respuesta);
            })
        })
    }
    obtenerByEmail(email) {
        return new Promise((res, req) => {
            if (!conn) return rej('No se conecto a la BDD');
            let CONSULTA = 'SELECT * from usuarios where email="' + email + '"';
            console.log(CONSULTA);
            this.conn.query(CONSULTA, (error, respuesta) => {
                if (error) return req("No se pudo obtener el  usuario -> " + error);
                return res(respuesta);
            });
        })
    }

    obtenerByHash(hash) {
        return new Promise((res, req) => {
            if (!conn) return rej('No se conecto a la BDD');
            let CONSULTA = 'SELECT * from usuarios where hash="' + hash + '"';
            console.log(CONSULTA);
            this.conn.query(CONSULTA, (error, respuesta) => {
                if (error) return req("No se pudo obtener el  usuario -> " + error);
                return res(respuesta);
            });
        })
    }

    activarUsuario(id) {
        return new Promise((res, req) => {
            if (!conn) return rej('No se conecto a la BDD');
            let CONSULTA = `UPDATE usuarios SET active = 1 WHERE id = ${id}`;
            console.log(CONSULTA);
            this.conn.query(CONSULTA, (error, respuesta) => {
                if (error) return req("No se pudo obtener el  usuario -> " + error);
                return res(respuesta);
            });
        })
    }

    borrarHash(id) {
        return new Promise((res, req) => {
            if (!conn) return rej('No se conecto a la BDD');
            let CONSULTA = `UPDATE usuarios SET hash = null WHERE id = ${id}`;
            console.log(CONSULTA);
            this.conn.query(CONSULTA, (error, respuesta) => {
                if (error) return req("No se pudo borrar el hash -> " + error);
                return res(respuesta);
            });
        })
    }

}

module.exports = usuario;






