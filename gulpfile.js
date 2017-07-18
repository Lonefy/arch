var gulp = require('gulp'),
    path = require('path'),
    connect = require('gulp-connect')
//  ---------------------------变量声明区------------------------------
var srcDir = 'src',
    distDir = 'build',
    version = '',
    __distDir = path.join(distDir,version),
    host = {
        host: '127.0.0.1',
        port: 80,
        html: 'index.html',
        root: [distDir]
    }
//  ---------------------------Task功能包------------------------------

// 开发模式
gulp
    // local development server

    //用于在html文件中直接include文件
    .task('include', function(done) {
        gulp.src('index.html')
        .pipe(gulp.dest(distDir))
        .on('end', done)
    })
    .task('server', ['include'], function(){
        connect.server(host);
    });