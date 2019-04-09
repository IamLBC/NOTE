# 1. set
* `set`本身是个构造函数，用来生成`set`数据结构---`new set()`，类似于数组，每个成员的值都是唯一的.可用于数组去重：`Array.from([...new set(arr)])`
* `Set` 函数可以接受一个数组（或者具有 `iterable` 接口的其他数据结构）作为参数，用来初始化。

* `Set` 实例的属性和方法
    * `Set` 结构的实例有以下属性。
    * `Set.prototype.constructor`：构造函数，默认就是Set函数。
    * `Set.prototype.size`：返回Set实例的成员总数。

* 操作方法（用于操作数据）
    * `add(value)`：添加某个值，返回 Set 结构本身。
    * `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
    * `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
    * `clear()`：清除所有成员，没有返回值

* 遍历操作,可以用于遍历成员。
    * `keys()`：返回键名的遍历器
    * `values()`：返回键值的遍历器
    * `entries()`：返回键值对的遍历器
    * `forEach()`：使用回调函数遍历每个成员

    由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。

```js
for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```


```js
let s = new set()
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```
# 2. map
> JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
```js
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
```

> `map`基本用法
```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```
```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

> 我们分别使用 Set 对象和 Map 对象，当作Map构造函数的参数，结果都生成了新的 Map 对象。 
```js
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```
如果对同一个键多次赋值，后面的值将覆盖前面的值。

> Map 结构原生提供三个遍历器生成函数和一个遍历方法。
* keys()：返回键名的遍历器。
* values()：返回键值的遍历器。
* entries()：返回所有成员的遍历器。
* forEach()：遍历 Map 的所有成员。
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```
> Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

> 与其他数据结构的互相转换
* （1）Map  转为数组最方便的方法，就是使用扩展运算符（...）。
```js
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```
* （2）数组 转为 Map,将数组传入 Map 构造函数，就可以转为 Map。
```js
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```
* （3）Map 转为对象,如果所有 Map 的键都是字符串，它可以无损地转为对象。
```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
// 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
```
* （4）对象转为 Map
```js
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```
* (5) map转JSON
    - Map 的键名都是字符串：map转成对象在用`JSON.stringify()`
    - Map 的键名有不是字符串的：可以转为数组 JSON
```JS
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```
* (6) JSON转map
    - JSON的键一般都是字符串，用`JSON.parse`转成对象再转成`map`