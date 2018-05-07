> Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```js
var proxy = new Proxy(target, handler);
target: 目标对象
handler： 是一个对象，用来定制拦截行为
```
> `handler`对象常用参数，共13种
* get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。receiver：proxy 实例本身（即this关键字指向的那个对象）
* set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
* has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
* deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
```js
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
```