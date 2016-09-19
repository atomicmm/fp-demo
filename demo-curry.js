const curry = require('lodash/curry')

const split = curry((what, str) => str.split(what))
const match = curry((what, str) => str.match(what))

const map = curry((fn, arr) => arr.map(fn))
const filter = curry((fn, arr) => arr.filter(fn))
const reduce = curry((fn, initValue, arr) => arr.reduce(fn, initValue))
const slice = curry((from, end, arr) => arr.slice(from, end))

const _keepHighest = (x, y) => x >= y ? x : y
const _keepLowest = (x, y) => x < y ? x : y

const words = split(' ')
const matchQ = match(/q/i)
const take = slice(0)

const sentence = map(words)
const filterQs = filter(matchQ)

const max = reduce(_keepHighest, Number.NEGATIVE_INFINITY)
const min = reduce(_keepLowest, Number.POSITIVE_INFINITY)

console.log(words('hello world'))
console.log(sentence(['hello world', 'this is fpp test', 'i am atomic']))
console.log(matchQ('qwe123'))
console.log(filterQs(['qwe123', 'abcd1', 'edefg']))

console.log(max([3, 5, 1, 4, 10, 6]))
console.log(min([3, 5, 1, 4, 10, 6]))
console.log(take(3)([1, 2, 3, 4, 5, 6]))
