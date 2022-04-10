/**
 * 
 * @param {any} obj 
 * @param {Function} callback 
 * @returns Array
 */
export default function map(obj, callback) {
    if (!obj || !obj.length) {
        console.warn('obj must have length property')
        return
    }

    let res = [];
    let i = 0;
    for (const key in obj) {
        const result = callback.call(this, obj[key], i, obj)
        res.push(result)
    }

    return res
}