var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//收藏夹图标
var logger = require('morgan');//日志记录器
var cookieParser = require('cookie-parser');//处理cookie -> req.cookie
var bodyParser = require('body-parser');//处理请求体-> req.body

var routes = require('./routes/index');//主页路由
var users = require('./routes/users');//用户路由
var articles = require('./routes/articles');//文章路由
var app = express();//

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板存放的路径
app.set('view engine', 'ejs');//设置模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('tiny'));//日志输出中间件
app.use(bodyParser.json());//解析json请求体
app.use(bodyParser.urlencoded({ extended: false }));//解析表单提交过来格式的请求体
app.use(cookieParser());//处理cookie req.headers.cookie->req.cookie username=zfpx; password=6 {username:'zfpx',password:6}
app.use(express.static(path.join(__dirname, 'public')));
require('./db');
app.use('/', routes);//根据用户请求的路径不同，调用不同的回调函数
app.use('/users', users);
app.use('/articles', articles);
// catch 404 and forward to error handle捕捉404错误并发送至错误处理中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;//响应码
  next(err);//next里如果传了参数意味出错了，并交由错误
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
