const last = require('lodash/last')
const first = require('lodash/first')
const curry = require('lodash/curry')
const property = require('lodash/property')
const toLower = require('lodash/toLower')

const compose = function(f, g) {
    return function(x) {
        return f(g(x))
    }
}

const add = curry((x, y) => x + y)
const map = curry((fn, arr) => arr.map(fn))
const replace = curry((what, replacement, str) => str.replace(what, replacement))
const filter = curry((fn, arr) => arr.filter(fn))
const reduce = curry((fn, initValue, arr) => arr.reduce(fn, initValue))

const CARS = [
    { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
]
const _average = xs => reduce(add, 0, xs) / xs.length
const _underscore = replace(/\W+/g, '_')

const getValues = map(property('dollar_value'))

const isLastInStock = compose(property('in_stock'), last)
const nameOfFirstCar = compose(property('name'), first)
const averrageDollarValue = compose(_average, getValues)
const sanitizeNames = map(compose(_underscore, toLower))


console.log(isLastInStock(CARS))
console.log(nameOfFirstCar(CARS))
console.log(averrageDollarValue(CARS))
console.log(sanitizeNames(['Hello World']))
