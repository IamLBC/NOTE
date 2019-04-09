# 初始化组件数据

$data属性保存了当前组件的data对象

$options是当前组件实例初始化时的一些属性,其中有个data方法,就是组件里写的data函数

```js
Object.assign(this.$data, this.$options.data())
```