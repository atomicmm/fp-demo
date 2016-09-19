require('./support')

//base Container
const Container = function(x) { this._value = x }
Container.of = function(x) {
    return new Container(x)
}
Container.prototype.map = function(fn) {
    return Container.of(fn(this._value))
}


console.log(Container.of(2).map(item => item + 2))
console.log(Container.of('Hello World').map(val => val.toUpperCase()))
console.log(Container.of('bombs').map(append(' away')).map(property('length')))
