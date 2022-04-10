/**
 * 剩余参数
 * @param {Function} callback 
 * @param {number} startIndex 
 * @returns 
 */
export function restArguments(callback, startIndex) {
    // callback.length 获取回调函数中参数的个数
    startIndex = startIndex === null ? callback.length - 1 : +startIndex

    return function () {

    }
}