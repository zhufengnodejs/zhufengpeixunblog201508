var mongoose = require('mongoose');
mongoose.connect('mongodb://123.57.143.189/201508blog');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String
}));

global.Model = function(modName){
    return mongoose.model(modName);
}