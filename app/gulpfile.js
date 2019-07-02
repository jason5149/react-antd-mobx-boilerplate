const gulp = require('gulp')
const replace = require('gulp-replace')
const zip = require('gulp-zip')
const path = require('path')
const rename = require('gulp-rename')

if (!process.env.APP_ENV) {
  process.env.APP_ENV = 'dev'
}

const pkg = require('./package.json')
const config = require('./project.config')

const ENV = process.env.APP_ENV
const zipName = `${ pkg.name }.zip`
const source = {
  nginx:     path.join(__dirname, 'nginx.conf'),
  checkFile: path.join(__dirname, 'check.sh'),
  makefile:  path.join(__dirname, 'Makefile'),
  package:   path.join(__dirname, 'package.json'),
}

function getEnvDistRoot() {
  return path.join(config.outputDir, '../')
}
/* eslint-disable import/no-dynamic-require,no-console */

gulp.task('copy:others', () =>
  gulp.src([source.package, source.makefile]).pipe(gulp.dest(getEnvDistRoot()))
)

gulp.task('copy:checkFile', () =>
  gulp
    .src(source.checkFile)
    .pipe(replace(/\{site_url\}/g, pkg.site_url[ENV]))
    .pipe(gulp.dest(getEnvDistRoot()))
)

gulp.task('copy:nginx', () =>
  gulp
    .src(source.nginx)
    .pipe(replace(/\{app_name\}/g, pkg.name))
    .pipe(replace(/\{site_env\}/g, ENV.toUpperCase()))
    .pipe(replace(/\{site_version\}/g, pkg.version))
    .pipe(replace(/\{site_url\}/g, pkg.site_url[ENV]))
    .pipe(
      rename(currentPath => {
        currentPath.basename = pkg.name
      })
    )
    .pipe(gulp.dest(getEnvDistRoot()))
)

gulp.task('copy', ['copy:nginx', 'copy:checkFile', 'copy:others'])

gulp.task('build', ['copy'], () => {
  const root = getEnvDistRoot()
  gulp
    .src(path.join(root, '**'), {
      cwd:     path.join(root, '../'),
      cwdbase: true,
    })
    .pipe(zip(zipName, {}))
    .pipe(gulp.dest('.'))
})
