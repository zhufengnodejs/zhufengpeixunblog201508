var express = require('express');
var middleware = require('../middleware');
var router = express.Router();
/* GET users listing. */
router.get('/reg',middleware.checkNotLogin, function(req, res, next) {
  if(req.session.user){//已经登陆过了
      req.flash('error','你已经登陆，不能重复登陆');
      res.redirect('back');
  }else{
      res.render('user/reg',{});
  }

});

router.post('/reg',middleware.checkNotLogin, function(req, res, next) {
    var user =  req.body;//读取用户提交过来的注册表单
    new Model('User')(user).save(function(err,user){
        if(err){
            res.redirect('/users/reg');
        }else{
            res.redirect('/users/login');
        }
    });
});

router.get('/login',middleware.checkNotLogin, function(req, res, next) {
  res.render('user/login',{});
});

router.post('/login',middleware.checkNotLogin, function(req, res, next) {
    var user = req.body;
    Model('User').findOne(user,function(err,user){
        if(user){
            req.session.user = user;
            req.flash('success','登陆成功');
            res.redirect('/')
        }else{
            req.flash('error','登陆失败');
            res.redirect('/users/login');
        }
    });
});

router.get('/logout',middleware.checkLogin, function(req, res, next) {
    req.session.user = null;
    req.flash('success','退出成功，请重新登录');
    res.redirect('/users/login');
});

module.exports = router;
