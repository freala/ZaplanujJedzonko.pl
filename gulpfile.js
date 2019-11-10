let gulp = require("gulp");
let sass = require("gulp-sass");
let sourcemaps = require('gulp-sourcemaps');

gulp.task("sass", function() {
  return gulp.src("scss/**/*.scss")
  .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on("error", sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("css"))
});

gulp.task("watch", function() {
  gulp.watch("scss/**/*.scss", gulp.series("sass"));
});