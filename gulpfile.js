var gulp = require("gulp");
var watch = require("gulp-watch");
var livereload = require("gulp-livereload");

var watchFiles = [
	"tableHeadFixer.js",
	"examples/*.html"
];

gulp.task("watch", function() {
	livereload.listen();
	gulp.watch(watchFiles, function() {
		livereload.reload();
	});
});

gulp.task("default", ["watch"]);