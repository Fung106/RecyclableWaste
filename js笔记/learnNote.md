# JavaScript学习笔记（ES6）

感谢：[现代 JavaScript 教程](https://zh.javascript.info/)，本笔记只记录我所思考的，语法、方法等细节直接参考教程



## Object（对象）

在 JavaScript 中有 8 种基本的数据类型（译注：7 种原始类型和 1 种引用类型）。

1. Number类型：用于任何类型的数字：整数或浮点数，在 `±(253-1)` 范围内的整数。
2. BigInt类型：用于任意长度的整数。
3. String类型：用于字符串。一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
4. Boolean类型（true or false）
5. null（一个代表“无”、“空”或“值未知”的特殊值）
6. undefined（未被赋值）
7. symbol：用于唯一的标识符。
8. object（对象）：用于更复杂的数据结构。我认为在JavaScript就是个存储键值对的数据结构。

对象就是引用类型，引用类型存储的是对象在内存中的地址（可以理解成指针，但是它和指针不完全一样），形如"**let user = {name : "John"}**",对象是指" {...} "，对象的引用是指 " user "，" user "存储对象在内存中的地址，该地址指向内存中对应的对象，用图片来理解就是：

![image-20211002214915355](C:\Users\10631\AppData\Roaming\Typora\typora-user-images\image-20211002214915355.png)

原始类型和引用类型的不同之处就是原始类型存储的是值，直接指向它的本体，例如" **let user =  "John"** "用图片来理解就是：

![image-20211002215402702](C:\Users\10631\AppData\Roaming\Typora\typora-user-images\image-20211002215402702.png)

正因如此，赋值操作就出现很大的差别，例如字符串赋值操作：

```javascript
"use strict"

let user = "john";
let admin = user;

console.log(user);//输出 john
console.log(admin);//输出 john

admin = "Pete";

console.log(user);//输出 john
console.log(admin);//输出 Pete
```

用图片解释：

1. ![image-20211002220017847](C:\Users\10631\AppData\Roaming\Typora\typora-user-images\image-20211002220017847.png)
2. ![image-20211002220101662](C:\Users\10631\AppData\Roaming\Typora\typora-user-images\image-20211002220101662.png)

可以看出它们互不影响，这就是原始类型的赋值操作。

接下来看看引用类型的赋值操作是怎么样的：

```javascript
"use strict"

let user = {
  name : "john"
};
let admin = user;

console.log(admin === user);//输出 true，证明它们都指向同一个对象

console.log(user.name);//输出 john
console.log(admin.name);//输出 john

admin.name = "Pete";

console.log(user.name);//输出 Pete
console.log(admin.name);//输出 Pete
```

用图片解释：

1. ![image-20211002220939311](C:\Users\10631\AppData\Roaming\Typora\typora-user-images\image-20211002220939311.png)

2. ![image-20211002221217367](C:\Users\10631\AppData\Roaming\Typora\typora-user-images\image-20211002221217367.png)

   引用类型可以比喻成我和小豪去游泳馆游泳，我们需要把衣服背包等东西存放起来，我们就要去管理员处申请一个存储柜，我去申请存储柜这一行为相当于我要创建一个对象了，管理员这时给我一把钥匙，相当于我存储了一个对象的引用，该引用指向那个存储柜——对象。存储柜内的衣服背包等于对象内的各种属性。" **let admin = user;** "这个操作就相当于我去配钥匙的地方，把这个开存储柜的钥匙复制了一把一模一样的钥匙给了小豪，那么小豪也拥有了这把钥匙，他也存储了一个对象，我们钥匙所指向的存储柜是一样的，我们都能访问同一个对象，如果小豪用钥匙打开了存储柜，向里面放了一副眼镜，那么我用钥匙打开这个存储柜，也能够看见这副小豪放进来的眼镜。

   原始类型就不拿钥匙，直接拿物品，我将我手上的一瓶水复制成一模一样的给了小豪，这时即使小豪向这瓶水里面加什么，都不会影响到我。



综上所述，如果我们想赋值一个一模一样的对象出来，不能够直接用" = "赋值符号，应该使用