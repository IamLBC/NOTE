* [test](#语法)

[door1]:https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651554709&idx=1&sn=9502cdd2aa4aa2ed4d4e66cf397babb5&chksm=80255454b752dd424f0077a8d001b6dd9ac37f1a22b437918cd90f2a5c342f330eb9ea2a923e&mpshare=1&scene=24&srcid=0815p1yUEpEYKJpQkVKXwRF5#rd



# overview
* SVG 文件可以直接插入网页，成为 DOM 的一部分，然后用 JavaScript 和 CSS 进行操作。
* SVG 代码也可以写在一个独立文件中，然后用`<img>`、`<object>`、`<embed>`、`<iframe>`等标签插入网页。
* CSS 也可以使用 SVG 文件。
```css
.logo {
  background: url(icon.svg);
}
```
* SVG 文件还可以转为 BASE64 编码，然后作为 Data URI 写入网页。
```html
<img src="data:image/svg+xml;base64,[data]">
```
# 语法
`<svg>`的width属性和height属性，指定了 SVG 图像在 HTML 元素中所占据的宽度和高度。除了相对单位，也可以采用绝对单位（单位：像素）。如果不指定这两个属性，SVG 图像默认大小是300像素（宽） x 150像素（高）。

如果只想展示 SVG 图像的一部分，就要指定viewBox属性。
```html
<svg width="100" height="100" viewBox="50 50 50 50" preserveAspectRatio="xMidYMid meet">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```
<viewBox>属性的值有四个数字，分别是左上角的横坐标和纵坐标、视口的宽度和高度。上面代码中，SVG 图像是100像素宽 x 100像素高，viewBox属性指定视口从(50, 50)这个点开始。所以，实际看到的是右下角的四分之一圆。

注意，视口必须适配所在的空间。上面代码中，视口的大小是 50 x 50，由于 SVG 图像的大小是 100 x 100，所以视口会放大去适配 SVG 图像的大小，即放大了四倍。

如果不指定width属性和height属性，只指定viewBox属性，则相当于只给定 SVG 图像的长宽比。这时，SVG 图像的默认大小将等于所在的 HTML 元素的大小。

`preserveAspectRatio` x和y表示对齐的轴线，min,mid,max表示对齐的方式。min是往坐标小的方向对齐；mid居中对齐；max是往坐标大的方向对齐

第二个参数有两个值可选：meet和slice
`meet`就是前面那种自动调整viewBox到可以在svg画布中完全展示。非常类似css里`background-size:contain`
而`slice`是自动调整viewBox到撑满整个svg画布。非常类似`background-size:cover`

preserveAspectRatio还有个单独使用的参数："none"。
这种时候viewBox会被拉伸到和svg画布相同尺寸，而内部的所有svg元素也会被等比拉伸，而不是维持原有比例。
* `<circle>`圆形。
  
  
  ```html
  <svg width="300" height="180">
    <circle cx="30"  cy="50" r="25" />
    <circle cx="90"  cy="50" r="25" class="red" />
    <circle cx="150" cy="50" r="25" class="fancy" />
  </svg>
  ```
  SVG 的 CSS 属性与网页元素有所不同。

  fill：填充色

  stroke：描边色

  stroke-width：边框宽度

* ` <line>`直线。
  ```html
  <svg width="300" height="180">
    <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:5" />
  </svg>
  ```

* `<polyline>`折线
  ```html
  <svg width="300" height="180">
    <polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
  </svg>
  ```

* `<rect>`矩形
  ```html
  <svg width="300" height="180">
    <rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
  </svg>
  ```

* `<ellipse>`椭圆

  cx属性和cy属性，指定了椭圆中心的横坐标和纵坐标（单位像素）；rx属性和ry属性，指定了椭圆横向轴和纵向轴的半径（单位像素）。
  ```html
  <svg width="300" height="180">
    <ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>
  </svg>
  ```

* `<polygon>`多边形

  points属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。
  ```html
  <svg width="300" height="180">
    <polygon fill="green" stroke="orange" stroke-width="1" points="0,0 100,0 100,100 0,100 0,0"/>
  </svg>
  ```

* `<path>`绘制路径。
  ```html
  <svg width="300" height="180">
    <path d="
      M 18,3
      L 46,3
      L 46,40
      L 61,40
      L 32,68
      L 3,40
      L 18,40
      Z
    "></path>
  </svg>
  ```
  d属性表示绘制顺序，它的值是一个长字符串，每个字母表示一个绘制动作，后面跟着坐标。

  M：移动到（moveto）

  L：画直线到（lineto）

  Z：闭合路径

* `<text>`绘制文本
  ```html
  <svg width="300" height="180">

    <text x="50" y="25">Hello World</text>

  </svg>
  ```
  x属性和y属性，表示文本区块基线（baseline 字下面的线）起点的横坐标和纵坐标。文字的样式可以用class或style属性指定。

* `<use>`复制一个形状。
  ```html
  <svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">

    <circle id="myCircle" cx="5" cy="5" r="4"/>

    <use href="#myCircle" x="10" y="0" fill="blue" />

    <use href="#myCircle" x="20" y="0" fill="white" stroke="blue" />

  </svg>
  ```
  `<use>`的href属性指定所要复制的节点，x属性和y属性是`<use>`左上角的坐标。另外，还可以指定width和height坐标。

* `<g>`标签用于将多个形状组成一个组（group），方便复用。
  ```html
  <svg width="300" height="100">

    <g id="myCircle">

      <text x="25" y="20">圆形</text>

      <circle cx="50" cy="50" r="20"/>

    </g>

    <use href="#myCircle" x="100" y="0" fill="blue" />

    <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />

  </svg>
  ```

* `<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。相当于是具有隐形功能的外套
  ```html
  <svg width="300" height="100">

    <defs>

      <g id="myCircle">

        <text x="25" y="20">圆形</text>

        <circle cx="50" cy="50" r="20"/>

      </g>

    </defs>

    <use href="#myCircle" x="0" y="0" />

    <use href="#myCircle" x="100" y="0" fill="blue" />

    <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />

  </svg>
  ```

* `<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。
  ```html
  <svg width="500" height="500">

    <defs>

      <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">

        <circle fill="#bee9e8" cx="50" cy="50" r="35" />

      </pattern>

    </defs>

    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />

  </svg>
  ```

  上面代码中，<pattern>标签将一个圆形定义为dots模式。patternUnits="userSpaceOnUse"表示<pattern>的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形。

* `<image>`标签用于插入图片文件。
  ```html
  <svg viewBox="0 0 100 100" width="100" height="100">

    <image xlink:href="path/to/image.jpg"

      width="50%" height="50%"/>

  </svg>
  ```

* `<animate>`标签用于产生动画效果。
  ```html
  <svg width="500px" height="500px">

    <rect x="0" y="0" width="100" height="100" fill="#feac5e">

      <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />

    </rect>

  </svg>
  ```

  上面代码中，矩形会不断移动，产生动画效果。
`<animate>`的属性含义如下。

  * attributeName：发生动画效果的属性名。

  * from：单次动画的初始值。

  * to：单次动画的结束值。

  * dur：单次动画的持续时间。

  * repeatCount：动画的循环模式。

  可以在多个属性上面定义动画。
  ```html
  <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />

  <animate attributeName="width" to="500" dur="2s" repeatCount="indefinite" />
  ```

* `<animateTransform>`标签
  `<animate>`标签对 CSS 的transform属性不起作用，如果需要变形，就要使用`<animateTransform>`标签。
  ```html
  <svg width="500px" height="500px">

    <rect x="250" y="250" width="50" height="50" fill="#4bc0c8">

      <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />

    </rect>

  </svg>
  ```

  上面代码中，`<animateTransform>`的效果为旋转（rotate），这时from和to属性值有三个数字，第一个数字是角度值，第二个值和第三个值是旋转中心的坐标。from="0 200 200"表示开始时，角度为0，围绕(200, 200)开始旋转；to="360 400 400"表示结束时，角度为360，围绕(400, 400)旋转。

# javascript 操作

## 如果 SVG 代码直接写在 HTML 网页之中，它就成为网页 DOM 的一部分，可以直接用 DOM 操作。
```html
<svg

  id="mysvg"

  xmlns="http://www.w3.org/2000/svg"

  viewBox="0 0 800 600"

  preserveAspectRatio="xMidYMid meet"

>

  <circle id="mycircle" cx="400" cy="300" r="50" />

</svg>
```
上面代码插入网页之后，就可以用 CSS 定制样式。
```css
circle {

  stroke-width: 5;

  stroke: #f00;

  fill: #ff0;

}

circle:hover {

  stroke: #090;

  fill: #fff;

}
```

然后，可以用 JavaScript 代码操作 SVG。
```js
var mycircle = document.getElementById('mycircle');

mycircle.addEventListener('click', function(e) {

  console.log('circle clicked - enlarging');

  mycircle.setAttribute('r', 60);

}, false);
```

上面代码指定，如果点击图形，就改写circle元素的r属性。


使用`<object>`、`<iframe>`、`<embed>`标签插入 SVG 文件，可以获取 SVG DOM。
```js
var svgObject = document.getElementById('object').contentDocument;

var svgIframe = document.getElementById('iframe').contentDocument;

var svgEmbed = document.getElementById('embed').getSVGDocument();
```


注意，如果使用`<img>`标签插入 SVG 文件，就无法获取 SVG DOM。

读取 SVG 源码

## 由于 SVG 文件就是一段 XML 文本，因此可以通过读取 XML 代码的方式，读取 SVG 源码。
```html
<div id="svg-container">

  <svg

    xmlns="http://www.w3.org/2000/svg"

    xmlns:xlink="http://www.w3.org/1999/xlink"

    xml:space="preserve" width="500" height="440"

  >

    <!-- svg code -->

  </svg>

</div>
```

## 使用XMLSerializer实例的serializeToString()方法，获取 SVG 元素的代码。
```js
var svgString = new XMLSerializer()

  .serializeToString(document.querySelector('svg'));
```

## SVG 图像转为 Canvas 图像

首先，需要新建一个Image对象，将 SVG 图像指定到该Image对象的src属性。
```js
var img = new Image();

var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

var DOMURL = self.URL || self.webkitURL || self;

var url = DOMURL.createObjectURL(svg);

img.src = url;
```

然后，当图像加载完成后，再将它绘制到`<canvas>`元素。
```js
img.onload = function () {

  var canvas = document.getElementById('canvas');

  var ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0);

};
```







