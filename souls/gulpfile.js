const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const esbuild = require('gulp-esbuild');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: '.',
    },
    notify: false,
  });
}

function styles() {
  return src('sass/style.sass')
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.error(err.toString());
          this.emit('end');
        },
      }),
    )
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 3 versions', 'ie 11', 'not dead'],
        grid: 'autoplace',
      }),
    )
    .pipe(dest('css/'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['js/main.js'])
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.toString());
          this.emit('end');
        },
      }),
    )
    .pipe(
      esbuild({
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ['es5'],
        outfile: 'main.min.js',
      }),
    )
    .pipe(dest('js'))
    .pipe(browserSync.stream());
}

function images() {
  return src('img/**/*.*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: true,
            },
            {
              name: 'cleanupIDs',
              active: false,
            },
          ],
        }),
      ]),
    )
    .pipe(dest('img'));
}

function build() {
  return src([
    '**/*.html',
    'css/style.min.css',
    'js/lang.js',
    'js/main.min.js',
  ]).pipe(dest('dist'));
}

function cleanDist() {
  return del('dist');
}

function watching() {
  watch(['sass/**/*.sass'], styles);
  watch(['js/**/*.js', '!js/main.min.js'], scripts);
  watch(['**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);
