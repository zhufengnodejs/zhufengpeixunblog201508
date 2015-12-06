var express = require('express');
var router = express.Router();

/*
 * get 请求方法
 * /请求的路径
 *
 */
router.get('/', function(req, res) {
  res.redirect('/articles/list/1/2');
});

module.exports = router;
