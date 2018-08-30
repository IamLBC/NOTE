# 过度

> 从一种状态 转换成为另一种的过程，叫过渡.

> 过渡动画：按指定的时间播放转换的过程.

## 语法

> transition: 参与过渡的属性  过渡的时间  动画类型  延迟时间

- 参与过渡的属性：`all`表示所有属性都参与过渡,`width` `height` `background`...

- 过渡的时间：过渡动画持续的时间，单位是秒

- 动画类型：

  - linear    线性动画，匀速动画

  - ease    平滑过渡

  - ease-in    由慢到快

  - ease-out 由快到慢

  - ease-in-out  由慢到快再到慢

- 延迟时间： 动画延迟多长时间开始播放

  ```css
  div{
    width:100px;
    height:50px; 
    background:#f00; 
    margin:4px 0;
    transition:all 0.5s ease-out 0s;
  }
  div:hover {
    width:300px;
    background:#ff0; 
    /* transform: rotate(720deg); */  需要鼠标一直在目标上，要不然会感冒，抖得厉害
  }
  ```

- 过渡阶段

  > 过渡分为两个阶段：前进（forward）和反向（reverse）。

  >如果在非`hover`状态下设置`transition`，则前进和反向是一致的，都遵循这个过度效果

  > 如果在`hover`下设置了`transition`，则hover下的过度效果是前进，也就是说前进和反向 反了。

  hover状态下设置 transition 属性时，明确哪些属性需要过渡，而哪些属性不需要过渡

- 隐式过渡

  > 指一个属性的改变引起另一个属性的改变。

  ```css
  #box {
    width: 300px;
    height: 300px;
    border: 1em solid black;
  }

  #box:hover {
    font-size: 48px;
    transition: font-size 3s;
  }
  ```
  当 font-size 改变时，border 的宽度也会跟着改变。