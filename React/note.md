# 行内表达式

```js
Name:
<input type="text" value={this.state.value} onChange={e => this.setState({value: e.target.value.toUpperCase()}) } />
age:
<input type="text" value={this.state.age} onChange={function (e) {this.setState({age: e.target.value.toLowerCase()})}.bind(this)} />
```

# JSX

## react组件的点表示法

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

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
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

## 属性传递的赋值解构
```js
const Button = props => {
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

## props.children可以传递任何形式的数据，包括一个函数
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
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
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
      <ThemeContext.Provider value="dark"> // 如果没传value属性，consumer将为React.createContext(defalutValue)的默认值
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

## 语法

```bash
const {Provider, Consumer} = React.createContext(defaultValue);

<Provider value={/* some value */}> 
// 发布
// 接收一个 value 属性传递给 Provider 的后代 Consumers。一个 Provider 可以联系到多个 Consumers。

<Consumer>
  {value => /* render something based on the context value */} // 订阅
</Consumer>
```
> 每当Provider的值发生改变时, 作为Provider后代的所有Consumers都会重新渲染。 从Provider到其后代的Consumers传播不受shouldComponentUpdate方法的约束，因此即使祖先组件退出更新时，后代Consumer也会被更新。



# render props

```js
<DataProvider render={ data => <h1>Hello {data.target}</h1> }/>

// 共享状态 或 一个组件的行为封装到其他需要相同状态的组件中 
// 父组件内部的渲染逻辑上用 { this.props.render(参数) }， 来渲染父组件上的render渲染函数达到 状态共享

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={ mouse => <Cat mouse={mouse} /> }/>
      </div>
    );
  }
}
```