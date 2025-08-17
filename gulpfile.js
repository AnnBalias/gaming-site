const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

// HTML task
function html() {
  return gulp
    .src(["src/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// SCSS task
function styles() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sass({
      includePaths: ['src/scss']
    }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css"))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

// JS task
function scripts() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

// Assets task
function assets() {
  return gulp
    .src("src/assets/**/*")
    .pipe(gulp.dest("dist/assets"))
    .pipe(browserSync.stream());
}

// Data task
function data() {
  return gulp
    .src(["src/data.json", "src/config/*.js"])
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// Clean task
function clean() {
  const del = require("del");
  return del(["dist/**/*"]);
}

// Watch task
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
    open: false,
    notify: false
  });

  gulp.watch("src/**/*.html", html);
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("src/assets/**/*", assets);
  gulp.watch("src/data.json", data);
  gulp.watch("src/config/*.js", data);
}

// Build task
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, assets, data));

// Dev task
const dev = gulp.series(build, watch);

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.assets = assets;
exports.data = data;
exports.clean = clean;
exports.watch = watch;
exports.build = build;
exports.dev = dev;
exports.default = dev;
