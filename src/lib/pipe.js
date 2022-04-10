import isFunction from "./isFunction"
/**
 * 批量执行函数，从左向右开始执行，上一个函数的执行结果作为下一个函数的入参
 * @returns 
 */
export default function pipe() {
    const args = Array.prototype.slice.apply(arguments)
    // 校验参数是否是函数
    const bool = args.every(fn => isFunction(fn))
    if (!bool) throw new Error('every params must be a function')

    return function () {
        return args.reduce((pre, cur) => cur.apply(this, pre), arguments)
    }
}