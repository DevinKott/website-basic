const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-html', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
    return gulp.src('src/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-files', () => {
    return gulp.src('src/robots.txt')
      .pipe(gulp.dest('dist'));
  });  

gulp.task('default', gulp.parallel('minify-html', 'minify-css', 'copy-files'));
