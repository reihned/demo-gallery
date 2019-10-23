var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const vueRenderer = require('@doweb/vuexpress').vueRenderer;

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var imagesRouter = require('./routes/images');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

let options = {
  // folder with your views
  views: './views',
  // cache templates
  cache: true,
  // use watch = true only in dev mode! Will start webpack watcher only on the current request.
  watch: (process.env.NODE_ENV === "development"),
  // meta info - check out https://github.com/ktquez/vue-head for more information
  metaInfo: {
    title: 'demo-gallery'
  },
  // extract css to file, otherwise it will be inline
  extractCSS: true,
  // css output folder, extracted styles from your *.vue files
  cssOutputPath: 'stylesheets/style.css',
  // path to your web root
  publicPath: './public',
  // global vars, access directly like window.
  globals: {
    appName: 'demo-gallery'
  },
  plugins: [
    // vue plugins
    // require('your-plugin')
  ],
  compilerConfig: {
    // custom webpack config
  },
  compilerConfigCallback: function (webpackConfig) {
    // change the merged webpackconfig if you like
    return webpackConfig;
  },
  onError: (err) => { }, // error handler
  onReady: () => { } // ready event handler, when completed the work of initialization
};
const renderer = vueRenderer(options);
app.use(renderer);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/images', imagesRouter);

app.set('json spaces', 2)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
