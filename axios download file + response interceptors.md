# axios download file + response interceptors
```js
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