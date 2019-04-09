# NOTE

ES6 Module默认目前还没有被浏览器支持，需要使用babel，在日常写demo的时候经常会显示这个错误

可以在script标签中使用tpye="module"在同域的情况下可以解决
```js
<script type="module">
  import {util} from './utils'
</script>
```

1. ES6 Module是静态的，也就是说它是在编译阶段运行，和var以及function一样具有提升效果（这个特点使得它支持tree shaking）

2. 自动采用严格模式（顶层的this返回undefined）

关于ES6 Module静态编译的特点,导致了无法动态加载,但是总是会有一些需要动态加载模块的需求,所以现在有一个提案,使用把import作为一个函数可以实现动态加载模块,它返回一个Promise,Promise被resolve时的值为输出的模块

Vue中路由的懒加载的ES6写法就是使用了这个技术,使得在路由切换的时候能够动态的加载组件渲染视图

# 函数默认值

```js
function func ({x = 10} = {}, {y} = {y: 10}) {
  console.log(x, y)
}

func({}, {}) // 10 undefined  相当于传了参数，传的空对象
func(undefined, undefined) // 10 10  相当于没传参数
func() // 10 10  没传参，执行默认值
func({x: 1}, {y: 2}) // 1 2  传了参数， 得到参数里面对应的字段值
```