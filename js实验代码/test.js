
"use strict"
/*
//链表
function Fiber(){ 
    this.header = null;
    this.next = null;
}

let head = new Fiber();
let p = new Fiber();
head.next = p;
for(let i = 0;i<10;i++){
    let q = new Fiber();
    p.header = i;
    p.next = q;
    p = q;
}
while(head.next.next != null){
    console.log(head.next.header)
    head = head.next;
}
*/

/* 
//深拷贝
let user = {
  obj : {
    m : 2,
  },
  obj2 : {
    k : 3,
  },
  n : 1,
  x : 2,
};

let clone = {};

//循环方式
for(let key in user){
  if(typeof(user[key]) === "object"){
    clone[key] = {};
    for(let key_ in user[key]){
      clone[key][key_] = user[key][key_];
    }
  }else{
    clone[key] = user[key];
  }
}

//递归方式
function deepClone(clone,user){
  for(let key in user){
    if(typeof(user[key]) === "object"){
      clone[key] = {};
      deepClone(clone[key],user[key]);
    }else{
      clone[key] = user[key];
    }
  }
}

deepClone(clone,user);

user.obj.m = 3;
user.obj2.k = 6;
console.log(user);
*/

/*
//最大子数组问题---时间复杂度是 O(n)

function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    partialSum += item;
    maxSum = Math.max(maxSum, partialSum);
    if (partialSum < 0) partialSum = 0;
  }
  return maxSum;
}


*/





// function throttle(fx, ms){
//   let t = null;
//   let count = 0;
//   let cache = new Map();
//   function time(...str){
//     let savedThis = this;
//     function f1(){
//       fx.apply(savedThis,str);
//     }
//     function stop(){
//       count = 0;
//       cache.get("f")();
//     }

//     cache.set("f", f1);

//     if(count === 0){
//       count = 1;
//       cache.get("f")();
//       t = setTimeout(stop, ms);
//     }
//   }
//   return time;
// }

// user.f = throttle(user.f, 1000);
// admin.f = throttle(admin.f, 1000);

// user.f(1);
// admin.f(2);
// user.f(2);
// admin.f(2);
// user.f(3);
// admin.f(4);