# 行内表达式

```js
Name: <input
  type="text"
  value={this.state.value}
  onChange={(e) => this.setState({ value: e.target.value.toUpperCase() })}
/>;
age: <input
  type="text"
  value={this.state.age}
  onChange={function (e) {
    this.setState({ age: e.target.value.toLowerCase() });
  }.bind(this)}
/>;
```

# JSX

## react 组件的点表示法

```js
import React from "react";

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  },
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

## JSX 标签不能是一个表达式

```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！JSX 标签名不能为一个表达式。
  return <components[props.storyType] story={props.story} />;
}

// 解决这个问题
function Story(props) {
  // 正确！JSX 标签名可以为大写开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## 传递属性

```js
// 以下相等：
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />

// 当传递一个字符串常量时，该值为HTML非转义的，所以下面两个 JSX 表达式是相同的：

<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = { firstName: "Ben", lastName: "Hector" };
  return <Greeting {...props} />;
}
```

## 属性传递的赋值解构

```js
const Button = (props) => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

## props.children 可以传递任何形式的数据，包括一个函数

```js
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      // props.children传递一个function
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

# React.createContext

```js
// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext("light");

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {(theme) => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        {" "}
        // 如果没传value属性，consumer将为React.createContext(defalutValue)的默认值
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

## 语法

```jsx
const {Provider, Consumer} = React.createContext(defaultValue);

<Provider value={/* some value */}>
// 发布
// 接收一个 value 属性传递给 Provider 的后代 Consumers。一个 Provider 可以联系到多个 Consumers。

<Consumer>
  {value => /* render something based on the context value */} // 订阅
</Consumer>
```

> 每当 Provider 的值发生改变时, 作为 Provider 后代的所有 Consumers 都会重新渲染。 从 Provider 到其后代的 Consumers 传播不受 shouldComponentUpdate 方法的约束，因此即使祖先组件退出更新时，后代 Consumer 也会被更新。

# new react

> state

- 组件中的`render`方法中的`this`为组件实例对象，是实例对象调用的`render`

- 组件自定义方法中的`this`为`undefined`,如何解决？

  ```ts
  class Test {
    redner () {
      <!-- clickFun作为回调赋值给onClick事件，是直接调用的，类中默认开启严格模式，this为undefined，如果没有严格模式就是window -->
      <h1 onClick={clickFun}>标题</h1>
    }
    clickFun () {
      <!-- undefined,  -->
      console.log(this)
    }
  }

  <!-- 应该写成 -->
  class Test {
    clickFun = () => {
      console.log(this)
    }

    redner () {
      <h1 onClick={this.clickFun}>标题</h1>
    }

  }
  ```

  - 在`constructor`中用 bind(this)修改指向

  - 箭头函数： customFunction = () => { 箭头函数 this 为父级作用域 --> 组件实例 }, 类中可以直接做赋值操作，如：a = 1，是实例的属性

> props

> refs

- 字符串 ref

```js
// 字符串有一些效率问题，它已过时并可能会在未来的版本被移除
class MyComponent extends React.Component {
  showData = () => {
    const { input } = this.refs;
    alert(input.value);
  };

  render() {
    return (
      <div>
        <input ref="input" />
        <button onClick={this.showData}>点击获取输入值</button>
      </div>
    );
  }
}
```

- 回调 ref

```js
// 内联回调
// 在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的
class MyComponent extends React.Component {
  state = {
    inputElement: null,
  };

  render() {
    return (
      <div>
        <input ref={(el) => (this.inputElement = el)} />
        <button onClick={this.showData}>点击获取输入值</button>
      </div>
    );
  }
}

// 给ref赋值一个函数则不会在render的时候调用两次
class MyComponent extends React.Component {
  getData = (el) => {
    this.input = el.value;
  };

  render() {
    return (
      <div>
        <input ref={this.getData} />
        <button
          onClick={() => {
            alert(this.input);
          }}
        >
          点击获取输入值
        </button>
      </div>
    );
  }
}
```

- React.createRef()

```js
// 官方推荐
class MyComponent extends React.Component {
  // 创建ref容器
  // 一个元素一个容器
  const myRef = React.createRef();

  showData = () => {
    const {current} = this.myRef
    alert(current.value)
  }

  render() {
    return (
      <div>
        <input ref={this.myRef} />
        <button onClick={this.showData}>点击获取输入值</button>
      </div>
    );
  }
}
```

> 事件处理

- react 使用的是合成事件，在原生事件上封装了一层，为了更好的兼容性，

- react 通过事件委托方式处理事件，委托到最外层元素统一处理，为了高效

> 受控和非受控组件

- 非受控： 对表单输入的值，现用现取 --- 要用 ref

- 受控, 随着输入的同时，把数据维护到状态里，需要的时候取出来

```js
// 官方推荐
class MyComponent extends React.Component {
  state = {
    value: "",
  };

  saveValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  submit = () => {
    console.log(this.state.value);
  };

  render() {
    return (
      <div>
        <input onChange={this.saveValue} />
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}
```

> 高阶函数 和 函数的柯里话

- 高阶函数：

  - 若 A 函数，接受的参数是一个函数，那么 A 就是高阶函数

  - 若 A 函数，调用的返回值是一个函数，那么 A 久是高阶函数

- 柯里化：
  - 通过函数调用继续返回函数的方式，实现多次接受参数最后做统一处理的函数编码形式

```js
function sum(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}
const v = sum(1)(2)(3);
console.log(v);
```

> 生命周期

```jsx
//若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
static getDerivedStateFromProps(props,state){
  console.log('getDerivedStateFromProps',props,state);
  return null
}

//在更新之前获取快照
getSnapshotBeforeUpdate(){
  console.log('getSnapshotBeforeUpdate');
  return '2016'
}

//组件更新完毕的钩子
componentDidUpdate(preProps,preState,snapshotValue){
  console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
}
```

> diff 算法

- 生成唯一 id： nanoid

```text
1). react/vue中的key有什么作用？（key的内部原理是什么？）
2). 为什么遍历列表时，key最好不要用index?

1. 虚拟DOM中key的作用：
    1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

    2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】,
            随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

      a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
            (1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
            (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

      b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
            根据数据创建新的真实DOM，随后渲染到到页面

2. 用index作为key可能会引发的问题：
    1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
            会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

    2. 如果结构中还包含输入类的DOM：
            会产生错误DOM更新 ==> 界面有问题。

    3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
      仅用于渲染列表用于展示，使用index作为key是没有问题的。
```

> axios

- 代理

```js
  // 方法一：
  // 只配置一个代理
  // 项目启动在`localhost:3000`
  // 需要请求5000端口
  pakeage.json -> 配置： "proxy": "http://localhost:5000"
  // 当请求了3000不存在的资源时，那么请求会转发给5000（优先匹配前端资源）


  // 方法二：
  // 在src下创建配置文件setupProxy.js
  const proxy = require('http-proxy-middleware')

  module.exports = function (app) {
    app.use(
      proxy('/api', {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // changeOrigin: true   服务器收到的请求头中host为：localhost:5000
        // changeOrigin: false  服务器收到的请求头中host为：localhost:3000
        pahRewrite: {'^/api': ''} // 去除请求前缀
      })
    )
  }
```

# fetch

- 关注分离的设计思想
- 和 xhr 同级别，属于原生方法

```js
try {
  const res = await fetch("api/adress");
  const data = await res.json();
  console.log(data);
} catch (err) {
  console.log(err);
}
```

# 路由

通过 history api，我们丢掉了丑陋的#，但是它也有个毛病：
不怕前进，不怕后退，就怕刷新，f5，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的,不玩虚的。

在 hash 模式下，前端路由修改的是#中的信息，而浏览器请求时是不带它玩的，所以没有问题.但是在 history 下，你可以自由的修改 path，当刷新时，如果服务器中没有相应的响应或者资源，会分分钟刷出一个 404 来。

- 路由组件自带 props

向路由组件传递参数:

- params

  - 路由链接（携带参数）`<Link to="/demo/detail/name/age">详情</Link>`
  - 注册路由（参数声明）`<Route path="/demo/detail/:name/:age" component={detail}></Route>`
  - 接收参数 `this.props.match.params`

- search

  - 路由链接（携带参数）`<Link to="/demo/detail?name=lbc&age=18">详情</Link>`
  - 注册路由（无需声明）`<Route path="/demo/detail" component={detail}></Route>`
  - 接收参数 `this.props.location.search`,获取到`urlencoded`编码字符串，用`qs`解析

- state

  - 路由链接（携带参数）`<Link to="{{pathName: '/demo/detail', state: {name: 'lbc', age: 18}}}">详情</Link>`
  - 注册路由（无需声明）`<Route path="/demo/detail" component={detail}></Route>`
  - 接收参数 `this.props.location.state`,没体现在地址栏，但刷新也可以保留参数。
  - BrowserRouter 刷新后可以保留参数，state 会保存在 history 对象中，不兼容 IE9 及以下版本
  - HashRouter 刷新后悔丢失参数，

- withRouter 使一般组件有路由跳转的能力

```js
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Test extends Component {
  render() {
    return <div></div>;
  }
}

export default withRouter(Test);

// 懒加载组件
import Loading from './Loading'
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

<Suspense fallback={<Loading />}>
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} />
</Suspense>;
```

# redux

- redux 是用 createStore 创建 store
- reducer 本质就是一个函数,根据 action 的 type 做不同逻辑
- action 其实就是一个函数来返回一个对象，对象包括 type 和 data
- 同步 action 是返回 object，异步 action 是返回 function，因为 funciton 里面可以开启异步任务

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import App from './App'

store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})

// component
import React, { Component } from "react";
import store from './redux/store'
import {asyncAction} from './redux/asyncAction'

class Test extends Component {
  add = () => {
    store.dispatch(asyncAction(10, 500))
  }
  render() {
    return <div></div>;
  }
}

// reduce.js
export default function addReducer (preState, action) {
  const {type, data} = action
  ....
}

// store.js
// applyMiddleware执行中间件
// thunk用于支持异步action
import {createStore, applyMiddleware} from 'redux'
import addReducer from './reducer'
import thunk from 'redux-thunk'

export default createStore(addReducer, applyMiddleware(thunk))

// action.js
export asyncAction (data, time) => {
  // 异步action
  return () => {
    setTimeout(() => {
      store.dispatch({type:'add',data})
    }, time)
  }
}
```

# react-redux

- 概念
  - UI 组件：不能使用任何 redux 的 api，只负责页面呈现
  - 容器组件：负责和 redux 通信，将结果交给 UI 组件
- 如何创建一个容器组件 —— 靠 react-redux 的 connect 函数

  - connect 有自动 render 的能力，不用订阅 redux 的状态变化
  - connect(mapStateToProps,mapDispatchToProps)(UI 组件)
    - mapStateToProps：映射状态，返回值是一个对象，mapStateToProps 的参数是 state
    - mapDispatchToProps：映射操作状态的方法，返回值是一个对象，mapDispatchToProps 的参数是 dispatch

- 备注 1： 容器组件中的 store 是父组件传递进去的，不是在容器组件中直接引入（直接在入口文件用 Provider）
- 备注 2：mapDispatchToProps 也可以是一个对象
- 备注 3；异步任务不是必须要写的，也可以异步得到结果后，再去分发同步 action
- Provider 会分析，然后传给，每一个需要 store 的容器组件
- reducer 必须是一个纯函数，更新 state 的时候 redux 会做浅比较，需要改变内存地址才能出发 view 更新
- 纯函数
  - 只要是同样的输入（实参），必定得到同样的输出（返回）
  - 不得改写参数数据
  - 不能发送网络请求，输入和输出
  - 不能调用 Date.now()或 Math.random()等不纯方法
- 从 react-redux 导出 Provider 组件
- 从 react-redux 导出 connect 方法
-

```jsx
// index.jsx
import store from "/redux/store";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//action.jsx
export addAction = (data) => ({type: 'add', data})


// 容器组件
import { addAction } from './redux/action'

export default Connet(
  state => ({count: state.add}),

  // mapDispatchToProps 函数返回对象的形式
  // dispatch => {
  //   return {
  //     add: data => dispatch(addAction(data))
  //   }
  // }

  // 直接写对象的形式
  // react-redux在调用mapDispatchToProps的时候会自动dispatch action
  {
    add: addAction
  }

)(UI组件)

// UI组件
add = () => {
  const {value} = this.selectElement
  this.props.add(value)
}

// store.js
// applyMiddleware执行中间件
// thunk用于支持异步action
// combineReducers 整合 reducer
import {createStore, applyMiddleware, combineReducers} from 'redux'
import addReducer from './reducer'
import thunk from 'redux-thunk'
const all = combineReducers({
  add: addReducer
})
export default createStore(all, applyMiddleware(thunk))

// action.js
export asyncAction (data, time) => {
  // 异步action
  return () => {
    setTimeout(() => {
      store.dispatch({type:'add',data})
    }, time)
  }
}
```

# serve

```bash
npm run build
npm i serve -g
cd dist
serve
```

# Hooks

> setState 两种写法

```jsx
this.setState({ count: 1 }, () => {
  console.log("view updated");
});

this.setState(
  (state, props) => {
    return { count: 1 };
  },
  () => {
    console.log("view updated");
  }
);
```

> hooks-React.useState()

- 函数式组件的 this 为 undefined，因为 react 编译后开启了严格模式

```jsx
function Demo() {
  // 每次view更新都会调Demo react底层做了处理，不会每次更新时重置state
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("lbc");

  function add() {
    // 两种写法
    // setCount(count + 1)
    setCount((count) => count + 1);
  }

  function changeName() {
    setName("cyy");
  }

  render(
    <div>
      <div>当前值：{count}</div>
      <button onClick={add}>点我+1</button>
      <div>当前名字：{name}</div>
      <button onClick={changName}>点我改名</button>
    </div>
  );
}
```

> hooks-React.useEffect()

```jsx
function Demo() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("lbc");

  React.useEffect(
    () => {
      // 执行逻辑

      // 返回一个函数，代表组件将要卸载之前的操作
      return () => {};
    },
    // 第二个参数不写，挂载完成和组件更新都会调用
    // 写一个空数组， 什么都不监听，只在挂载完成时调用
    // 传入状态名，状态改变才调用
    [count]
  );

  render(
    <div>
      <div>当前值：{count}</div>
      <button onClick={add}>点我+1</button>
    </div>
  );
}
```

> hooks-React.useRef()

```jsx
function Demo() {
  const myRef = React.useRef();

  function show() {
    alert(myRef.current.value);
  }
  render(
    <div>
      <input ref={myRef} />
      <button onClick={show}>提示输入内容</button>
    </div>
  );
}
```

> Fragment

```jsx
//Fragment 不会被渲染
<Fragment key={index}>
  <div></div>
</Fragment>

// 也可以写空标签
<>
  <div></div>
</>
```

> context

- 生产者-消费者模式

```jsx
import React, { Component } from "react";

//创建Context对象
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;

export default class A extends Component {
  state = { username: "tom", age: 18 };

  render() {
    const { username, age } = this.state;
    return (
      <div className="parent">
        <h3>我是A组件</h3>
        <h4>我的用户名是:{username}</h4>
        <Provider value={{ username, age }}>
          <B />
        </Provider>
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div className="child">
        <h3>我是B组件</h3>
        <C />
      </div>
    );
  }
}

/* class C extends Component {
	//声明接收context
	static contextType = MyContext

	render() {
		const {username,age} = this.context
		return (
			<div className="grand">
				<h3>我是C组件</h3>
				<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
			</div>
		)
	}
} */

function C() {
  return (
    <div className="grand">
      <h3>我是C组件</h3>
      <h4>
        我从A组件接收到的用户名:
        <Consumer>{(value) => `${value.username},年龄是${value.age}`}</Consumer>
      </h4>
    </div>
  );
}
```

> Purecomponent

- 只要执行 setState()，即使不改变状态，组件也会重新 render
- 当组件重新 render，子组件也会重新 render，效率低
- 原因： component 中的 shouldComponentUpdate 总是返回 true

```jsx
import React, { PureComponent } from "react";
import "./index.css";

export default class Parent extends PureComponent {
  state = { carName: "奔驰c36", stus: ["小张", "小李", "小王"] };

  addStu = () => {
    /* const {stus} = this.state
		stus.unshift('小刘')
		this.setState({stus}) */

    const { stus } = this.state;
    this.setState({ stus: ["小刘", ...stus] });
  };

  changeCar = () => {
    //this.setState({carName:'迈巴赫'})

    const obj = this.state;
    obj.carName = "迈巴赫";
    console.log(obj === this.state);
    this.setState(obj);
  };

  /* shouldComponentUpdate(nextProps,nextState){
		// console.log(this.props,this.state); //目前的props和state
		// console.log(nextProps,nextState); //接下要变化的目标props，目标state
		return !this.state.carName === nextState.carName
	} */

  render() {
    console.log("Parent---render");
    const { carName } = this.state;
    return (
      <div className="parent">
        <h3>我是Parent组件</h3>
        {this.state.stus}&nbsp;
        <span>我的车名字是：{carName}</span>
        <br />
        <button onClick={this.changeCar}>点我换车</button>
        <button onClick={this.addStu}>添加一个小刘</button>
        <Child carName="奥拓" />
      </div>
    );
  }
}

class Child extends PureComponent {
  /* shouldComponentUpdate(nextProps,nextState){
		console.log(this.props,this.state); //目前的props和state
		console.log(nextProps,nextState); //接下要变化的目标props，目标state
		return !this.props.carName === nextProps.carName
	} */

  render() {
    console.log("Child---render");
    return (
      <div className="child">
        <h3>我是Child组件</h3>
        <span>我接到的车是：{this.props.carName}</span>
      </div>
    );
  }
}
```

> render props -- 插槽

```jsx
import React, { Component } from "react";

export default class Parent extends Component {
  render() {
    return (
      <div className="parent">
        <h3>我是Parent组件</h3>
        <A render={(name) => <B name={name} />} />
      </div>
    );
  }
}

class A extends Component {
  state = { name: "tom" };
  render() {
    console.log(this.props);
    const { name } = this.state;
    return (
      <div className="a">
        <h3>我是A组件</h3>
        {this.props.render(name)}
      </div>
    );
  }
}

class B extends Component {
  render() {
    console.log("B--render");
    return (
      <div className="b">
        <h3>我是B组件,{this.props.name}</h3>
      </div>
    );
  }
}
```

> ErrorBoundary

- 只能捕获后代组件生命周期中产生的错误

```jsx
// Parent
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {

	state = {
		hasError:'' //用于标识子组件是否产生错误
	}

	//当Parent的 子组件 出现报错时候，会触发getDerivedStateFromError调用，并携带错误信息
	static getDerivedStateFromError(error){
		console.log('@@@',error);
		return {hasError:error}
	}

	componentDidCatch(){
		console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
	}

	render() {
		return (
			<div>
				<h2>我是Parent组件</h2>
				{this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child/>}
			</div>
		)
	}
}

// child
import React, { Component } from 'react'

export default class Child extends Component {
	state = {
		users:[
			{id:'001',name:'tom',age:18},
			{id:'002',name:'jack',age:19},
			{id:'003',name:'peiqi',age:20},
		]
		// users:'abc'
	}

	render() {
		return (
			<div>
				<h2>我是Child组件</h2>
				{
					this.state.users.map((userObj)=>{
						return <h4 key={userObj.id}>{userObj.name}----{userObj.age}</h4>
					})
				}
			</div>
		)
	}
}
```
