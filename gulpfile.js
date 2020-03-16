var paths = {
    html: {
        src: ['*.html']

    },
    js: {
        src: ['*.js', '!bundle.js']
    }
};
paths.watch = [paths.html.src, paths.js.src];

var browserSync = require('browser-sync');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var prefix = require('gulp-autoprefixer');
var childProcess = require('child_process');
var proxy = require('proxy-middleware');
var run = require('gulp-run');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var url = require('url');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var fs = require('fs');

gulp.task('reload', function () {
    browserSync.reload();
});

// gulp.task('browser-sync', function () {
//     var proxyOptions = url.parse('http://127.0.0.1:5001');
//     proxyOptions.route = '/';
//     browserSync({
//         open: true,
//         port: 3000,
//         server: {
//             baseDir: 'nos',
//             middleware: [proxy(proxyOptions)]
//         },
//         ghostMode: false
//     });
// });


gulp.task('js-dev', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './app.js',
        debug: true
    });

    del(['./bundle.js']);

    return b.bundle()
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(source('./app.js'))
        .pipe(buffer())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('dev-build', ['js-dev'], function (done) {
    runSequence('reload', done);
});

gulp.task('dev-watch', function () {
    gulp.watch(paths.watch, ['dev-build']);
});

gulp.task('default', function (done) {
    runSequence('dev-build', ['dev-watch', 'connect'], done);
});


gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true,
    host:'0.0.0.0'
  })
});
