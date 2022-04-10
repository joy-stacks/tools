import isFunction from "./isFunction"

/**
 * 防抖
 * @param {Function} fn 
 * @param {number} interval 
 * @returns Function
 */
export default function debounce(fn, interval) {
    interval = interval || 2000
    if (!isFunction(fn)) throw new Error('params must be a function')
    let timeID
    return function () {
        if (timeID) clearTimeout(timeID)

        const args = [].slice.apply(arguments)
        timeID = setTimeout(() => {
            fn.apply(this, args)
        }, interval)
    }
}