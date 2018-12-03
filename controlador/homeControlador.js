const controlador = require('../controlador/controlador');

class controladorMain extends controlador {
    constructor (res,req,next){
        super(res, req, next);
    }
    index() {
        //Si hay una session habilitamos el nombre de usuario en el header.
        if (this.req.session.username) {
            this.res.render('index', { username: this.req.session.username });
        }
        //Si no simplemente dejamos el main como esta.
        this.res.render('index');
    }
}
module.exports = controladorMain;