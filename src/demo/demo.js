//防抖函数

const oInput = document.getElementById("inp");
// const debounce = (fn) => {
//     let timer = null
//     return (...arg) => {
//         console.log(arg)
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn.apply(this,arg)
//         },5000)
//     }
// }

// const thtrottle = (fn) => {
//     let isRun = true;
//     return (...arg) => {
//         if(!isRun) return;
//         isRun = false;
//         setTimeout(() => {
//             fn.call(this,...arg);
//             isRun = true
//         },4000)

//     }
// }
// const debounce = (fn, delay = 4000) => {
//     let timer = null;
//     return (...arg) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn.call(this, ...arg)
//         }, delay)
//     }
// }

const debounce = (fn, delay = 1000) => {
	let timer = null;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.call(this, ...args);
		}, delay);
	};
};

const throttle = (fn, delay = 4000) => {
	let isRun = true;
	return (...arg) => {
		if (!isRun) return;
		isRun = false;
		setTimeout(() => {
			fn.call(this, ...arg);
			isRun = true;
		}, delay);
	};
};

oInput.addEventListener(
	"input",
	throttle((e) => {
		setTimeout(() => {
			console.log(222, e);
		});
	})
);

//new
function _new() {
	let [fn, ...arg] = [...arguments];
	let obj = Object.create(fn.prototype);
	let rt = fn.apply(obj, arg);
	return typeof rt === "object" ? rt : obj;
}
function Person(name) {
	this.name = name;
}
let p = _new(Person, "j");
let p2 = _new(Person, "jccc");
console.log(p.__proto__ === Person.prototype);
console.log(p);
console.log(p2);
let my = {
	value: "1212",
};
//call

Function.prototype.myCall = function (context) {
	const ctx = context || window;
	ctx.fn = this;
	let [m, ...rest] = [...arguments];
	let res = ctx.fn(...rest);
	delete ctx.fn;
	console.log(res);
	return res;
};
function mc(...rest) {
	console.log(this);
	console.log(this, rest);
}
mc.myCall(my, 1, 2, 3, 4);

Function.prototype.myApply = function (context) {
	const ctx = context || window;
	ctx.fn = this;
	let res = ctx.fn(...arguments[1]);
	delete ctx.fn;
	return res;
};
// mc.myApply(my,[1,2,6,7])

Function.prototype.myBind = function (context) {
	const ctx = context || window;
	ctx.fn = this;
	const args = Array.from(arguments).slice(1);
	return function (...rest) {
		let all = [...args, ...rest];
		return ctx.fn(...all);
	};
};
let a = {
	cc: "111",
};
let bindMc = mc.myBind(my);
bindMc.myCall(a);
bindMc(1, 2, 3);

///asdfsd
