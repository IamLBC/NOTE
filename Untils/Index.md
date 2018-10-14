 
```js
// dd-MM-yyyy HH:mm:ss
export const dateRules = (date) => {
    return date.toLocaleString("en-US", { hour12: false }).replace(/\b\d\b/g, '0$&').replace(new RegExp('/', 'gm'), '-')
}
```

```js
// yyyy-MM-dd HH:mm:ss
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
```

```js
// 计算两个日期的差距
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -> 9
```

```js
// axios download file + response interceptors
import axios from 'axios'
axios.interceptors.response.use(res=> {
  const download = res => {
    let fileName = decodeURI(res.headers["content-disposition"].split("=")[1])
    let contentType = res.headers['content-type'] 
    let blob = new Blob([res.data], {type: contentType})
 
    if ('download' in document.createElement('a')) {
      const link = document.createElement('a')
      link.download = fileName
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    } else {
      navigator.msSaveBlob(blob, fileName)
    }
  }
 
  let contentType = res.headers['content-type'] 
  const EXCEL = 'application/vnd.ms-excel;charset=UTF-8'
  const OFFICE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const FORCE = 'application/force-download;charset=UTF-8'
  if (res.headers && (contentType === EXCEL || contentType === OFFICE || contentType === FORCE)) {
    download(res)
    res.data = 'is file --> download';
    res.headers['content-type'] = 'text/json'
  } 
  return res
}, error => {
  return Promise.reject(error.response.data || error.message)
})
 
export const fetchApi = ({url, type, timeout, headers, data, params, responseType, success, error}) => {
  return axios({
    method: type || "get",
    url: "/ppm-service/" + url,
    timeout: timeout || 60*1000,
    headers: headers || {'Content-Type': 'application/x-www-form-urlencoded'},
    responseType,
    data,
    params
  })
  .then(res => {
    return res.data
  })
  .catch(err => {
    throw err
  })
}
 
export function exportFile(url, obj) {
  let data = ""
  Object.keys(obj).forEach((key, index) => {
    if (index + 1 === Object.keys(obj).length) {
      data += key + "=" + obj[key]
    } else {
      data += key + "=" + obj[key] + "&"
    }
  })
  fetchApi({
    type: 'post',
    url,
    data,
    responseType: 'blob'
  }).then(res => {
    console.log(res)
  })
}
```

[运算]: http://www.css88.com/archives/7340
[运算]
```js
// + 
function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}
 
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
};
```
```js
// -
function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
```
```js
// *
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  }
  catch (e) {
  }
  try {
    m += s2.split(".")[1].length;
  }
  catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
```
```js
// /
function accDiv(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
  }
  with (Math) {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}
```

```js
let reg = /^ \-? (?!0+(?:\.0+)?$) (?:[1-9]\d*|0) (?:\.\d{1,2})? $/ //小数点后最多保留两位,可以是负数 正则
```

## 深拷贝

```js
// 方法一：利用JSON.stringify和JSON.parse
// 这种方式进行深拷贝，只针对json数据这样的键值对有效
// 对于函数等等反而无效，不好用，
let swr = {
    name:"lbc",
    age:18,
    pets:['lucky']
}

let swrcopy = JSON.parse(JSON.stringify(swr))

// 方法二：
function deepCopy(fromObj,toObj) { // 深拷贝函数
  // 容错
  if(fromObj === null) return null // 当fromObj为null
  if(fromObj instanceof RegExp) return new RegExp(fromObj) // 当fromObj为正则
  if(fromObj instanceof Date) return new Date(fromObj) // 当fromObj为Date

  toObj = toObj || {}
  
  for(let key in fromObj){ // 遍历
    if(typeof fromObj[key] !== 'object'){ // 是否为对象
      toObj[key] = fromObj[key] // 如果为普通值，则直接赋值
    }else{
      if(fromObj[key] === null){
        toObj[key] = null
      }else{
        toObj[key] = new fromObj[key].constructor // 如果为object，则new这个object指向的构造函数
        deepCopy(fromObj[key],toObj[key]) // 递归          
      }
    }
  }
  return toObj
}

// 方法三：
function deepCopy(obj) {
  if(obj === null) return null
  if(typeof obj !== 'object') return obj
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  let newObj = new obj.constructor
  for(let key in obj){
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}
```

```js
// 递归深度展开树结构数组
export function deepOpenArray (arr) {
  var temp = []
  arr.forEach(item => {
    temp.push({
      tag: item.tag,
      label: item.label,
      id: item.id
    })
    if (item.children && item.children.length > 0) {
      temp = temp.concat(deepOpenArray(item.children))
    }
  })
  return temp
}
```

```js
// 获取所有标题，创建树结构
export function getTree (content) {

  // 找上一级
  function findParent (tag, arr) {
    return arr.filter(item => {
      return item.tag === tag
    }).slice(-1)[0].pid
  }

  let arr = content.match(/<h[1-6].*?>.*?<\/h[1-6]>/g) || []

  arr = arr.map(item => item = item.replace(/<\/?(small|cite|ins|del|pre|span|a|hr|font|p|div|strike|u|address|center|pre|abbr|blockquote|dir|ul|ol|dl|li|ins|strong|em|sub|sup|b|s|i).*?>|<br\/?>/g, "").replace(/style=".*?"/g, ""))
  
  return arr.map((item, index, self) => { // 初始化结构
    let obj = {
      label: item,
      id: index + 1,
      tag: "h" + item[2],
      rank: item[2] * 1
    }
    if (item[2] !== self[0][2]) {
      obj = Object.assign(obj, {pid: 1}) // pid：parentId
    }
    return obj
  })
  // 生成关系链
  .map((item, index, self) => {
    if (item.pid) {
      if (item.rank > self[index - 1].rank) {
        item.pid = self[index -1].id
      } else if (item.rank === self[index - 1].rank) {
        item.pid = self[index - 1].pid
      } else {
        var temp = self.slice(0, index)
        item.pid = findParent(item.tag, temp)
      }
    }
    return item
  })
  // 生成树结构
  .filter((father, i, self) => {
    father.label = father.label.replace(/<h[1-6].*?>|<\/h[1-6]>/g, "").replace(/&nbsp;/g, " ")
    //生成children
    let branchArr = self.filter(child => {
      return father.id === child.pid
    })
    if(branchArr.length > 0) {
      father.children = branchArr
    }
    //返回没有pid的一级元素
    return !father.pid
  })
}
```

```css
<!-- el-tree 使其出现纵横向scroll -->
.treeBox {
  height: 626px;
  overflow: auto;
}

.treeBox .el-tree > .el-tree-node { /* 设置第一级分支出现横向滚动 */
  min-width: calc(100% -20px);
  display: inline-block !important;
}
```

## 点击生成的 el-tree 使Ueditor对应元素出现在视口

```js
anchor (tag, index) {
  UE.getEditor('editor').focus() // IE下先聚焦
  setTimeout(() => {
    let el = this.editor.document.getElementsByTagName(tag)[index]
    el.scrollIntoView()
  }, 0)
}
```