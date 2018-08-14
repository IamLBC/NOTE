# display
通过display属性设置属性值为`grid`或`inline-grid`可以创建一个网格容器。网格容器中的所有子元素就会自动变成网格项目（grid item）
```css
display: grid
display: inline-grid
```

# 显式网格
使用`grid-template-columns`和g`rid-template-rows`属性可以显式的设置一个网格的列和行 

* 默认值为none
* 长度可以是px、%、em等长度单位的值
* fr：总长度的份数
```css
<!-- 代表（总宽度 - 3rm - 总宽度*25%）/ 3 -->
grid-template-columns: 3rem 25% 1fr 2fr 
```

## minmax()
可以通过minmax()函数来创建网格轨道的最小或最大尺寸。minmax()函数接受两个参数：第一个参数定义网格轨道的最小值，第二个参数定义网格轨道的最大值。可以接受任何长度值，也接受auto值。auto值允许网格轨道基于内容的尺寸拉伸或挤压
```css
grid-template-rows: minmax(100px, auto);
grid-template-columns: minmax(auto, 50%) 1fr 3em;
```
　　在这个示例中，第一行的高度最小值是100px，但其最大值为auto，允许行的高度可以变大超过100px。第一列设置了最小值为auto，但它的最大值是50%，也就是列的最大宽度不会超过网格容器宽度的50%


## repeat()
使用repeat()可以创建重复的网格轨道。这个适用于创建相等尺寸的网格项目和多个网格项目。repeat()接受两个参数：第一个参数定义网格轨道应该重复的次数，第二个参数定义每个轨道的尺寸。
```css
grid-template-rows: repeat(3, 1fr);    
grid-template-columns: 30px repeat(3, 1fr) 30px;
```
在这个示例中，第一列和最后一列的宽度都是30px，并且它们之间有另列三列，这三列是通过repeat()来创建的，而且每列的列宽是1fr（1fr = (网格宽度 - 30px - 30px) / 3）

## 间距
`grid-column-gap` 创建列与列之间的间距

`grid-row-gap` 创建行与行之间的间距

`grid-gap` 默认值为0

grid-gap是grid-row-gap和grid-column-gap两个属性的缩写，如果它指定了两个值，那么第一个值是设置grid-row-gap的值，第二个值设置grid-column-gap的值。如果只设置了一个值，表示行和列的间距相等
[注意]grid-gap只能创建列与列或行与行之间的间距，但不能创建列和行与网格容器边缘的间距
间距(Gap)可以设置任何非负值，长度值可以是px、%、em等单位值

# 网格项目
【grid-row-start】
【grid-row-end】
【grid-column-start】
【grid-column-end】
【grid-row】
【grid-column】
【grid-area】
```css
grid-row: 2; 
grid-column: 3 / 4;
grid-area: 2 / 2 / 3 / 3;
```
* grid-row: `grid-row-start`和`grid-row-end`的简写。
* grid-column: `grid-column-start`和`grid-column-end`的简写。
* 如果只提供一个值，则指定了`grid-row-start` | `grid-column-start` 值；
* 如果提供两个值，第一个值是`grid-row-start` | `grid-column-start`的值，第二个值是`grid-row-end` | `grid-column-end`的值，两者之间必须要用`/`隔开
* 默认值为auto
* grid-area: 如果指定四个值，第一个值对应`grid-row-start`，第二个值对应`grid-column-start`，第三个值对应`grid-row-end`，第四个值对应`grid-column-end`

## 【span】
关键词span后面紧随数字，表示合并多少个列或行
```css
grid-row: 1 / span 3;
grid-column: span 2;
```

