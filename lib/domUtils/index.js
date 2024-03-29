/**
 * @author guoqing.dong
 * @description dom 常用操作方法
 */


/**
 * @description 判断元素是否存在某个class类
 * @param { HTMLElement } el dom元素
 * @param { String } className class名称
 * @example
 * hasClass(document.body, 'i-utils-js')
 */
export function hasClass(el, className) {
    return el.classList.contains(className);
}
/**
 * @description 判断元素是否存在某个class类
 * @param { HTMLElement } el dom元素
 * @param { String } className class名称
 * @example
 * hasClass(document.body, 'i-utils-js')
 */
export function addClass(el, className) {
    if (Array.isArray(className)) {
        className.forEach((item) => {
            if (!hasClass(el, item)) {
                el.classList.add(item);
            }
        });
        return;
    }
    if (!hasClass(el, className)) {
        el.classList.add(className);
    }
}
/**
 * @description 元素删除class
 * @param { HTMLElement } el dom元素
 * @param { (String | Array) } className class名称，可以是多个
 * @example
 * removeClass(document.body, 'i-utils-js')
 */
export function removeClass(el, className) {
    if (Array.isArray(className)) {
        className.forEach((item) => {
            if (hasClass(el, item)) {
                el.classList.remove(item);
            }
        });
        return;
    }
    if (hasClass(el, className)) {
        el.classList.remove(className);
    }
}

export function findScroller(element) {
    element.onscroll = function() { console.log(element)}

    Array.from(element.children).forEach(findScroller);
}

// findScroller(document.body);



export default {
    hasClass,
    addClass,
    removeClass,
    findScroller
}
