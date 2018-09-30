[vertical-align]:https://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/

[line-height]:https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/

[::before, ::after]:https://www.cnblogs.com/starof/p/4459991.html

## display

1. block
2. inline
3. table系列：将样式变成table类型
4. flex
5. grid
6. inline-block
7. inherit
8. none 元素不占位，但是会保留DOM, visibility: hidden; 保留占位, v-if 直接干掉DOM

## [::before, ::after]

- content必需，display默认inline

- `content: attr(href);`调用当前元素的属性值; `content: 'iam sb' attr(href);`

## [line-height]

- 向下继承

- 盒子内容垂直居中只需一个`line-height`，不需要`height`

- div高度是由line-height > inline box模型 > line boxes(包裹每一行文字)；取line-height最高的作为这一行的高度

- 文章的行距1.5较好，百分比

demo

```css
.div {
  background: red;
  border: 2px solid black;
  line-height: 150px; //向下继承
  text-align: center;
}
span {
  background: blue;
  display: inline-block; // 垂直居中元素的必须
  line-height: 12px; // 修改被继承的行高
  vertical-align: middle; // 锤子居中
}
```

```html
<div>
  i am a sb
  <span>
    我是第一行文字<br>
    斯里兰卡野生鸡和奥地利莫德里奇<br>
  </span>
</div>
```

## [vertical-align]

feature：
- `vertical-align`只对只对父元素为`inline-block`的元素生效, `inline`元素受影响不是因为对`vertical-align`敏感，而是受制于整个line box的变化而不得不变化

- 默认属性为`base-line`

- 属性值可以为数值，`.test{vertical-align:-2px;}`相当于是在修改`base-line`，常用于修复单选框/复选框与12像素文字大小不对齐的问题
- `bottom`会随父元素的`line-height`值改变而改变

- `text-bottom`相对于同一行文字底部对齐

- `bottom` 和 `text-bottom` 的父元素如果没有`line-height`,那么出现的位置一致


