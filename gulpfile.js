const gulp = require("gulp"),
      gls = require("gulp-live-server"),
      rimraf = require("gulp-rimraf"),
      jshint = require("gulp-jshint"),
      concat = require("gulp-concat"),
      uglify = require("gulp-uglify"),
      sourcemaps = require("gulp-sourcemaps"),
      sass = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      pug = require("gulp-pug"),
      babel = require("gulp-babel");

const jsFiles = [
  "src/modules/**/*.js",
  "src/modules/app.js"
];

gulp.task("public", () =>
  gulp.src("src/public/**/*.*")
    .pipe(gulp.dest("dist/"))
);

gulp.task("libs:js", () =>
  gulp.src([
    "bower_components/lodash/dist/lodash.min.js",
    "bower_components/moment/min/moment.min.js",
    "bower_components/moment/locale/pt-br.js",
    "bower_components/angular/angular.min.js",
    "bower_components/angular-i18n/angular-locale_pt-br.js",
    "bower_components/angular-route/angular-route.min.js",
    "bower_components/angular-animate/angular-animate.min.js",
    "bower_components/angular-messages/angular-messages.min.js",
    "bower_components/angular-aria/angular-aria.min.js",
    "bower_components/angular-jwt/dist/angular-jwt.min.js",
    "bower_components/angular-material/angular-material.min.js",
    "bower_components/angular-material-data-table/dist/md-data-table.min.js",
    "bower_components/md-form-validator/dist/md-form-validator.min.js",
    "bower_components/angular-material-icons/angular-material-icons.min.js",
    "bower_components/mdPickers/dist/mdPickers.min.js",
    "bower_components/angular-input-masks/angular-input-masks-standalone.js"
  ])
    .pipe(concat("libs.min.js"))
    .pipe(gulp.dest("dist/js"))
);

gulp.task("libs:sass", () =>
  gulp.src([
    "bower_components/angular-material/angular-material.min.css",
    "bower_components/angular-material-data-table/dist/md-data-table.min.css",
    "bower_components/angular-material-icons/angular-material-icons.css",
    "bower_components/mdPickers/dist/mdPickers.min.css"
  ])
    .pipe(concat("libs.css"))
    .pipe(gulp.dest("./dist/css"))
);

gulp.task("lint", () =>
  gulp.src(jsFiles).pipe(jshint()).pipe(jshint.reporter("default"))
);

gulp.task("js", ["lint"], () =>
  gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat("all.min.js"))
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("dist/js"))
);

gulp.task("sass", () =>
  gulp.src("src/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(concat("styles.css"))
    .pipe(autoprefixer({
      browsers: ["last 3 versions"],
      cascade: false
    }))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("dist/css"))
);

gulp.task("pug", () =>
  gulp.src("src/modules/**/*.pug")
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("dist/"))
);

gulp.task("clean", () =>
  gulp.src(["dist/"], {
    read: false
  })
  .pipe(rimraf())
);

gulp.task("libs", ["libs:js", "libs:sass"]);
gulp.task("compile", ["public", "libs", "js", "sass", "pug"]);

gulp.task("server-watch", ["watch"], () => {
  const server = gls("server/server.js");

  gulp.watch("dist/**/*.{css,html,js}", (file) => {
    server.notify.apply(server, [file]);
  });

  gulp.watch("server/**/*.js", () => {
    server.start.bind(server)();
  });

  server.start.bind(server)();
});

gulp.task("watch", ["compile"], () => {
  gulp.watch(jsFiles, ["js"]);
  gulp.watch("src/**/*.scss", ["sass"]);
  gulp.watch("src/**/*.pug", ["pug"]);
});

gulp.task("default", ["server-watch"]);
