[link]: https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html

- ## 有作用域的 CSS

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素。这类似于 Shadow DOM 中的样式封装。它有一些注意事项，但不需要任何 `polyfill`。它通过使用 `PostCSS` 来实现以下转换：
```css
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>

转换结果：

<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

- ## 全局和本地
```css
style>
/* 全局样式 */
</style>

<style scoped>
/* 本地样式 */
</style>
```

- ## 深度作用选择器
```css
/* 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符： */

<style scoped>
.a >>> .b { /* ... */ }
</style>
/* 上述代码将会编译成： */

.a[data-v-f3f3eg9] .b { /* ... */ }
/* 有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作。 */
```

- ## css module
```css
/* style.css */
.className {
  color: green;
}

import styles from "./style.css";
 /* import { className } from "./style.css"; */

element.innerHTML = '<div class="' + styles.className + '">';
```