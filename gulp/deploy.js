var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var conf = require('./conf');
var path = require('path');

gulp.task( 'ftp-deploy',['build'], function () {

    var conn = ftp.create( {
        host: "ftp.nporto.com",
        user: "nport_251185",
        password: "k!ll4@ll",
        parallel: 1,
        log: gutil.log
    } );

    var globs = [
        path.join(conf.paths.dist, '/**')
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: 'dist', buffer: false } )
        .pipe( conn.newer( '/httpdocs/new' ) ) // only upload newer files
        .pipe( conn.dest( '/httpdocs/new' ) );

} );

gulp.task( 'cv-deploy', function () {

    var conn = ftp.create( {
        host: "ftp.nporto.com",
        user: "nport_251185",
        password: "k!ll4@ll",
        parallel: 1,
        log: gutil.log
    } );

    var globs = [
        path.join(conf.paths.src, '/resume/en/**')
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: 'src/resume/en', buffer: false } )
        .pipe( conn.newer( '/httpdocs/cv' ) ) // only upload newer files
        .pipe( conn.dest( '/httpdocs/cv' ) );

} );
