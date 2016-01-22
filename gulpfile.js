var gulp = require('gulp'), 
sass = require('gulp-sass'), 
minifycss = require('gulp-cssnano'),
jasmine = require('gulp-jasmine'),
jshint = require('gulp-jshint'),
rev = require('gulp-rev'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
uglify = require('gulp-uglify');

gulp.task('styles', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(notify({ message: 'Sass compiled and minified'}));
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(notify({  message: 'JS linted & minified' }));
});

gulp.task('default', function(){
  gulp.start('styles', 'js');
});