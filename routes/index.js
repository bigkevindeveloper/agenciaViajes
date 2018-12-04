var express = require('express');
var router = express.Router();
const controlador_registro = require('../controlador/auth/registroControlador');
const controlador_logeo = require('../controlador/auth/logeoControlador');
const controlador_activacion = require('../controlador/auth/activadorControlador');
const controladorMain = require('../controlador/homeControlador');
const body_parser = require('body-parser');

/**
 * Configuracion de enrutamiento.
 * **/
router.use(body_parser.urlencoded({ extended: true }));

/* Ruta index. */
router.get('/', function (req, res, next) {
    console.log('entro en funcion');
    let control = new controladorMain(res, req, next);
    control.index();
});

/* Ruta login*/
router.get('/iniciarsesion', (req, res, next) => {
    let control = new controlador_logeo(res, req, next);
    control.index();
});
router.post('/iniciosesion', (req, res, next) => {
    let control = new controlador_logeo(res, req, next);
    control.comprobacionLogeo();
});
/*Ruta de logout*/
router.get('/cerrarsesion', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});
/*Ruta para registro*/
router.get('/registrar', function (req, res, next) {
    //Inicio el enrutamiento al controlador de registro.
    let control = new controlador_registro(res, req, next);
    control.index();
});

router.post('/registropost', function (req, res, next) {
    //Inicio el proceso de paso de parametro al controlador de pagina.
    let control = new controlador_registro(res, req, next);
    control.insertarUsuario();
});

/*Ruta para el control de activacion*/

router.get('/activate/:hash', function (req, res, next){
    //Iniciamos el controlador de la pagina de activacion.
    let control = new controlador_activacion(res, req, next);
    control.activarUsuario();
});

router.get('/activado', function (req, res, next) {
    res.render('registrado');
});
/*Ruta para el panel de administracion*/
router.get('/panelcontrol', function (req, res, next) {
    res.render('administracion')
});





module.exports = router;
