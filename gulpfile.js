var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    path = {
        root: './app',
        templates: './app/templates',
        styles: './app/styles'
    };

gulp.task('slim', function(){
    gulp.src(path.templates + '/slim/*.slim')
        .pipe(plugins.slim({
            pretty: true,
            options: ["attr_delims={'(' => ')', '[' => ']'}", "encoding='utf-8'"]
        }))
        .pipe(gulp.dest(path.templates));
});

gulp.task('slim-index', function(){
    gulp.src(path.root + '/index.slim')
        .pipe(plugins.slim({
            pretty: true,
            options: ["attr_delims={'(' => ')', '[' => ']'}", "encoding='utf-8'"]
        }))
        .pipe(gulp.dest(path.root));
});

gulp.task('sass', function () {
    gulp.src(path.styles + '/sass/**/*.scss')
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sass({
            errLogToConsole: true,
            sourceComments : 'normal'
        }))
        .pipe(gulp.dest(path.styles));
});

gulp.task('browser-sync', function() {
    var files = [
        path.root + '/index.html',
        path.templates + '/*.html',
        path.styles + '/*.css',
        path.scripts + '/**/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: path.root
        }
    });
});

gulp.task('watch', function(){
    gulp.watch(path.root + '/index.slim', ['slim-index']);
    gulp.watch(path.templates + '/slim/*.slim', ['slim']);
    gulp.watch(path.styles + '/sass/**/*.scss', ['sass']);
});

gulp.task('usemin', function(){
    gulp.src(path.root + '/*.html')
        .pipe(plugins.usemin({
            css: [
                plugins.minifyCss(),
                'concat',
                plugins.rev()
            ],
            // html: [minifyHtml({empty: true})],
            js: [
                plugins.uglify(),
                plugins.rev()
            ]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['watch', 'browser-sync']);