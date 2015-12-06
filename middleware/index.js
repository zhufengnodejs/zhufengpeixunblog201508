//必须保证已经登陆才能继续访问
exports.checkLogin = function(req,res,next){
    if(req.session.user){//已经登陆过了
        next();//继续执行
    }else{
        req.flash('error','你还未登陆，请登陆再访问此页面');
        res.redirect('back');
    }
}

//必须保证未登陆才能继续访问
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){//已经登陆过了
        req.flash('error','你已经登陆，不能重复登陆');
        res.redirect('back');
    }else{
        next();//继续执行
    }
}