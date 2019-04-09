# iterator迭代器

> iterator迭代器是ES6非常重要的概念，但是很多人对它了解的不多，但是它却是另外4个ES6常用特性的实现基础（解构赋值，剩余/扩展运算符，生成器，for of循环）

默认具有iterator接口的数据结构有以下几个，注意普通对象默认是没有iterator接口的（可以自己创建iterator接口让普通对象也可以迭代）

- Array
- Map
- Set
- String
- TypedArray（类数组）
- 函数的 arguments 对象
- NodeList 对象

> 对于可迭代的数据解构，ES6在内部部署了一个[Symbol.iterator]属性，它是一个函数，执行后会返回iterator对象（也叫迭代器对象，也叫iterator接口），拥有[Symbol.iterator]属性的对象即被视为可迭代的

```js
let arr = [1, 2, 3]
let iterator = arr[Symbol.iterator]() // 需要使用键名来访问
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: undefined, done: true}
```

1. 可迭代的数据结构会有一个[Symbol.iterator]方法
2. [Symbol.iterator]执行后返回一个iterator对象
3. iterator对象有一个next方法
4. next方法执行后返回一个有value,done属性的对象

# for ... of循环

> for ... of是作为ES6新增的遍历方式,允许遍历一个含有iterator接口的数据结构并且返回各项的值,和ES3中的for ... in的区别如下

- for ... of遍历获取的是对象的键值,for ... in 获取的是对象的键名

- for ... in会遍历对象的整个原型链,性能非常差不推荐使用,而for ... of只遍历当前对象不会遍历原型链

- 对于数组的遍历,for ... in会返回数组中所有可枚举的属性(包括原型链上可枚举的属性),for ... of只返回数组的下标对应的属性值

- for... of循环同时支持break,continue,return(在函数中调用的话)并且可以和对象解构赋值一起使用

普通对象添加iterator遍历器 可用 for of 遍历键值

```js
var obj = {name: 'lbc',age: 18,sex: 'man'}
function switchObj (obj) {
  let newobj = {}
  Object.keys(obj).forEach((key, i) => {
    newobj[i] = obj[key]
  })
  newobj.length = Object.keys(obj).length
  newobj[Symbol.iterator] = Array.prototype[Symbol.iterator]
  return newobj
}
var newobj = switchObj(obj)
for (let item of newobj) {
  console.log(item)
}
```
