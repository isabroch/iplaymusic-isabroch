const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const open = require("gulp-open");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");


function html(done) {
  gulp.src("./src/html/templates/*.ejs")
    .pipe(ejs())
    .pipe(rename(function (path) {
      if (path.basename != "index") {
        path.dirname = path.basename;
        path.basename = "index"
      }
      path.extname = ".html";
    }))
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload());

  done();
}

function watchHtml() {
  gulp.watch("./src/html/**/*.ejs", {
    ignoreInitial: false
  }, html);
}

function scss(done) {
  gulp.src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(connect.reload());

  done();
}

function watchScss() {
  gulp.watch("./src/scss/**/*.scss", {
    ignoreInitial: false
  }, scss)
}

function js(done) {
  gulp.src("./src/scripts/**/*.js")
    .pipe(gulp.dest("./dist/assets/scripts"))
    .pipe(connect.reload());


  done();
}

function watchJs() {
  gulp.watch("./src/scripts/**/*.js", {
    ignoreInitial: false
  }, js)
}

function images(done) {
  gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'));

  done();
}

function watchImages() {
  gulp.watch("./src/images/**/*", {
    ignoreInitial: false
  }, images)
}

function connectServer(port = 8080) {
  connect.server({
    livereload: true,
    root: "dist",
    port: port
  })
}

function openInBrowser(port = 8080) {
  gulp.src('dist/index.html')
    .pipe(open({
      uri: `http://localhost:${port}/`
    }));
}

gulp.task("dev", function (done) {
  const port = 8080;
  watchHtml();
  watchScss();
  watchJs();
  watchImages();
  connectServer(port);
  openInBrowser(port);
  done();
});


gulp.task("build", function (done) {
  html(done);
  scss(done);
  js(done);
  images(done);

  done();
})