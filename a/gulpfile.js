const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();



gulp.task("browserSync", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
    })
})

gulp.task("sass", () => {
    return gulp.src("sass/styles.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("watch", ["browserSync", "sass"], () => {
    gulp.watch("sass/*.scss", ["sass"]);
    gulp.watch("index.html", browserSync.reload);
});