
var gulp = require("gulp"),
    server = require("gulp-server-livereload"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-csso');

//server
gulp.task('start', function() {
    gulp.src('app')
      .pipe(server({
        livereload: true,
        open: true
      }));
  });

//styles
gulp.task('style', function() {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(plumber(errorHandler))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'] 
    }))
    .pipe(gulp.dest('app/css'));
});


//build
gulp.task('build', function() {
  return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('public'));
})


gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.scss', ['style']);
});


gulp.task('default', ['start', 'watch']);

//other functions 
function errorHandler(error) {
  util.beep();
  return true;
}