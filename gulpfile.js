// gulp file
var gulp        = require('gulp');
var gulp-uglify = require('gulp-uglify');
var gulp-concat = require('gulp-concat');
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');


gulp.task('js', function() {
  return gulp.src('scripts/*.js')               // #1. select all js files in the app folder
        .pipe(print())                           // #2. print each file in the stream
      .pipe(babel({ presets: ['es2015'] }))    // #3. transpile ES2015 to ES5 using ES2015 preset
      .pipe(gulp.dest('build'));               // #4. copy the results to the build folder
});

gulp.task('default', ['js', '']);
