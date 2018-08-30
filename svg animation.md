[door]:https://www.zhangxinxu.com/wordpress/2014/08/so-powerful-svg-smil-animation/
[door]
- stroke-dasharray: 一组用逗号分割的数字组成的序列,第一个用来表示实线，第二个用来表示空白,如果只有一个数字5，则表示会先画5px实线，紧接着是5px空白，然后又是5px实线，从而形成虚线

- stroke-dashoffset: 表示路径从开始位置的偏移量,路径的偏移是从左边的原点开始的
# 五大元素
* `<set>`
* `<animate>`
* `<animateColor>`
* `<animateTransform>`
* `<animateMotion>`

## set
set意思设置，此元素没有动画效果。虽然set虽然不能触发连续的动画，但是，其还是可以实现基本的延迟功能。就是指：可以在特定时间之后修改某个属性值（也可以是CSS属性值）。

举个例子，下面这个「马」会在3秒之后从横坐标160的位置移动60这个位置。闪现过去
```html
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <g> 
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">
      马
      <set attributeName="x" attributeType="XML" to="60" begin="3s" />
    </text>
  </g>
</svg>
```

## animation
基础动画元素。实现单属性的动画过渡效果。类似Snap.svg的animate()方法支持的动画效果。

把马儿平移：
```html
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <g> 
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">
    马
      <animate attributeName="x" from="160" to="60" begin="0s" dur="3s" repeatCount="indefinite" />
    </text>
  </g>
</svg>
```

##  animateColor
一看就知道是颜色动画。不过，animate可以实现其功能与效果，因此，此属性已经被废弃。

## animateTransform
一看就知道实现transform变换动画效果的。知识是一脉相承的，这里的transform变换与CSS3的transform变换，以及Snap.svg.js中的transform()方法都是一个路数。

马儿变大：
```html
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <g> 
    <text font-family="microsoft yahei" font-size="80" y="100" x="100">马</text>
    <animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="1.5" repeatCount="indefinite"/>
  </g>
</svg>
```

## animateMotion
animateMotion元素可以让SVG各种图形沿着特定的path路径运动~
```html
<svg width="360" height="200" xmlns="http://www.w3.org/2000/svg">
  <text font-family="microsoft yahei" font-size="40" x="0" y="0" fill="#cd0000">马
    <animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0" begin="0s" dur="3s" repeatCount="indefinite"/>
  </text>
  <path d="M10,80 q100,120 120,20 q140,-50 160,0" stroke="#cd0000" stroke-width="2" fill="none" />
</svg>
```

让马儿跑的真实一点：
```html
<svg width="360" height="200" xmlns="http://www.w3.org/2000/svg">
  <text font-family="microsoft yahei" font-size="40" x="0" y="0" fill="#cd0000">马
    <animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0" begin="0s" dur="3s" rotate="auto" repeatCount="indefinite"/>
  </text>
  <path d="M10,80 q100,120 120,20 q140,-50 160,0" stroke="#cd0000" stroke-width="2" fill="none" />
</svg>
```

## 自由组合
实际制作时候的动画，不可能总是一个属性修改。比方说，位置和透明度同时变化，怎么办呢？So easy! 直接组合就好了。
```html
<svg width="320" height="200" xmlns="http://www.w3.org/2000/svg">
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">马
        <animate attributeName="x" from="160" to="60" begin="0s" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" begin="0s" dur="3s" repeatCount="indefinite" />
    </text>
</svg>
```

# 参数详解

## attributeName = `<attributeName>`
> 要变化的元素属性名称，

① 可以是元素直接暴露的属性，例如，对于本文反复出现的「马」对应的text元素上的x, y或者font-size; 

② 可以是CSS属性。例如，透明度opacity.

## attributeType = “CSS | XML | auto”
> attributeType支持三个固定参数，CSS/XML/auto. 用来表明attributeName属性值的列表。x, y以及transform就属于XML, opacity就属于CSS. auto为默认值，自动判别的意思（实际上是先当成CSS处理，如果发现不认识，直接XML类别处理）。因此，如果你不确信某属性是XML类别还是CSS类别的时候，建议是不设置attributeType值，直接让浏览器自己去判断，几乎无差错。
> 不知大家有没有和我一样的疑问：“既然浏览器酱可以自己判断属性类别，那这个属性还有什么意义吗？”我琢磨着，可能某些属性，XML能其作用，CSS也能其作用，例如font-size, 此时就需要明确下归属。

##  from, to, by, values

- from = 动画的起始值。

- to = 指定动画的结束值。

- by = 动画的相对变化值。

- values = 用分号分隔的一个或多个值，动画的多个关键值点。

### 规则：

> 如果动画的起始值与元素的默认值是一样的，from参数可以省略。

> （不考虑values）to,by两个参数至少需要有一个出现。否则动画效果没有。to表示绝对值，by表示相对值。拿位移距离，如果from是100, to值为160则表示移动到160这个位置，但是，如果by值是160，则表示移动到100+160=260这个位置。

> 如果to,by同时出现，则by打酱油，只识别to.

