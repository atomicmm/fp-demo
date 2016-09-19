require('./support')

const formatMoney = require('accounting').formatMoney

const CARS = [{
    name: "Ferrari FF",
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
}, {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
}, {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
}, {
    name: "Audi R8",
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
}, {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
}, {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
}]

const join = curry((what, arr) => arr.join(what))
const map = curry((fn, arr) => arr.map(fn))
const filter = curry((fn, arr) => arr.filter(fn))
const reduce = curry((fn, initVal, arr) => arr.reduce(fn, initVal))

const _maxBy = curry((what, arr) => maxBy(arr, what))
const replace = curry((what, str) => str.replace(/\W+/g, what))
const _underscore = replace('_')

const sanitizeNames = map(flow(property('name'), toLower, _underscore))

const formatting = flow(property('dollar_value'), formatMoney)
const availablePrices = flow(filter(property('in_stock')), map(formatting), join(', '))
const fastestCar = flow(_maxBy('horsepower'), property('name'), append(' is the fastest'))

console.log(sanitizeNames(CARS))
console.log(availablePrices(CARS))
console.log(fastestCar(CARS))
