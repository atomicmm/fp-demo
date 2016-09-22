const compose = require('lodash/flow')
const curry = require('lodash/curry')
const debug = curry((tag, what) => {
    console.log(tag, what)
    return what
})

//after 创建一个func，他在被调用N次后才会真在执行
const after = require('lodash/after')
const done = after(2, () => console.log('after'))
done()
done()

//before 创建一个func，他在N次调用前都会执行
const before = require('lodash/before')
const beforeDone = before(3, () => console.log('before'))
beforeDone()
beforeDone()
beforeDone()

//ary 创建一个func，只接受N个参数，会忽略后面的其他
const ary = require('lodash/ary')
const fnAry = ary(console.log, 2)
fnAry(1,2,3)
