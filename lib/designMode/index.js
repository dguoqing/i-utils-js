/**
 * 
 * @author guoqing.dong
 * 
 * @description 一些简单的设计模式
 */


/**
 * 
 * @description 发布订阅模式
 * 
 */

export class Events {
    constructor() {
        this._evnets = Object.create(null);
    }

    on(event, fn) { // 往事件中心添加事件
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.on(evnet[i], fn);
            }
        } else {
            (this._evnets[event] || (this._evnets[event] = [])).push(fn);
        }
    }

    emit(event, ...args) { // 触发事件中心对应事件
        const cbs = this._evnets[event];
        if (cbs) {
            for (let i = 0; i < cbs.length; i++) {
                cbs[i].apply(this, args);
            }
        }
    }

    off(event, fn) { // 移除事件
        if (!arguments) {
            this._evnets = Object.create(null);
            return this;
        }
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.off(event[i], fn);
            }
            return this;
        }
        if (!fn) {
            this._evnets[event] = null;
            return this;
        }
        const cbs = this._evnets[event];
        let i = cbs.length;
        while (i--) {
            const cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
            }
        }
        return this;
    }

    once(evnet, fn) { // 只执行一次
        function on() {
            this.off(evnet, on);
            fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(evnet, on);
        return this;
    }
}
export default {
    Events,
}