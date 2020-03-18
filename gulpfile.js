'use strict';

const gulp = require('gulp');


const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gsass = require('gulp-sass');
const cssnano = require('cssnano');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const twig = require('gulp-twig');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const open = require('gulp-open');
const header = require('gulp-header');
const imagemin = require('gulp-imagemin');

const templates = './src/templates/';
const dist = './dist/';
const homePath = './src/assets/';
const nodeModules = './node_modules/';
const js = 'assets/js/  ';
const css = 'assets/css/';
const icons = 'assets/icons/';


const sourceJs = [
    nodeModules + 'jquery/dist/jquery.js',
    nodeModules + 'wowjs/dist/wow.min.js',
    nodeModules + 'bootstrap/dist/js/bootstrap.js',
    nodeModules + 'slick-carousel/slick/slick.js',
    homePath + 'js/main.js',
    homePath + 'js/console.js',
];

const sourceSass = [
    homePath + "css/style.sass"
];

function compile() {
    const twig = require('gulp-twig');
    return gulp.src('./src/templates/pages/*.html')
        .pipe(twig({
            base: './src/templates'
        }))
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
}

function scripts() {
    return gulp.src(sourceJs)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(dist + 'assets/js'))
        .pipe(connect.reload());
}


function scriptsDev() {
    return gulp.src(sourceJs)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(dist + 'assets/js'))
        .pipe(connect.reload())
}


function connectGulp() {
    connect.server({
        root: [dist + 'templates', 'dist'],
        livereload: true
    });
}

function clean() {
    return del([dist + '**', '!' + dist])
}

function copyFiles() {
    return gulp
        .src(['./src/assets/img/**/*', './src/assets/icons/**/*', './src/assets/font/**/*'], {base: './src/'})
        //.pipe(imagemin({interlaced: true, progressive: true, optimizationLevel: 5, svgoPlugins: [{removeViewBox: true}]}))
        .pipe(gulp.dest(dist))
}

function style() {
    return gulp.src(sourceSass)
        .pipe(gsass({
            includePaths: ['node_modules']
        }))
        .pipe(gulp.dest(dist + 'assets/css'))
        .pipe(connect.reload());
}

function myWatchTasks() {
    gulp.watch(['./src/assets/css/*.sass'], style);
    gulp.watch(['./src/assets/js/*.js'], scriptsDev);
    gulp.watch(['./src/templates/**/*.html'], compile)
}

const dev = gulp.parallel(gulp.series(clean, style, copyFiles, scriptsDev, compile, connectGulp), myWatchTasks);
const build = gulp.series(clean, style, copyFiles, scripts, compile,);


exports.clean = clean;
exports.copyFiles = copyFiles;
exports.compile = compile;
exports.build = build;
exports.default = dev;
exports.dev = dev;
exports.style = style;

