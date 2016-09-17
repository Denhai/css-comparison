var gulp = require('gulp');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var bs = require('browser-sync')
var changed = require('gulp-changed')
var del = require('del')
var hb = require('gulp-hb')
var uglify = require('gulp-uglify');
var browserify = require('browserify')
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var cleancss = require('gulp-clean-css');

function browsersync() {
    bs({
        server: {
            baseDir: 'docs',
            middleware: function (req, res, next) {
                req.url = req.url.replace('/css-comparison', '')
                next()
            }
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
    gulp.watch(['src/**/*.html'], ['html'])
    // Cannot tell what files are affected by the template; so rebuild all of them.
    gulp.watch(['src/**/*.hbs'], ['html-all'])
})

gulp.task('styles', function () {
    gulp.src(['src/**/*.scss'])
        .pipe(changed('docs'))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
});

gulp.task('scripts', function () {
    return gulp.src('src/**/*.js', { read: false })
        .pipe(tap(function (file) {
            file.contents = browserify(file.path).bundle();
        }))
        .pipe(buffer())
        // .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel({ presets: ['es2015'], compact: false }))
        .pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
})

gulp.task('public', function () {
    return gulp.src('public/**/*')
        .pipe(changed('docs'))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
})

gulp.task('html-all', function () {
    return gulp.src('src/**/*.html')
        .pipe(hb({
            partials: 'src/partials/**/*.hbs',
            data: 'src/data.json'
        }))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
})

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(hb({
            partials: 'src/partials/**/*.hbs',
            data: 'src/data.json'
        }))
        .pipe(changed('docs'))
        .pipe(gulp.dest('docs'))
        .pipe(bs.reload({ stream: true }))
})

gulp.task('uncss', ['styles', 'html'], function () {
    var libs = [
        {name: 'bootstrap', ignore: [/open/, /collapsing/]}, 
        {name: 'semantic', ignore: [/transition/]}, 
        {name: 'foundation', ignore: [/foundation\-mq/, /top\-bar/, /title\-bar/ , /menu/]},
        {name: 'bulma', ignore: []}
    ]
    var tasks = []
    tasks = libs.map(function (library) {
        return gulp.src(`docs/styles/${library.name}.css`)
            .pipe(uncss({
                html: [`src/**/${library.name}.html`],
                ignore: library.ignore
            }))
            .pipe(cleancss())
            .pipe(gulp.dest('docs/styles'))
    })
    return tasks
})

gulp.task('clean', function () {
    return del('docs/**/*')
})

gulp.task('prod', ['uncss', 'scripts', 'public'])
