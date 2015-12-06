var from = {
    name:'zfpx'
}

var to = {
    age:6
}
function merge(from,to){
    for(var attr in from){
        if(from.hasOwnProperty(attr))
            to[attr] = from[attr];
    }
}
merge(from,to);
console.log(to);