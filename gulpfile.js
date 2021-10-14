var gulp = require("gulp"),
  sass = require('gulp-sass')(require('sass')),
  sassLint = require("gulp-sass-lint"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  notify = require("gulp-notify"),
  browserSync = require("browser-sync"),
  plumber = require("gulp-plumber"),
  // gulp.series = require("run-sequence"),
  del = require("del"),
  twig = require("gulp-twig"),
  foreach = require("gulp-foreach"),
  sourcemaps = require("gulp-sourcemaps"),
  changed = require("gulp-changed")
  ;


// Paths
var paths = {
  dist: "dist/",
  src: "src/",
  deploy: "dist/**/*",
  templates: "dist/templates/",
  // html: "dist/*.html",
  browserSync: "./dist",
  sass: {
    inputAll: "src/assets/scss/**/*.scss",
    input: "src/assets/scss/pages/*",
    output: "dist/assets/css",
    lint: "src/assets/scss/**/*.s+(a|c)ss"
  },
  jsVendor: {
    input: "src/lib/**/js/*.js",
    output: "dist/lib/"
  },
  cssVendor: {
    input: "src/lib/**/css/*.css",
    output: "dist/lib/"
  },
  js: {
    input: "src/assets/js/*.js",
    output: "dist/assets/js/"
  },
  img: {
    input: "src/assets/images/**/*",
    output: "dist/assets/images/"
  },
  twig: {
    inputAll: "src/templates/**/*.{twig,html}",
    inputSections: "!src/templates/sections/*.{twig,html}",
    inputComponents: "!src/templates/components/*.{twig,html}"
  },

  /*  misc: {
     xml: "src/*.xml",
     txt: "src/*.txt",
     hta:"src/.htaccess",
     vendor:"src/vendor/",
 
   } */
  //  misc:["src/*.xml","src/*.txt","src/.htaccess","src/vendor/**/*","src/config/**/*","src/config.php","src/controllers/*","src/data/*"]
};

// Catch stream errors
var onError = function (err) {
  notify.onError({
    title: "Gulp error in " + err.plugin,
    message: err.toString()
  })(err);
};

// Browser Sync
gulp.task("browser-sync", function () {
  console.log("Start Server");
  browserSync.init({
    proxy: "localhost/golden-design/dist/",
  });
});

// Clean dist
gulp.task("clean:dist", function () {
  return del([
    paths.dist
  ]);
});

// CSS
gulp.task("css", function () {
  return gulp
    .src(paths.sass.input)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 2 versions"))
    // .pipe(sourcemaps.write("./", { addComment: false }))
    .pipe(gulp.dest(paths.sass.output))
    .pipe(browserSync.reload({ stream: true }));
});

// Sass Lint
gulp.task("sass-lint", function () {
  return gulp
    .src(paths.sass.lint)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// JS Vendor
gulp.task("js:vendor", function () {
  return gulp
    .src(paths.jsVendor.input)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    // .pipe(concat("vendor.js"))
    .pipe(uglify())
    // .pipe(sourcemaps.write("./", { addComment: false }))
    .pipe(gulp.dest(paths.jsVendor.output))
    .pipe(browserSync.reload({ stream: true }));
});

// CSS Vendor
gulp.task("css:vendor", function () {
  return gulp
    .src(paths.cssVendor.input)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    // .pipe(concat("vendor.js"))
    .pipe(uglify())
    // .pipe(sourcemaps.write("./", { addComment: false }))
    .pipe(gulp.dest(paths.cssVendor.output))
    .pipe(browserSync.reload({ stream: true }));
});

// JS Main
gulp.task("js:main", function () {
  return gulp
    .src([paths.js.input])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    // .pipe(concat("main.min.js"))
    .pipe(uglify())
    // .pipe(sourcemaps.write("./", { addComment: false }))
    .pipe(gulp.dest(paths.js.output))
    .pipe(browserSync.reload({ stream: true }));
});

// Images
gulp.task("images", function () {
  return gulp
    .src([paths.img.input], {
      dot: true // include hidden files
    })
    .pipe(changed(paths.img.output)) 
    .pipe(gulp.dest(paths.img.output))
    .pipe(browserSync.reload({ stream: true }));
});

// Twig
gulp.task("twig", function () {
  return gulp
    .src([
      paths.twig.inputAll,
      paths.twig.inputSections,
      paths.twig.inputComponents,
    ])
    .pipe(
      plumber({
        errorHandler: function (error) {
          console.log(error.message);
          this.emit("end");
        }
      })
    )
    .pipe(
      foreach(function (stream, file) {
        return stream.pipe(twig());
      })
    )
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.templates))
    .pipe(browserSync.reload({ stream: true }))
    ;
});

// Copy:misc
gulp.task("copy:misc", function () {
  console.log(paths.twig.inputComponents);
  return gulp
    .src([
      paths.src + "**/*",
      paths.src + '.htaccess',
      '!src/assets/scss{,/**}'
    ])
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({ stream: true }));
});

// Watch
gulp.task("gulp-watch", function () {
  gulp.watch(paths.src, gulp.series(["copy:misc"]));
  gulp.watch(paths.img.input, gulp.series(["images"]));
  gulp.watch(paths.sass.inputAll, gulp.series(["css"]));
  gulp.watch(paths.js.input, gulp.series(["js:main"]));
  gulp.watch(paths.cssVendor.input, gulp.series(["css:vendor"]));
  gulp.watch(paths.jsVendor.input, gulp.series(["js:vendor"]));
  gulp.watch(paths.twig.inputAll, gulp.series(["twig"]));
});

// Build
gulp.task("build", gulp.series("clean:dist", "copy:misc", "css", "js:main","css:vendor","js:vendor", "images", "twig"));

// Watch
gulp.task("watch", gulp.parallel("gulp-watch", "browser-sync"));
// Default
gulp.task("default", gulp.series("build", gulp.parallel("gulp-watch", "browser-sync")));