> 如果to,by,values都没设置，自然没动画效果。如果任意（包括from）一个属性的值不合法，规范上说是没有动画效果。但是，据我测试，FireFox浏览器确实如此，但是Chrome特意做了写容错处理。例如，本来是数值的属性，写了个诸如a这个不合法的值，其会当作0来处理，动画效果依然存在。

> values一个值的时候是没有动画效果。多值时候有动画效果。当values值设置并能识别时候，from, to, by的值都会被忽略。实际上有3个动画关键点。而from, to/by只能驾驭两个；例如下面这个聪明的马儿来回跑的效果
```html
<svg width="320" height="200" xmlns="http://www.w3.org/2000/svg">
    <text font-family="microsoft yahei" font-size="120" y="150" x="160">
        马
        <animate attributeName="x" values="160;40;160" dur="3s" repeatCount="indefinite" />
    </text>
</svg>
```

有 from-to动画、from-by动画、to动画、by动画、values动画 几种情况

## begin, end, dur

> 时间值 常见单位有 "h"|"min"|"s"|"ms" 

dur: 动画持续时间

begin: 动画开始是的延迟时间，可以是一个value，也可以是以分好分隔的list，"3s;6s;9s"

beigin="3s" 也可以简写成 begin="3"

- offset-value 表示偏移值 +/-
- syncbase-value 基于同步确定的值 [元素的id].begin/end +/- 时间值

  为一个animation定一个id，另一个动画在上一个动画结束时开始，也可以有一些偏移值，begin="x.end-1s"
  ```html
  <svg width="320" height="200" xmlns="http://www.w3.org/2000/svg">
      <text font-family="microsoft yahei" font-size="120" y="160" x="160">马
          <animate id="x" attributeName="x" to="60" begin="0s" dur="3s" fill="freeze" />
          <animate attributeName="y" to="100" begin="x.end" dur="3s" fill="freeze" />
      </text>
  </svg>
  ```

- event-value 事件值，这类事件需要内联在页面中,否则无效 [元素的id].[事件类型] +/- 时间

  通过一个元素的事件触发动画开始，可以加偏移值 begin="circle.click+2s，
  ```html
  <svg id="svg" width="320" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle id="circle" cx="100" cy="100" r="50"></circle>
      <text font-family="microsoft yahei" font-size="120" y="160" x="160">马
          <animate attributeName="x" to="60" begin="circle.click" dur="3s" />
      </text>
  </svg>
  ```

- repeat-value 重复多少次后干什么, [元素的id].repeat(整数) +/- 时间
```html
  <svg width="320" height="200" xmlns="http://www.w3.org/2000/svg">
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">马
        <animate id="x" attributeName="x" to="60" begin="0s" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y" to="100" begin="x.repeat(2)" dur="3s" fill="freeze" />
    </text>
  </svg>
  ```

- accessKey-value 定义快捷键,按下某个按键后动画开始, accessKey(" character "). character表示快捷键所在的字符，举个例子，按下s键动画走起
  ```html
  <svg width="320" height="200" xmlns="http://www.w3.org/2000/svg">
      <text font-family="microsoft yahei" font-size="120" y="160" x="160">马
          <animate attributeName="x" to="60" begin="accessKey(s)" dur="3s" repeatCount="indefinite" />
      </text>
  </svg>
  ```
  
- "indefinite" 无限等待,需要beginElement()来触发动画开始 或 指向该动画元素的超链接(SVG中的a元素)
  ```html
  <svg id="svg" width="320" height="200" xmlns="http://www.w3.org/2000/svg">
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">马
        <animate attributeName="x" to="60" begin="indefinite" dur="3s" />
    </text>
  </svg>
  ```
  ```js
  var animate = document.getElementsByTagName("animate")[0];
  if (animate) {
      document.getElementById("svg").onclick = function() {
          animate.beginElement();
      };
  }
  ```

  ## calcMode, keyTimes, keySplines
  这几个参数是控制动画先快还是先慢类似这样作用的。

  ## repeatCount, repeatDur
repeatCount表示动画执行次数，可以是合法数值或者”indefinite“（动画循环到电脑死机）。

repeatDur定义重复动画的总时间。可以是普通时间值或者”indefinite（”动画循环到电脑死机）。

```html
<animate attributeName="x" to="60" dur="3s" repeatCount="indefinite" repeatDur="10s" />
```
动画只玩执行完整3个 + 一个1/3个动画。因为repeat总时间就10s而已。

## fill
fill表示动画间隙的填充方式。支持参数有：freeze | remove. 其中remove是默认值，表示动画结束直接回到开始的地方。freeze“冻结”表示动画结束后像是被冻住了，元素保持了动画结束之后的状态。

## accumulate, additive

## restart
支持的参数有：always | whenNotActive | never.

always是默认值，表示总是，点一下就开始动。

whenNotActive表示动画正在进行的时候，是不能重启动画的。

never表示动画只执行一次。

## 重新开始和暂停
```js
// svg指当前svg DOM元素
// 暂停
svg.pauseAnimations();

// 重启动
svg.unpauseAnimations()
```

