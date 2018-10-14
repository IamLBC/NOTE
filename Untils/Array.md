# 数组工具

[link]: http://blog.minfive.com/2018/01/07/2018-01-07-30-seconds-of-code-translate/ '30s代码片段翻译'

**[Array Object][link]**

## Array concatenation (合并参数)

使用 `Array.concat()` 来连接参数中的任何数组或值。

```js
const arrayConcat = (arr, ...args) => arr.concat(...args);
// arrayConcat([1], 2, [3], [[4]]) -> [1,2,3,[4]]
```

## Array difference || intersection(取数组相同和不同项)

以 `b` 创建 `Set`，然后使用 `Array.filter()` 过滤，是否保留 `b` 中包含的值。

```js
1. const difference = (a, b) => { 
    const s = new Set(b)
    return a.filter(x => !s.has(x))
   }
   // difference([1,2,3], [1,2]) -> [3]

2. const difference = (a, b) => { 
    const s = new Set(b)
    return a.filter(x => { s.has(x)})
   }
   // intersection([1,2,3], [4,3,2]) -> [2,3]
```

## Array union (合并数组去重)

用`a`和`b`的所有值创建一个`Set`并转换成一个数组
```js

const union = (a, b) => {
    Array.from(new Set([...a, ...b]))
}
```

## Filter out non-unique values in an array (过滤掉数组中重复的值)

使用 `Array.filter()` 保证数组仅包含唯一值。

```js
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
```

### Average of array of numbers (通过数组取平均值)

使用 `Array.reduce()` 将每个值添加到一个累加器，用值 0 初始化，除以数组的长度。

```js
const average = arr => {
    arr.reduce((acc, val) => acc + val, 0) / arr.length
}
```

## Compact (压缩)

使用 `Array.filter()` 去过滤掉假值（`false`, `null`, `0`, `""`, `undefined` 和 `NaN`）。

```js
const compact = arr => arr.filter( v => v)
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
```

## Count occurrences of a value in array (计算数组中指定值出现的次数)

使用 `Array.reduce()` 去迭代数组，当值相同时，递增计数器。

```js
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3
```

## Deep flatten array (深度展开数组)

使用递归。
使用 `Array.reduce()` 获取所有不是数组的值，并将数组展开。

```js
const deepFlatten = arr =>
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```

```js
// 递归深度展开树结构数组
export function deepOpenArray (arr) {
  var temp = []
  arr.forEach(item => {
    temp.push({
      tag: item.tag,
      label: item.label,
      id: item.id
    })
    if (item.children && item.children.length > 0) {
      temp = temp.concat(deepOpenArray(item.children))
    }
  })
  return temp
}
```


## Drop elements in array (过滤满足指定条件的值)

循环访问数组，使用 `Array.shift()` 删除数组的第一个元素，直到函数的返回值为 `true`，返回其余的元素。

```js
const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr.shift();
  return arr;
};
// dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]
```

## Flatten array (拼合数组)

使用 `Array.reduce()` 来获取内部所有元素并用 `concat()` 合并它们。

```js
const flatten = arr => arr.reduce((a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]
```

## Get value from array (获取数组中的最大/小值)

使用 `Math.max()` 配合 `...` 扩展运算符去获取数组中的最大/小值。

```js
const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10

const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1
```

## Initial of list

使用 `arr,slice(0, -1)` 去返回去除最后一个元素的数组。

```js
const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]
```

## Shuffle array (随机数组) 乱序

使用 `Array.sort()` 在比较器中使用 `Math.random()` 重新排序元素。

```js
const shuffle = arr => arr.sort(() => Math.random() - 0.5);
// shuffle([1,2,3]) -> [2,3,1]
```

```js
//求交集
function intersect(arr1,arr2) {
  // 利用Set里的方法has，来判断new Set(arr2)中是否含有item，
  // 如果含有，那么则是true，当为true时，filter函数则会保留该项
  // 如果没有，则是false,当为false时，filter函数则不会保留该项
  return arr1.filter(item => new Set(arr2).has(item))
}

console.log(intersect([1,2,3],[2,3,4,5])) // [2,3]
复制代码求差集
function difference(arr1,arr2){
    return arr1.filter(item => !new Set(arr2).has(item))
}

console.log(difference([1,2,3],[2,3,4,5])) // [1]
```