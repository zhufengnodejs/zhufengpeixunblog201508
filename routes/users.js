var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/reg', function(req, res, next) {
  res.render('user/reg',{});
});

router.post('/reg', function(req, res, next) {
    var user =  req.body;//读取用户提交过来的注册表单
    new Model('User')(user).save(function(err,user){
        if(err){
            res.redirect('/users/reg');
        }else{
            res.redirect('/users/login');
        }
    });
});

router.get('/login', function(req, res, next) {
  res.render('user/login',{});
});

router.post('/login', function(req, res, next) {
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

router.get('/logout', function(req, res, next) {
    req.session.user = null;
    req.flash('success','退出成功，请重新登录');
    res.redirect('/users/login');
});

module.exports = router;
