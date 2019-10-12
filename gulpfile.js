var gulp = require('gulp'),
    connect = require('gulp-connect'),
    changed = require('gulp-changed'),
    rigger = require('gulp-rigger'),
    embedSvg = require('gulp-embed-svg'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify'),
    htmlminify = require("gulp-html-minify"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber');

gulp.task('server', function () {
    connect.server({
        port: 9000,
        root: 'dist',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(htmlminify())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
});
gulp.task('embedSvgs', function () {
    gulp.src('./dist/*.html')
        .pipe(embedSvg())
        .pipe(gulp.dest('./dist'))
});

gulp.task('sass', function () {
    gulp.src('./src/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
});

gulp.task('js', function () {
    gulp.src('./src/js/main.js')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
});

gulp.task('image', function () {
    gulp.src('./src/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(changed('./dist/images'), {
            hasChanged: changed.compareContent
        })
        .pipe(gulp.dest('./dist/images'))
        .pipe(connect.reload())
});
gulp.task('fonts', function () {
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
});
gulp.task('watch', function () {
    watch('./src/**/*.html', function (event, cb) {
        gulp.start('html');
    });
    watch('./src/scss/**/*.scss', function (event, cb) {
        gulp.start('sass');
    });
    watch('./src/js/**/*.js', function (event, cb) {
        gulp.start('js');
    });
    watch('./src/images/**/*.*', function (event, cb) {
        gulp.start('image');
    });
    watch('./src/fonts/**/*.*', function (event, cb) {
        gulp.start('fonts');
    });
});

gulp.task('start', ['server', 'watch']);
