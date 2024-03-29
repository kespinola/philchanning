/**
 * Created by ksespinola on 5/9/14.
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
// changed = require('gulp-changed'),
    mocha = require('gulp-mocha'),
    colors = require('colors');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
    'src':['./lib/**/*.js','./routes/**/*.js'],
    'tests':['./test/*.js', './test/**/*.js']
};

// An error handler for the tests during gulp-watch
// Otherwise the gulp-watch will terminate
var handleError = function(err){
    console.log((err.name+': '+err.plugin+' - '+err.message).red);
    // propogate
    return;
};

// gulp lint
gulp.task('lint', function(){
    gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

});

// gulp for running the mocha tests with default dot reporter
gulp.task('test', function(){
    gulp.src(paths.tests)
        .pipe(mocha({reporter: 'dot'}))
        .on('error', handleError);

});

// gulp for running the mocha tests with spec reporter
gulp.task('spec', function(){
    gulp.src(paths.tests)
        .pipe(mocha({reporter: 'spec'}))
        .on('error', handleError);

});

/*
 * auto/watch gulp tasks that will trigger the tests on
 * file changes
 */
gulp.task('autotest', function(){
    gulp.watch(paths.src.concat(paths.tests), ['test']);
});

gulp.task('autospec', function(){
    gulp.watch(paths.src.concat(paths.tests), ['spec']);
});