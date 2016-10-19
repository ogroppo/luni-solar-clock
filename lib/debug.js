d = function(){

    var now = new Date();
    var time = now.getHours()+":"+now.getMinutes()+':'+now.getSeconds();
    if(arguments[1])
        console.log(callerName(), arguments[0], arguments[1], time);
    else
        console.log(callerName(), arguments[0], time);

};