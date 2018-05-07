## Scroll to top (滚动至顶部)
使用 document.documentElement.scrollTop 或 document.body.scrollTop 获取到顶端的距离。
从顶部滚动一小部分距离。 使用 window.requestAnimationFrame（） 实现滚动动画。
```js
const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// scrollToTop()
```