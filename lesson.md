## Array.concat()

```js
//concat()把两个或者多个数组链接在一起，但是不改变已经存在的数组
//而是返回一个连接之后的新数组
var a = [1,2,3];
a.concat([4,5]);
console.log(a);
//此处输出为 [1, 2, 3]
 
var a = [1,2,3];
a = a.concat([4,5]);
console.log(a);
//此处输出为 [1, 2, 3 ,4 ,5]
```

## 对象数组没有index删某一个

```js
var arr = [{
  name:'lbc',
  age: 12
}, {
  name:'lbdc',
  age: 124
}, {
  name:'lbsc',
  age: 123
}]

var item1 = {
  name:'lbdc',
  age: 124
}

var item2 = arr[1]
arr.splice(arr.indexOf(item1), 1) // arr.indexOf(item1) = -1
arr.splice(arr.indexOf(item2), 1) // success
`splice`删除数组里某些元素,返回一个数组，会改变原数组
`slice`返回数组里某些元素，返回值为数组,返回的是第二个参数的索引元素的前面一个元素
```
