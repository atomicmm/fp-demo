moment = require('moment')
curry = require('lodash/curry')
compose = require('lodash/flow')

identity = require('lodash/identity')
property = require('lodash/property')
toLower = require('lodash/toLower')
maxBy = require('lodash/maxBy')
first = require('lodash/first')
isNull = require('lodash/isNull')
isNaN = require('lodash/isNaN')
isUndefined = require('lodash/isUndefined')

add = curry((what, val) => val + what)
match = curry((what, str) => str.match(what))
split = curry((what, str) => str.split(what))
append = curry((what, str) => what + str)
debug = curry((tag, val) => {
    console.log(tag, val)
    return val
})


//Maybe Functor
Maybe = function(x) { this._value = x }
Maybe.of = x => new Maybe(x)
Maybe.prototype.isNothing = function() {
    return isNull(this._value) || isUndefined(this._value)
}
Maybe.prototype.map = function(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
}

//Either Functor
Left = function(x) { this._value = x }
Left.of = xs => new Left(xs)
Left.prototype.map = function(fn) {
    return this
}

Right = function(x) { this._value = x }
Right.of = xs => new Right(xs)
Right.prototype.map = function(fn) {
    return Right.of(fn(this._value))
}


//IO Functor
IO = function(fn) { this._value = fn }
IO.of = x => new IO(() => x)
IO.prototype.map = function(fn) {
    return new IO(compose(this._value, fn))
}

//Identity Functor
Identity = function(x) {
    this._value = x
}

Identity.of = x => new Identity(x)

Identity.prototype.map = function(f) {
    return Identity.of(f(this._value));
}
