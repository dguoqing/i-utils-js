import {
    GenericUtils
} from '../lib/index'
const {
    deepClone
} = GenericUtils


let obj = {
    a: 1,
    b: {
        bb: 'bb',
        fn: function () {
            console.log(this.bb)
        },
        arr: [{
            arr1: 'arr1',
            arr2: 'arr2'
        }, {
            arr1: 'arr11',
            arr2: 'arr22'
        }, ]
    },
    cc: [123, 23, 1233, ]
}
let deepObj = deepClone(obj,true)
console.log(obj.b.fn === deepObj.b.fn)
console.log(obj.b.arr[1] === deepObj.b.arr[1])
