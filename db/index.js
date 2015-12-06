var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://123.57.143.189/201508blog');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
}));
mongoose.model('Article',new mongoose.Schema({
    title:String,
    content:String,
    poster:String,
    user:{type:ObjectId,ref:'User'}//对象ID类型，引用User
}));

global.Model = function(modName){
    return mongoose.model(modName);
}
