## Array.concat()
```js
//concat()把两个或者多个数组链接在一起，但是不改变已经存在的数组
//而是返回一个链接之后的新数组
var a = [1,2,3];
a.concat([4,5]);
console.log(a);
//此处输出为 [1, 2, 3]
 
var a = [1,2,3];
a = a.concat([4,5]);
console.log(a);
//此处输出为 [1, 2, 3 ,4 ,5]
```