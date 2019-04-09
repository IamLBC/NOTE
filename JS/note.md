# note

## 基本类型

> 基本类型值指的是存储在 栈 中的一些简单的数据段

> 从一个变量复制基本类型的值到另一个变量后这2个变量的值是完全独立的，在JavaScript中基本数据类型有String,Number,Undefined,Null,Boolean，在ES6中，又定义了一种新的基本数据类型Symbol,所以一共有6种

## 引用类型

> 引用类型值是引用类型的实例，它是保存在 堆内存 中的一个对象，引用类型是一种数据结构，最常用的是Object,Array,Function类型，另外还有Date,RegExp,Error等，ES6同样也提供了Set,Map2种新的数据结构

> 变量的值也是存储在栈上的, 在赋值的时候保存的是同一个指针，也就是同一个内存地址

## 浅拷贝

> 如果属性是基本类型，拷贝的就是基本类型的值. 如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

> 扩展运算符和Object.assign一样是浅拷贝,同上

### Object.assign

- 原始类型会被包装为对象

```js
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

- 不会拷贝对象继承的属性
- 不会拷贝不可枚举的属性
- 属性的数据属性/访问器属性
- 可以拷贝Symbol类型

## 深拷贝

> 数组的深拷贝： arr.slice(), concat(), [...arr]

```js
var obj1 = {
    a: {
        b: 1
    },
    c: 1
};
var obj2 = {};

obj2.a = {}
obj2.c = obj1.c
obj2.a.b = obj1.a.b; // 做循环赋值，基本类型的值
console.log(obj1); //{a:{b:1},c:1};
console.log(obj2); //{a:{b:1},c:1};
obj1.a.b = 2;
console.log(obj1); //{a:{b:2},c:1};
console.log(obj2); //{a:{b:1},c:1};
```

### JSON.stringify

```js
var obj1 = {
  a:1,
  b:[1,2,3]
}
var str = JSON.stringify(obj1)
var obj2 = JSON.parse(str)
```

- 拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失
- 无法拷贝不可枚举的属性，无法拷贝对象的原型链
- 拷贝Date引用类型会变成字符串
- 拷贝RegExp引用类型会变成空对象
- 对象中含有NaN、Infinity和-Infinity，则序列化的结果会变成null
- 无法拷贝对象的循环应用(即obj[key] = obj)

> 最好是用lodash的深拷贝

手动深拷贝

```js
function deepClone(obj) {
  var cloneObj = {}; //在堆内存中新建一个对象
  for(var key in obj){ //遍历参数的键
    if (typeof obj[key] === 'object') { 
      cloneObj[key] = deepClone(obj[key]) //值是对象就再次调用函数
    }else{
      cloneObj[key] = obj[key] //基本类型直接复制值
    }
  }
  return cloneObj 
}
```
但是有很多问题:

- deepClone函数并不能复制不可枚举的属性以及Symbol类型
- 只是针对Object引用类型的值做的循环迭代，而对于Array,Date,RegExp,Error,Function引用类型无法正确拷贝
- 对象成环，即循环引用 (例如：obj1.a = obj)

let obj = {
  func: function () {
    return (() => console.log(this.a))()
  },
  a: 1
}