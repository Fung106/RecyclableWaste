"use strict"

let user = {
  name : "john",
  f(...str){
    console.log(this.name);
    console.log(...str);
  }
}

let admin = {
  name : "Pete",
  f(...str){
    console.log(this.name);
    console.log(...str);
  }
}

// function throttle(func, ms) {

//   let isThrottled = false,
//     savedArgs,
//     savedThis;

//   function wrapper() {

//     if (isThrottled) { // (2)
//       savedArgs = arguments;
//       savedThis = this;
//       return;
//     }

//     func.apply(this, arguments); // (1)

//     isThrottled = true;

//     setTimeout(function() {
//       isThrottled = false; // (3)
//       if (savedArgs) {
//         wrapper.apply(savedThis, savedArgs);
//         savedArgs = savedThis = null;
//       }
//     }, ms);
//   }

//   return wrapper;
// }

// user.f = throttle(user.f, 1000);
// admin.f = throttle(admin.f, 1000);


function throttle(fx, ms){
  let t = null;
  let count = true;
  let cache = new Map();
  function time(...str){
    let savedThis = this;
    function f1(){
      fx.apply(savedThis,str);
    }
    function stop(){
      if(cache.size > 0){
        cache.get("f")();
        cache.clear();
        t = setTimeout(stop, ms);
      }
    }

    cache.set("f", f1);

    if(count){
      count = false;
      cache.get("f")();
      t = setTimeout(stop, ms);
    }
  }
  return time;
}

user.f = throttle(user.f, 1000);
admin.f = throttle(admin.f, 1000);

user.f(1);
admin.f(2);
user.f(2);
admin.f(2);

for(let i = 0; i < 9000000; i++){
  let j = i;
}

user.f(3);
admin.f(4);
user.f(5);
admin.f(6);


