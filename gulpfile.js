var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

/**
 * Tarea default, ejecuta browser y min solo escribiendo gulp en consola
 */
gulp.task("default", ['browser', 'min']);

/**
 * Task de minificar
 */
gulp.task("min",()=>{
    return gulp.src('public_html/js/config-dom.js')
        .pipe(uglify())
        .pipe(gulp.dest('public_html/js/config-dom.min.js'));
});

/**
 * Task servidor web
 */
gulp.task("browser", ()=>{
    browserSync.init({
        server: {
            baseDir:"./"
        }
    });
});

/**
 * Minifica tras cambios
 */
gulp.watch("js/main.js").on("change", ()=>{
    return gulp.src('public_html/js/config-dom.js')
        .pipe(uglify())
        .pipe(gulp.dest('public_html/js/config-dom.min.js'));
});

/**
 * Actualiza navegador tras cambios
 */
gulp.watch(['index.html', 'public_html/js/config-dom.js']).on('change', ()=>{
    browserSync.reload();
});