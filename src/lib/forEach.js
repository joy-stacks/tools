/**
 * 数组遍历
 * @param {any} obj 
 * @param {Function} callback 
 */
export default function forEach(obj, callback) {
    if (!obj || !obj.length) {
        console.warn('obj must have length property')
        return
    }

    let i = 0;
    for (const key in obj) {
        callback.call(this, obj[key], i, obj)
        i++
    }
}