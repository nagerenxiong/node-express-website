var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var calendar = require('./routes/calendar');
var desc = require('./routes/desc');
var infor = require('./routes/infor');
var market = require('./routes/market');
var strategy = require('./routes/strategy');
var admin = require('./routes/admin');
var post = require('./routes/post');
var login = require('./routes/login');
var edit = require('./routes/edit');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cookieSession({
  secret:'imooc',
  maxAge:60000*30,
  httpOnly:true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/index', routes);
app.use('/', routes);
app.use('/calendar', calendar);
app.use('/desc', desc);
app.use('/infor', infor);
app.use('/market', market);
app.use('/strategy', strategy);
app.use('/admin',admin);
app.use('/post',post);
app.use('/login',login);
app.use('/edit',edit);
var ueditor = require("ueditor");
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
  // ueditor 客户发起上传图片请求  
  if (req.query.action === 'uploadimage') {
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;

    var img_url = '/images/ueditor/';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做  
  }
  //  客户端发起图片列表请求  
  else if (req.query.action === 'listimage') {
    var dir_url = '/images/ueditor/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片  
  }
  // 客户端发起其它请求  
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
  }
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
