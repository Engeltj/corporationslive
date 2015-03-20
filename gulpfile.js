var gulp = require('gulp');

var bower_components = {
"src" : [
  "bower_components/jquery/dist/jquery.js",
  "bower_components/angular/angular.js",
  "bower_components/angular-animate/angular-animate.js",
  "bower_components/angular-ui-router/release/angular-ui-router.js",
  "bower_components/bootstrap/dist/js/bootstrap.js",
  "bower_components/bootstrap/dist/fonts/*",
  "bower_components/bootstrap/dist/css/bootstrap.css*",
  "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
  "bower_components/angular-http-auth/src/http-auth-interceptor.js",
  "bower_components/angular-local-storage/dist/angular-local-storage.js",
  "bower_components/ngstorage/ngStorage.min.js"
],
"dest" : "public/"
}

gulp.task('copy-bower-components', function() {
    return gulp.src(bower_components.src,{ base: './' })
        .pipe(gulp.dest(bower_components.dest));
});

gulp.task('default', ["copy-bower-components"]);