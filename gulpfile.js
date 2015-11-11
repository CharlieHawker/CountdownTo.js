var gulp = require('gulp');
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint');


gulp.task('lint', function() {
  return gulp.src('js/countdown.to.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', ['lint'], function() {
  gulp.src('test/test.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .once('error', function() { process.exit(1) })
    .once('end', function() { process.exit() });
});

gulp.task('default', ['test']);