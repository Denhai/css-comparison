var gulp = require('gulp');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var bs = require('browser-sync')
var changed = require('gulp-changed')
var del = require('del')
var hb = require('gulp-hb')

function browsersync() {
    bs({
        server: {
            baseDir: 'docs'
        }
    })
}

gulp.task('default', ['watch'], function () {
    browsersync()
})

gulp.task('bs', browsersync)

gulp.task('watch', ['scripts', 'styles', 'public', 'html'], function () {
    gulp.watch('public/**/*', ['public'])
    gulp.watch('src/**/*.scss', ['styles'])
    gulp.watch('src/**/*.js', ['scripts'])
})

gulp.task('styles', function () {
    gulp.src(['src/**/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('docs', ''))
        .pipe(bs.reload({ stream: true }))
});


gulp.task('scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
})

gulp.task('public', function () {
    return gulp.src('public/**/*')
        .pipe(changed('docs'))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
})

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        // .pipe(changed('docs'))
        .pipe(hb({
            partials: 'src/partials/**/*.hbs',
            data: 'src/data.json'
        }))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
})

gulp.task('uncss', ['public'], function () {
    return [
        gulp.src('docs/lib/bootstrap.min.css')
            .pipe(uncss({ html: ['**/bootstrap.html'] }))
            .pipe(gulp.dest('docs/lib')),
        gulp.src('docs/lib/semantic.min.css')
            .pipe(uncss({ html: ['**/semantic.html'] }))
            .pipe(gulp.dest('docs/lib')),
        gulp.src('docs/lib/foundation.min.css')
            .pipe(uncss({ html: ['**/foundation.html'] }))
            .pipe(gulp.dest('docs/lib')),
        gulp.src('docs/lib/bulma.css')
            .pipe(uncss({ html: ['**/bulma.html'] }))
            .pipe(gulp.dest('docs/lib'))
    ]
})

gulp.task('clean', function () {
    return del('docs/**/*')
})

gulp.task('prod', ['uncss', 'scripts', 'styles'])
