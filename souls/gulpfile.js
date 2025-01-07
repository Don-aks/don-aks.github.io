const {src, dest, watch, parallel, series} = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
// const del           = require('del');
const browserSync   = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
    notify: false
  })
}

function styles() {
  return src('sass/style.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('css/'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(['js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('img/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: true
          },
          {
            name: 'cleanupIDs',
            active: false
          }
        ]
      })
    ]))
    .pipe(dest('img'))
}

function build() {
  return src([
      '**/*.html',
      'css/style.min.css',
      'js/main.min.js'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

/*function cleanDist() {
  return del('dist');
}*/

function watching() {
  watch(['sass/**/*.sass'], styles);
  watch(['js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['**/*.html']).on('change', browserSync.reload)
}

exports.styles      = styles;
exports.scripts     = scripts;
exports.browsersync = browsersync;
exports.watching    = watching;
exports.images      = images;
// exports.cleanDist   = cleanDist;
exports.build       = series(images, build);

exports.default  = parallel(styles, scripts, browsersync, watching);