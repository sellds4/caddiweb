var assign = require('lodash.assign'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    clean = require('gulp-clean'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    htmlreplace = require('gulp-html-replace'),
    jeet = require('jeet'),
    rupture = require('rupture'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    streamify = require('gulp-streamify'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

var path = {
    HTML: 'src/index.html',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'bundle.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'dist/src',
    ENTRY_POINT: ['./src/js/App.jsx']
};

gulp.task('copy', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
    gulp.watch(path.HTML, ['copy']);
});

// add custom browserify options here
var customOpts = {
    entries: path.ENTRY_POINT,
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 
// add transformations here
// i.e. b.transform(coffeeify);
b.transform(babelify)

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(path.OUT))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
           // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest(path.DEST_SRC));
}

gulp.task('cleancss', function() {
    return gulp.src(['./client/css'])
    .pipe(clean());
});

gulp.task('stylus', ['cleancss'], function() {
    gulp.src('./client/stylus/main.styl')
        .pipe(stylus(
            {
                use: [jeet(), rupture()]
            }
        ))
        .pipe(gulp.dest('./client/css'))
});

gulp.task('build', function(){
    browserify({
        entries: path.ENTRY_POINT,
        transform: [babelify],
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(buffer())
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch', 'js', 'stylus']);
