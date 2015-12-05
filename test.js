var express = require('express');
var app = express();
app.use(function(req,res,next){
    console.log(1);
    next();
});

app.use(function(req,res,next){
    console.log(2);
    next(new Error('not found'))
});

app.use(function(req,res,next){
    console.log(3);
    next();
});
//错误处理中间件，有四个参数，第一个参数是err
app.use(function(a,b,c,d){
    console.log(4);
    d();
});

app.listen(8080);