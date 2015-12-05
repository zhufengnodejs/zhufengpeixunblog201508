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
            res.redirect('/user/reg');
        }else{
            res.redirect('/user/login');
        }
    });

});

router.get('/login', function(req, res, next) {
  res.render('user/login',{});
});

router.post('/login', function(req, res, next) {
    var user=req.body;
    Model('User').findOne(user,function(err,docs){
        if(err) {
            res.redirect('/user/login');
        }else{
           res.redirect("/");
        }

    })
});

router.get('/logout', function(req, res, next) {
  res.send('退出');
});

module.exports = router;
