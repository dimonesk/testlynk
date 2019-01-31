var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    jpegtran     = require('imagemin-jpegtran'), // Подключаем библиотеку для работы с jpg
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    sprite       = require('gulp.spritesmith'),// Подключаем библиотеку для автоматической генерации css спрайтов
    spriteStyle  = require('gulp-stylus'),// Подключаем библиотеку для стилей спрайтов
    bourbon      = require('node-bourbon'),
    babel        = require('gulp-babel'),
    iconfont     = require('gulp-iconfont'),
    iconfontCss  = require('gulp-iconfont-css'),
    sourcemaps   = require('gulp-sourcemaps');


var themePath = 'test-dizzain';
var fullPath = '/wp-content/themes/'+ themePath;


gulp.task('scripts', async  function() {
    return gulp.src([ // Берем все необходимые файлы
        themePath + '/inc/assets/js/template.js',
        themePath + '/inc/blocks/**/*.js',
    ])
        .pipe(babel({
            presets:['@babel/env'],
            includePolyfill: true
        }))
        .pipe(concat('template.min.js')) // Собираем их в кучу в новом файле template.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest(themePath + '/inc/assets/js')); // Выгружаем в папку inc/js
});

gulp.task('clean', async  function() {
    return del.sync(themePath + '/inc/css'); // Удаляем папку css перед сборкой
});

gulp.task('css-libs',gulp.series('clean', async  function (complete) {
    return gulp.src([
        themePath + '/inc/blocks/**/*.scss'
    ])
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths:bourbon.includePaths}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(concat('style.min.css'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(themePath + '/inc/assets/css')); // Выгружаем в папку app/css


}));

gulp.task('iconfont', async function(){
    gulp.src([themePath+'/inc/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: 'icons',
            path: themePath+'/inc/icons/_icons-template.scss',
            targetPath: '../blocks/icons.scss',
            fontPath: fullPath+'/inc/fonts/'
        }))
        .pipe(iconfont({
            fontName: 'icons',
            normalize: true
        }))
        .pipe(gulp.dest(themePath+'/inc/fonts/'));
});


gulp.task('sprite', function (complete) {
    // Generate our spritesheet
    var imgName = 'sprite.png';
    var spriteData = gulp.src(themePath + '/inc/img/sprite/*').pipe(sprite({
        imgName: imgName,
        cssFormat: 'scss',
        algorithm: 'binary-tree',
        imgPath:fullPath+'/inc/img/'+imgName,
        cssVarMap: function(sprite) {
            sprite.name = 'sprite-' + sprite.name
        },
        cssName: '_sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest(themePath + '/inc/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(themePath + '/inc/sass/')); // путь, куда сохраняем стили
    complete();
});

gulp.task('img', function() {
    return gulp.src(themePath + '/inc/img/**/*') // Берем все изображения из img
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(),jpegtran()]
        })))
        .pipe(gulp.dest(themePath + '/inc/img')); // Выгружаем
});

gulp.task('watch', gulp.series('css-libs','scripts', async  function() {
    gulp.watch(themePath + '/inc/blocks/**/*.scss', gulp.series('css-libs')); // Наблюдение за sass файлами в папке sass
    gulp.watch([
        themePath + '/inc/assets/js/template.js',
        themePath + '/inc/blocks/**/*.js',
    ], gulp.series('scripts'));   // Наблюдение за JS файлами в папке js
}));
