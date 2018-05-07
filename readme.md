
[1]:　http://www.google.com/ "点我去谷歌"
[2]:　http://www.bing.com/ "点我有求必应"
[DuckDuckGo]:　http://www.DuckDuckGo.com/
[度娘]: http://www.baidu.com/

19个JavaScript有用的简写技术
==

三元操作符
--
```html
<header class="header">
  <h1>todos</h1>
  <input 
    @keyup.enter="addTodo" 
    v-model="newTitle" 
    class="new-todo" 
    autofocus 
    autocomplete="off" 
    placeholder="What needs to be done?">
    <section class="main" v-show="todos.length">  <!-- 数表视图，根据任务数据来控制显示 -->
      <input class="toggle-all" type="checkbox" />
      <ul class="todo-list">
        <li :class="{todo:true, completed:todo.completed}" v-for="(todo,index) in filterTodos">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label>{{todo.title}}</label>
            <button @click="removeTodo(index)" class="destroy"></button>
          </div>
          <input class="edit" type="text">
        </li>
      </ul>
    </section>
</header>
```
当想写if...else语句时，使用三元操作符来代替。
```javascript
const x = 20
let ansewer
if (x > 10) {
  answer = 'is greater'
} else {
  answer = 'is lesser'
}
```
简写：
```javascript
const answe = x > 10 ? 'is greater' : 'is lesser'
```


短路求值简写方式
--

当给一个变量分配另一个值时，想确定源始值不是null，undefined或空值。可以写撰写一个多重条件的if语句。
```javascript
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
  let variable2 = variable1;
}
```
或者可以使用短路求值方法：
```
npm run dev
```
段落
```
锄禾日当午汗滴禾下土
谁知盘中餐
粒粒皆辛苦
```

2.短路求值简写方式
当给一个变量分配另一个值时，想确定源始值不是null，undefined或空值。可以写撰写一个多重条件的if语句。

if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}
或者可以使用短路求值方法：
const variable2 = variable1 || 'new';

3.声明变量简写方法
```javascript
let x;
let y;
let z = 3;
简写方法：
// woshi zhushi
let x, y, z=3;
```
目前, 常见的搜索引擎有:[谷歌][1], [必应][2], [DuckDuckGo][], 当然如果你没啥追求, 还可使用[度娘][]. 

