const { parallel, src, dest, watch } = require('gulp');
const babel = require('gulp-babel');

const rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    terser = require('gulp-terser'),
    stylus = require('gulp-stylus'),
    rupture = require('rupture'),
    nib = require('nib');

function styles() {
    return src('stylus/init.styl')
        .pipe(stylus({
            'include css': true,
            compress: true,
            use: [nib(), rupture()]
        }))
        .pipe(rename({
            basename: 'main',
            suffix: '.min',
            extname: ".css"
        }))
        .pipe(dest('../assets/css/'));
}

function scripts() {
    return src('scripts/**/*.js')
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min', extname: ".js" }))
        .pipe(terser())
        .pipe(dest('../assets/js/'));
}

function watchScripts() {
    return watch('scripts/**/*.js', { ignoreInitial: false }, scripts);
}

function watchStyles() {
    return watch('stylus/**/*.styl', { ignoreInitial: false }, styles);
}

exports.default = parallel(watchScripts, watchStyles);