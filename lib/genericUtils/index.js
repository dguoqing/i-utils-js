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
 * checkType('1')   // String
 * @example
 * checkType({}, true)   // object
 * @example
 * checkType([])   // Array
 * @example
 * checkType(localStorage)   // Storage
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
export function isFunc(func) {
    return 'Function' === checkType(func);
}

/**
 * @function 是否是波尔类型值
 * @param {any} ay 
 * @returns { Boolean } 传入值是否是 Array类型
 */
export function isArray(ay) {
    return 'Array' === checkType(ay);
};

/**
 * @function 是否是对象
 * @param {any} obj 
 * @returns { Boolean } 传入值是否是 Object类型
 */
export function isObj(obj) {
    return 'Object' === checkType(obj);
};

/**
 * @function 是否是字典
 * @param {*} map 
 * @returns { Boolean } 传入值是否是 Map类型
 */
export function isMap(map) {
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
 * @function deepClone
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
 * @function extend
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
 * @function uniqueArray
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

/**
 * @function randomColor
 * @description 16进制随机颜色
 * 
 */
export function randomColor() {
    return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
}

class CheckJSONSchema {
    constructor(resource, schema, id) {
        // this.resource =resource;
        // this.schema = schema;
        // this.id = id
        this.keys = [];
    }
    validate = (resource, schema, key) => {
        if (isArray(schema) && isArray(resource)) return this.checkArray(resource, schema);
        if (isObject(schema) && isObject(resource)) return this.checkObject(resource, schema);
        return this.checkType(resource, schema, key);
    };
    /**
     *
     * @param {*} resource 需要校验的数据
     * @param {*} schema 数据模型
     * @returns
     */
    validateSchema = (resource, schema, id) => {
        this.id = id;
        this.keys = [];
        return this.validate(resource, schema);
    };
    /**
     *异步校验数据
     * @param {*} resource
     * @param {*} schema
     * @param {*} id
     * @returns Promise
     */
    asyncValidateSchema = (resource, schema, id) => {
        return new Promise(resolve => {
            resolve(this.validateSchema(resource, schema, id));
        });
    };
    checkType = (resource, schema, key) => {
        //  需要校验的数据与模型中的数据类型不一致
        if (getType(resource) !== getType(schema)) {
            //TODO
            // log('顶层')
            key && this.keys.push(key);
            return schema;
        }
        return resource;
    };
    checkArray = (resource, schema) => {
        //顶层数据结构是数组
        // if(resource.length){
        //     const [r] = resource;
        //     const [s] = schema;
        //     return this.validate(r,s)
        // }
        return resource;
    };
    checkObject = (resource, schema) => {
        let result = {};
        let keys = Object.keys(schema);
        result = keys.reduce((res, key) => {
            res[key] = this.validate(resource[key], schema[key], key);
            return res;
        }, {});
        console.log(`<${this.id ?? '校验模型'}>使用了模型中的数据的key:`, this.keys);
        return result;
    };
}
export const { validateSchema, asyncValidateSchema } = new CheckJSONSchema();

/**
 * 安全取值 取对象的值,只需要传第一个参数
 * @param {*} obj
 * @param {*} path
 * @returns
 * @example safeGetter(obj).a.b.c(defaultValue)
 */
export function safeGetter(obj, path = []) {
    return new Proxy(() => {}, {
        get(target, property) {
            return safeGetter(obj, path.concat(property));
        },
        apply(target, self, args) {
            let val = obj;
            let parent;
            while (path.length) {
                if (val === null || val === void 0) break;
                parent = val;
                val = val[path.shift()];
            }
            if (val === null || val === void 0) {
                val = args[0];
            }
            return val;
        },
    });
}

/**
 * 深度取值
 * @param {Object} obj 要取值的对象
 * @param {String} props 取值的路径
 * @param {*} def 默认值
 * @returns
 *
 * @example let a = {b:{c:1}}  depthGetter(a,'b.c') => 1
 */
export function depthGetter(obj, props, def) {
    if (obj == null || obj == void 0 || typeof props !== 'string') return def;
    const temp = props.split('.');
    const fieldArr = [].concat(temp);
    temp.forEach((e, i) => {
        if (/^(\w+)\[(\w+)\]$/.test(e)) {
            const matchs = e.match(/^(\w+)\[(\w+)\]$/);
            const field1 = matchs[1];
            const field2 = matchs[2];
            const index = fieldArr.indexOf(e);
            fieldArr.splice(index, 1, field1, field2);
        }
    });
    return fieldArr.reduce((pre, cur) => {
        const target = pre[cur] || def;

        if (Array.isArray(target)) {
            return [].concat(target);
        }
        if (Object.prototype.toString.call(target).slice(8, -1) === 'Object') {
            return Object.assign({}, target);
        }
        return target;
    }, obj);
}

/**
 * 处理金额，保留几位小数、千位分隔符
 * @param {*} value 
 * @param {*} addComma 是否加逗号分隔符
 * @param {*} digits 保留小数位数
 * @param {*} autoFill 小数部分，不足是否补0
 * @param {*} noRoundFlag 是否不四舍五, 默认是
 * @returns 
 */
export function toDecimalString(value, addComma = false, digits = 2,autoFill = true,noRoundFlag = false,def = '--'){

    let str = value + '';
    
    //默认保留两位小数
    digits = digits ?? 2;
    if(!str.length) str = '';
    str = str.replace(/\,/g,'');
    let reg = /^[+-]?((\d{1,3}(\,\d{3})*|\d*)?(\.\d*)?)$/;
    if(reg.test(str)){
        if(str.trim() === '') return def;
        //解析符号、整数部分、小数部分
        let  sign = str.charAt(0);
        if(sign === '+' || sign === '-'){
            str = str.substring(1)
        }else{
            sign = ''
        }

        let pointPos = str.indexOf('.');
        let integer = str;
        let decimal = '';

        //分割小数、整数部分
        if(pointPos >= 0){
            integer = str.substring(0,pointPos);
            decimal = str.substring(pointPos + 1);
        }

        //处理整数部分，知道开头不是0
        while(integer.charAt(0) === '0'){
            integer = integer.substring(1);

        }

        if(!(typeof digits == 'number') && digits >= 0 && (pointPos < 0 || pointPos + 1 === str.length)){
            digits = 0
        }

        // 整数部分长度为0，则整数为0
        if(integer.length === 0) integer = '0';


        //小数和四舍五入
        if(digits && typeof digits === 'number' && digits >= 0){
            if(autoFill){
                while(decimal.length < digits){
                    decimal += '0'
                }
            }

            //需要四舍五入的数字
            let nextNumber = decimal.charAt(digits);
            decimal = decimal.substr(0, digits);

            //nextNumber 大于等于 5 则进一位
            if(!noRoundFlag && parseFloat(nextNumber) >= 5){
                let tmp  = Math.pow(10,digits);
                let newValue = (sign ? sign : '') + (parseFloat(integer, 10) * tmp + parseFloat(decimal, 10) + 1) / tmp;
                return toDecimalString(newValue, addComma, digits,autoFill, noRoundFlag)
            }
        }

        //加逗号
        if(addComma){
            let sb = '';
            for(let i = 0,len = integer.length; i< len; i++){
                sb+= integer.charAt(i);
                if((i + 1) % 3 == len % 3 && i + 1 != len){
                    sb+=',';
                }
            }

            integer = sb;
        }
        //拼合
        let res = '';
        if(sign) res += sign;
        res += integer;
        if(decimal) res += '.' + decimal;

        return res;

    }else{
        return def
    }

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
    randomColor,
    validateSchema,
    asyncValidateSchema,
    safeGetter,
    depthGetter,
    toDecimalString
}