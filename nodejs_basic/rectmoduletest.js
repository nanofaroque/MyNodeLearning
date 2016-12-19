var rect = require("./rectmodule.js");
rect(10,10,function(error,rectangle){
    console.log(rectangle.area());
    console.log(rectangle.perimeter());


});
