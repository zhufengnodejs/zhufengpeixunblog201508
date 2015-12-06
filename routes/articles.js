var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'.'+path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage });

router.get('/list/:pageNum/:pageSize', function(req, res) {
  var pageNum =  parseInt(req.params.pageNum);
  pageNum = pageNum<=0?1:pageNum;
  var pageSize = parseInt(req.params.pageSize);
  var keyword = req.query.keyword;
  var query = new RegExp(keyword,"i");
  Model('Article').count({$or:[{title:query},{content:query}]},function(err,count){
    var totalPage = Math.ceil(count/pageSize);
    pageNum = pageNum>=totalPage?totalPage:pageNum;
    Model('Article').find({$or:[{title:query},{content:query}]})
        .skip((pageNum-1)*pageSize).limit(pageSize).exec(function(err,articles){
      res.render('index',{
        title:'主页',
        pageNum:pageNum,
        pageSize:pageSize,
        keyword: keyword,
        totalPage:totalPage,
        articles:articles
      });
    });
  });

});

//当用户访问 /add的时候 渲染此模板
router.get('/add', function(req, res) {
  res.render('article/add', { title: '发表文章',article:{} });
});
router.post('/add',upload.single('poster'),function(req, res, next) {
  var article = req.body;
  var id = article.id;
  if(id){
    var updateObj = {
      title:article.title,
      content:article.content,
    }
    if(req.file){
      var poster = path.join('/upload',req.file.filename);
      updateObj.poster = poster;
    }

    new Model('Article').update({_id:id},{$set:updateObj},function(err){
      if(err){
        res.redirect('back');
      }else{
        res.redirect('/articles/detail/'+id);
      }

    });
  }else{
    article.user = req.session.user._id;
    article.poster = path.join('/upload',req.file.filename);
    new Model('Article')(article).save(function(err,article){
      if(err){
        res.redirect('back');
      }else{
        res.redirect('/');
      }
    });
  }

});

router.get('/detail/:id',function(req,res){
  var id = req.params.id;
  Model('Article').findById(id,function(err,article){
    res.render('article/detail',{article:article});
  })
});

router.get('/delete/:id',function(req,res){
  var id = req.params.id;
  Model('Article').remove({_id:id},function(err){
    res.redirect('/');
  })
});

router.get('/edit/:id',function(req,res){
  var id = req.params.id;
  Model('Article').findById(id,function(err,article){
    res.render('article/add',{article:article});
  })
});
module.exports = router;
