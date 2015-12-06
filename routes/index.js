var express = require('express');
var router = express.Router();

/*
 * get 请求方法
 * /请求的路径
 *
 */
router.get('/', function(req, res) {
  Model('Article').find({}).populate('user').exec(function(err,articles){
    res.render('index', { articles: articles});
  });

});

module.exports = router;
