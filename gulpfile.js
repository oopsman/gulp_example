/**
 * 
 * @authors zzl81cn (zzl81cn@gmail.com)
 * @date    2015-07-10 09:49:00
 * @version $Id$
 */

var gulp = require('gulp'),
		// less = require('gulp-less'),
		// mincss = require('gulp-minify-css'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		// sass = require('gulp-sass'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		jsmin = require('gulp-uglify'),
		browserSync = require('browser-sync').create();

var src = './src',
	dest = './dist';

// gulp.task('serve', ['lessTask','sassTask','jsminTask'], function(){
gulp.task('serve', ['sassTask','jsminTask'], function(){
	browserSync.init({
		// 启动server后打开默认页面
		open: true,
		// scrollToTop
		// scrollProportionally: false,
		//镜像模式点击，滚动和表单在任何设备上输入将被镜像到所有设备里
		ghostMode: {
	    clicks: false,
	    forms: true,
	    scroll: false
		},
		server: "src",
		// 文件夹列表模式
		// directory: true,
		port: 9001
	});
	// gulp.watch("./less/*.less", ['lessTask']);
	gulp.watch("./src/styles/sass/*.scss", ['sassTask']);
	// gulp.watch("./js/*.js", ['jsminTask']);
	// node-sass require
	// gulp.watch("./css/*.css", ['autoPrefixer']);
	gulp.watch(["./src/**/*.html","./src/**/*.js"]).on('change', browserSync.reload);
});

// gulp-ruby-sass
gulp.task('sassTask', function(){
	return sass('./src/styles/sass/*.scss')
    .on('error', sass.logError)
		.pipe(autoprefixer({
					browsers: ['last 2 versions','Firefox <= 20'],
					cascade: false
				}))			
    .pipe(gulp.dest('./src/styles'))
    .pipe(browserSync.stream());
});

// gulp-sass
/*gulp.task('sassTask', function(){
 return gulp.src('./sass/!*.scss')
 .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
 // compressed,expanded
 .pipe(sass({outputStyle:'expanded'}))
 .pipe(autoprefixer({
 browsers: ['last 2 versions','Firefox <= 20'],
 cascade: false
 }))			
 .pipe(gulp.dest('./css'))
 .pipe(browserSync.stream());
 });*/

gulp.task('lessTask', function(){
	// multiple files change to array type (['','',...])
	return gulp.src('less/*.less')
			.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
			.pipe(less())
			// .pipe(mincss({compatibility: 'ie7'}))
			// .pipe(mincss())
			.pipe(autoprefixer({
						browsers: ['last 2 versions','Firefox <= 20'],
						cascade: false
					}))			

			.pipe(gulp.dest('css'))
			.pipe(browserSync.stream());
});

gulp.task('jsminTask', function(){
	return gulp.src('./js/*.js')
		.pipe(jsmin())
		.pipe(gulp.dest('./js-min'));
});

gulp.task('default', ['serve']);

// Only watch less types files
// gulp.task('default', function(){
// 	gulp.watch('less/source.less',['lessTask']);
// });