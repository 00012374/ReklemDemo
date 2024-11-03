import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';

const { src, dest, series, watch } = gulp; // Destructure from the default import

const scss = gulpSass(sass);

// Styles task
function styles() {
    return src('./app/src/scss/**/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false }))
        .pipe(cleanCSS())
        .pipe(dest('./app/dist/css/'));
}

// Scripts task
function scripts() {
    return src('./app/src/scripts/**/*.js')
        .pipe(terser())
        .pipe(dest('./app/dist/scripts/'));
}

// Watch task
function watchTask() {
    watch(
        ['./app/src/scss/**/*.scss', './app/src/scripts/**/*.js'],
        series(styles, scripts)
    );
}

// Export default task
export default series(styles, scripts, watchTask);
