
==
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
// 下axios download file + response interceptors
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