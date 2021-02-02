import { GenericUtils } from "../lib/index";
const { deepClone } = GenericUtils;

let obj = {
	a: 1,
	b: {
		bb: "bb",
		fn: function () {
			console.log(this.bb);
		},
		arr: [
			{
				arr1: "arr1",
				arr2: "arr2",
			},
			{
				arr1: "arr11",
				arr2: "arr22",
			},
		],
	},
	cc: [123, 23, 1233],
};
let deepObj = deepClone(obj, true);
console.log(obj.b.fn === deepObj.b.fn);
console.log(obj.b.arr[1] === deepObj.b.arr[1]);

function isToday(str) {
	var d = new Date(str);
	var todaysDate = new Date();
	if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
		return true;
	} else {
		return false;
	}
}
// console.log("<<<<<<", isToday(new Date().getTime())); //返回true

function isSameWeek(old, now) {
	var oneDayTime = 1000 * 60 * 60 * 24;
	var old_count = parseInt(old.getTime() / oneDayTime);
	var now_other = parseInt(now.getTime() / oneDayTime);
	return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
}

console.log("??", isSameWeek(new Date("2020-12-26 23:59:59"), new Date()));
