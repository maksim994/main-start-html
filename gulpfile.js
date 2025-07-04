const gulp = require('gulp');
const {src, dest, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('sass');
const gulpSass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const image = require('gulp-imagemin');
const {readFileSync} = require('fs');
const typograf = require('gulp-typograf');
const webp = require('gulp-webp');
const mainSass = gulpSass(sass);
const plumber = require('gulp-plumber');
const path = require('path');
const concat = require('gulp-concat');
const rootFolder = path.basename(path.resolve());

// paths
const srcFolder = './src';
const buildFolder = './app';
const paths = {
    srcSvg: `${srcFolder}/img/svg/**.svg`,
    srcImgFolder: `${srcFolder}/img`,
    buildImgFolder: `${buildFolder}/assets/img`,
    srcScss: `${srcFolder}/scss/**/*.scss`,
    buildCssFolder: `${buildFolder}/assets/css`,
    srcFullJs: `${srcFolder}/js/**/*.js`,
    srcMainJs: `${srcFolder}/js/main.js`,
    buildJsFolder: `${buildFolder}/assets/js`,
    srcPartialsFolder: `${srcFolder}/partials`,
    resourcesFolder: `${srcFolder}/resources`,
    buildFontsFolder: `${buildFolder}/assets/fonts`,
};

let isProd = false; // dev by default

const clean = () => {
    return del([buildFolder])
}

//svg sprite
const svgSprites = () => {
    return src(paths.srcSvg)
        .pipe(
            svgmin({
                js2svg: {
                    pretty: true,
                },
            })
        )
        .pipe(
            cheerio({
                run: function ($) {
                    // $('[fill]').removeAttr('fill');
                    // $('[stroke]').removeAttr('stroke');
                    // $('[style]').removeAttr('style');
                },
                parserOptions: {
                    xmlMode: true
                },
            })
        )
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            },
        }))
        .pipe(dest(paths.buildImgFolder));
}

// scss styles
const styles = () => {
    return src(paths.srcScss, { sourcemaps: !isProd })
        .pipe(plumber(
            notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(mainSass())
        .pipe(autoprefixer({
            cascade: false,
            grid: true,
            overrideBrowserslist: ["last 5 versions"]
        }))
        .pipe(gulpif(isProd, cleanCSS({
            level: 2
        })))
        .pipe(dest(paths.buildCssFolder, { sourcemaps: '.' }))
        .pipe(browserSync.stream());
};
const scripts = () => {
    return src([
        `${srcFolder}/js/functions/**.js`,
        `${srcFolder}/js/components/**.js`,
        `${srcFolder}/js/main.js`
    ])
        // .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        // .pipe(sourcemaps.write())
        .pipe(dest(paths.buildJsFolder))
        .pipe(browserSync.stream());
}
const jsVendors = () => {
    return src(`${srcFolder}/js/vendor/**.js`)
        // .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        // .pipe(sourcemaps.write())
        // .pipe(app.gulp.dest(app.path.build.js))
        .pipe(dest(paths.buildJsFolder))
        .pipe(browserSync.stream());
}
const resources = () => {
    return src(`${paths.resourcesFolder}/**`)
        .pipe(dest(buildFolder))
}
const resourcesFont = () => {
    return src(`${paths.resourcesFolder}/fonts/**`)
        .pipe(dest(`${paths.buildFontsFolder}`))
}
const images = () => {
    return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
        .pipe(gulpif(isProd, image([
            image.mozjpeg({
                quality: 80,
                progressive: true
            }),
            image.optipng({
                optimizationLevel: 2
            }),
        ])))
        .pipe(dest(paths.buildImgFolder))
};
const webpImages = () => {
    return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`])
        .pipe(webp())
        .pipe(dest(paths.buildImgFolder))
};
const htmlInclude = () => {
    return src([`${srcFolder}/*.html`])
        .pipe(fileInclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(typograf({
            locale: ['ru', 'en-US']
        }))
        .pipe(dest(buildFolder))
        .pipe(browserSync.stream());
}
const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: `${buildFolder}`
        },
    });

    watch(paths.srcScss, styles);
    watch(paths.srcFullJs, scripts);
    watch(paths.srcFullJs, jsVendors);
    watch(`${paths.srcPartialsFolder}/**/*.html`, htmlInclude);
    watch(`${srcFolder}/*.html`, htmlInclude);
    watch(`${paths.resourcesFolder}/font/**`, resourcesFont);
    watch(`${paths.resourcesFolder}/**`, resources);
    watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
    watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
    watch(paths.srcSvg, svgSprites);
}

gulp.task('html-min', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('app'));
});

exports.default = series(clean, htmlInclude, jsVendors, scripts, styles, resources, resourcesFont,  images, webpImages, svgSprites, watchFiles);
exports.build = series(clean, htmlInclude, jsVendors, scripts, styles, resources, resourcesFont, images, webpImages, svgSprites);

