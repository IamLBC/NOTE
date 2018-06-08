日期对象
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
// 关于下载二进制文件流
// 下载请求参数对象
let obj = { 
  fileId: row.fileId,
  fileName: row.fileName
}
// 转FormDate格式：
let sendDate = ''
Object.keys(obj).forEach((key,index)=>{
  if (index + 1 === Object.keys(obj).length) {
    sendDate += key + '=' + obj[key]
  } else {
    let temp = key + '=' + obj[key] + '&'
    sendDate += temp
  }
})
this.axios.post('url',sendDate,{
  responseType: 'arraybuffer',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(res=>{
  let name = res.headers['content-desposition'].split('=')[1]
  let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset-UTF-8'})
  let objectUrl = URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.href = objectUrl
  link.download = decodeURI(name)
  // window.location.href = objectUrl
  // window.URL.revokeObjectURL(link.href)
  link.click()
}).catch(err => {})
```