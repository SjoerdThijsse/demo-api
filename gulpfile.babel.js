import del from "del";
import gulp from "gulp";
import babel from "gulp-babel";

const dirs = {build: "build"};

const build = () => {
  gulp.src(["src/**/*/json"])
    .pipe(gulp.dest(dirs.build));

  return gulp.src(["src/**/*.js"])
    .pipe(babel())
    .pipe(gulp.dest(dirs.build));
};

gulp.task("clean", () => del([dirs.build]));
gulp.task("build", ["clean"], build);
gulp.task("default", ["clean"], build);
