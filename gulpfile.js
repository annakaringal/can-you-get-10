var gulp = require('gulp'), 
// Styles
sass = require('gulp-sass'), 
minifycss = require('gulp-cssnano'),

// Javascripts
jasmine = require('gulp-jasmine'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat'),
rev = require('gulp-rev'),

// Gulp
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
livereload = require('gulp-livereload');

var jsConcatOrder = [
  'src/js/grid.js', 
  'src/js/game.js', 
  'src/js/view.js', 
  'src/js/app.js', 
];

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
  return gulp.src(jsConcatOrder)
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(notify({  message: 'JS linted & minified' }));
});

gulp.task('default', function(){
  gulp.start('styles', 'js');
});

gulp.task('watch', function(){
  gulp.watch('src/scss/*.scss', ['styles']);
  gulp.watch('src/js/*.js', ['js']);

  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);

});