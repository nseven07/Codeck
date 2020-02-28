'use strict';

const gulp = require('gulp');


const gscss = require('gulp-scss');
const sourcemaps = require('gulp-sourcemaps');
const gclean = require('gulp-clean');
const gsass = require('gulp-sass');
const cssnano = require('cssnano');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const twig = require('gulp-twig');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const open = require('gulp-open');
const header = require('gulp-header');

const templates = './src/templates/';
const dist = './dist/';
const homePath='./src/assets/';
const nodeModules = './node_modules/';
const js = 'assets/js/  ';
const css = 'assets/css/';


const  sourceJs = [
    nodeModules + 'bootstrap/dist/js/bootstrap.min.js',
    homePath + 'js/main.js',
    homePath + 'js/alert.js',
];


function compile() {
    const twig = require('gulp-twig');
    return gulp.src('./src/templates/pages/*.html')
        .pipe(twig({
            base: './src/templates'
        }))
        .pipe(gulp.dest('./dist/templates/'))
}

function connectGulp() {
    connect.server({
        root: 'dist',
        livereload: true
    });
}

function clean() {
    return gulp.src(dist+'**/*')
        .pipe(gclean())

}

function copyImages(){
    return gulp
        .src(['./src/assets/img/**/*'])
        .pipe(gulp.dest('./dist/assets/img/'))
}

function style() {
    return gulp.src('./src/assets/css/*.scss')
        .pipe(gsass())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(connect.reload());
}


const build = gulp.series(clean, copyImages,style, compile);


exports.clean = clean;
exports.copyImages = copyImages;
exports.compile = compile;
exports.build = build;
exports.default = build;
exports.style = style;