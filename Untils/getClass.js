
function _getClass(object) {
  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj) {
  return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
  return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
  return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
  return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
  return _getClass(obj).toLowerCase() === 'number' && !isNaN(obj);
}

export function isFormData(obj){
  return obj instanceof FormData;
}


export function isEmpty(obj) {
  var empty = false;

  if (obj === null || obj === undefined) { // null and undefined
      empty = true;
  } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
      empty = true;
  } else if (isObject(obj)) {
      var hasProp = false;
      for (let prop in obj) {
          if (prop) {
              hasProp = true;
              break;
          }
      }
      if (!hasProp) {
          empty = true;
      }
  }
  return empty;
}

export function isNotEmpty(obj) {
  return !isEmpty(obj);
}
/**
* @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中有空格的情况, 如: '   '.
* @param {string} str 需判断的字符串
*/
export function isBlank(str) {
  if (isEmpty(str)) {
      return true;
  } else if (isString(str) && str.trim().length === 0) {
      return true;
  }
  return false;
}

// 判断字段是否异常，如果异常则返回‘--’
export function fieldAnomaly(value) {
  if(isBlank(value)){
      return '--';
  }
  return value;
}

/**
* @desc 判断参数是否不为空字符串
*/
export function isNotBlank(obj) {
  return !isBlank(obj);
}
/**
* @desc 生成一个随机id
*/
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export function getUrlParam(param){
  if(location.href.split('?').length <= 1){
      return;
  }
  let newParam = {};
  let url = location.href.split('?')[1].split('&');
  url.forEach((param)=>{
      newParam[param.split('=')[0]] = param.split('=')[1];
  });
  return newParam && newParam[param];
}
/**
* @desc 通过URL搜索对象获取url参数, 如www.xxx.com?a=1&b=2, getURLParam('a') return 1
*/
export function getURLParam(name){
  if(isBlank(name)){
      return;
  }
  // var urlQuery = getURLQuery();
  var urlQuery = getQueryParams();
  return urlQuery[name];
}
