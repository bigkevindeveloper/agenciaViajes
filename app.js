var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Registrar elementos parciales.footer o header
const HBS = require('hbs');
const HBSUTILS = require('hbs-utils')(HBS);
/*Configuracion de express*/
const Session = require('express-session');
const Flash = require('connect-flash');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Gestion de la sesion
app.use(Session({
    //Parametros de configuracion.
    secret: 'app',
    name: 'coockieapp',
    resave: true,
    saveUninitialized: true
}));
app.use(Flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//Aqui registramos la carpeta con los archivos parciales.
HBS.registerPartials(`${__dirname}/views/partials`);
//Añadimos el watcher a nuestro directorio partials.
HBSUTILS.registerPartials(`${__dirname}/views/partials`);
HBSUTILS.registerWatchedPartials(`${__dirname}/views/partials`);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
/*Mapeamos las carpetas de componentes de bower*/
//app.use('/mail', require('./servicios/mailer.js'));
app.use('components', express.static(`${__dirname}/public/components`));
app.use('/img', express.static(`${__dirname}/public/images`));
app.use('/style', express.static(`${__dirname}/public/stylesheets`));
app.use('/js', express.static('public/javascripts'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
