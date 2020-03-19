/**
 * 
 * @author guoqing.dong
 * @description 一些通用基本方法
 * 
 */


/**
 * @description 检索数据类型并返回数据类型名称 object array string undefined bool number null 等等...
 * @param { Any } data 要判断的数据
 * @param { Boolean } isToLowercase 是否将类型转化为小写
 * @return { String }
 * 
 * @example
 * checkType('1')   // string
 * @example
 * checkType({})   // object
 * @example
 * checkType([])   // array
 * @example
 * checkType(localStorage)   // storage
 */
export function checkType(data, isToLowercase = false) {
    let str = Object.prototype.toString.call(data).slice(8, -1);
    // return str.match(/\[object (.*?)\]/)[1].toLowerCase();
    return isToLowercase ? str.toLowerCase() : str;
}

/**
 * 
 * @param {any} func 传入值
 * @returns { Boolean } 返回类型
 * 
 */
export function isFunc(func = () => {}) {
    return 'Function' === checkType(func);
}

/**
 * @function 是否是波尔类型值
 * @param {any} ay 
 * @returns { Boolean } 传入值是否是 Array类型
 */
export function isArray(ay = '') {
    return 'Array' === checkType(ay);
};

/**
 * @function 是否是对象
 * @param {any} obj 
 * @returns { Boolean } 传入值是否是 Object类型
 */
export function isObj(obj = '') {
    return 'Object' === checkType(obj);
};

/**
 * @function 是否是字典
 * @param {*} map 
 * @returns { Boolean } 传入值是否是 Map类型
 */
export function isMap(map = '') {
    return 'Map' === checkType(map)
}

/**
 * @function 判断一个对象的key是否全部存在于另一个对象，如果存在不匹配直接抛出异常。
 * @param {Object} keys 需要匹配的类
 * @param {Object} obj  被匹配的类
 * @throws not contain
 */
export function containsObj(keys = {}, obj = {}) {
    if (isObj(keys) && isObj(obj)) {
        const getKeys = Object.keys(keys);
        getKeys.forEach((v, i) => {
            if (void 0 === obj[v]) {
                throw new Error("not contain")
            }
        })
    } else {
        throw new Error("not contain")
    }
}

/**
 * @description 深拷贝
 * @param { Object | Array } target 被拷贝的对象
 * @param { Boolean } isCloneFn 是否拷贝对象里面的函数
 * @return { Object | Array } 返回新的对象
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

export function deepClone(target = {}, isCloneFn = false) {
    const keys = Object.keys(target);
    if (target === null || typeof target !== 'object') return target;

    return keys.reduce((res, k) => isFunc(target[k]) && isCloneFn ?
        (res[k] = target[k].bind(res), res) :
        (res[k] = deepClone(target[k], isCloneFn), res),
        isArray(target) ? [] : {})
}

//暂时废弃，只能拷贝对象
function _deepClone(obj) {
    const keys = Object.keys(obj);
    let type;
    if (target === null || typeof target !== 'Object') return target;

    return keys.reduce((result, k) => {
        type = checkType(target[k]);
        console.log(k)
        switch (type) {
            case 'Function':
                return (result[k] = target[k].bind(result), result);
            case 'Object':
                // return (result[k] = deepClone(target[k]),result);
            case 'Array':
                return (result[k] = deepClone(target[k]), result);
            default:
                return (result[k] = target[k], result);

        }
    }, checkType(target) === 'Array' ? [] : {})
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
    isFunc,
    isObj,
    isArray,
    isMap,
    containsObj,
}