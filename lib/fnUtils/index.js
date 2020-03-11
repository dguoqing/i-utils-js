/**
 * 
 * @author guoqing.dong
 * 
 * @description 一些常用的工具函数
 * 
 */


/**
 * @description 检索数据类型并返回数据类型名称 object array string undefined bool number null 等等...
 * @param { Any } data 要判断的数据
 * @example
 * checkType('1')   // string
 * @example
 * checkType({})   // object
 * @example
 * checkType([])   // array
 * @example
 * checkType(localStorage)   // storage
 */
export function checkType(data) {
  let str = Object.prototype.toString.call(data);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}

/**
 * @description 深拷贝
 * @param { Object } obj 被拷贝的对象
 * @return { Object } 返回新的对象
 * @example
 * let a = {
 *   a: 1,
 *   b: 2,
 *   c: 3,
 *   d: [1, 2]
 * }
 * let b = deepClone(a)
 * a.d[0] = 3
 * console.log(a)
 * // a: {a: 1, b: 2, c: 3, d: [3, 2]}
 * console.log(b)
 * // b: {a: 1, b: 2, c: 3, d: [1, 2]}
 * // 此时修改a.d[0]的值， a对象变化了，b对象没有随之改变
 */
export function deepClone(obj) {
  const result = {};
  const keys = Object.keys(obj);
  let type;
  for (let k of keys) {
    type = checkType(obj[k]);
    switch (type) {
      case 'object':
        result[k] = deepClone(obj[k]);
        break;
      case 'array':
        result[k] = [].concat(obj[k]);
        break;
      default:
        result[k] = obj[k];
    }
  }
  return result;
}

/**
 * @description extend继承方法 Object.assign(...arg)的包装
 * @param { Any }   参数为object对象
 * @returns { Object } 返回一个新的对象
 * @example
 * extend({a: 1}, {a: 2})   // {a: 1}
 * ⚠️ Object.assign属于浅拷贝,为了后续的操作不影响到之前的数据,最好在extend的第一个参数设置为{}
 */
export function extend(...arg) {
  return deepClone(Object.assign({}, ...arg));
}

/**
 * @description 数组去重
 * @param { Arrary } arr 要去重的arr
 * @return { Array } 返回一个新的数组，不改变原来的数组
 * @example
 * // [1, 2, 3, undefined, "4"]
 * uniqueArray([1,2,3,3,,3,3,'4',"4",'4',])
 */
export function uniqueArray(arr) {
  return [...new Set(arr)];
}


export default {
  checkType,
  deepClone,
  extend,
  uniqueArray,
}