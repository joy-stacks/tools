import cloneDeep from './lib/cloneDeep'
import compose from './lib/compose'
import forEach from './lib/forEach'
import isFunction from './lib/isFunction'
import map from './lib/map'
import pipe from './lib/pipe'

const tools = function (data) {
    // 调用tools 中方法，如果不是 tools的实例，则创建一个实例
    if (!(this instanceof tools)) {
        return new tools(data)
    }
    this._wrapper = data
}

tools.cloneDeep = cloneDeep
tools.compose = compose
tools.forEach = forEach
tools.isFunction = isFunction
tools.map = map
tools.pipe = pipe

/**
 * 定义不可遍历的属性
 * @param {Object} target 
 * @param {String} property 
 * @param {any} value 
 */
const def = function (target, property, value) {
    Object.defineProperty(target, property, {
        enumerable: false,
        writable: false,
        configurable: false,
        value
    })
}

/**
 * 开始链式调用，返回一个链式调用的对象
 * @param {Object} obj 
 * @returns Object
 */
tools.chain = function (obj) {
    const instance = tools(obj)
    instance._chain = true
    return instance
}

/**
 * 获取对象上属性值是Function的属性名称集合
 * @param {Object} obj 
 * @returns Array
 */
const functions = function (target) {
    const names = []
    for (const key in target) {
        if (isFunction(target[key])) names.push(key)
    }
    return names.sort()
}

def(tools, 'functions', functions)
def(tools, 'methods', functions)

/**
 * 链式调用的结果
 * @param {Object} instance 
 * @param {any} obj 
 * @returns 
 */
const chainResult = function (instance, obj) {
    return instance._chain ? tools(obj).chain() : obj
}

/**
 * 将对象上的属性添加到原型中
 * @param {Object} target 
 * @returns Object
 */
tools.mixin = function (target) {
    forEach(tools.functions(target), function (key) {
        const func = target[key]
        tools.prototype[key] = function () {
            const args = [this._wrapper]
            // 解构arguments，并将每一项添加到 args中
            Array.prototype.push.apply(args, arguments)
            return chainResult(this, func.apply(this, args))
        }
    })
    return tools
}

tools.mixin(tools)

export default tools
