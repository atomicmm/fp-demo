moment = require('moment')
curry = require('lodash/curry')
compose = require('lodash/flow')

identity = require('lodash/identity')
property = require('lodash/property')
toLower = require('lodash/toLower')
maxBy = require('lodash/maxBy')
first = require('lodash/first')
last = require('lodash/last')
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

map = curry((fn, functor) => functor.map(fn))
maybe = curry((x, fn, m) => m.isNothing() ? x : fn(m._value))
join = curry(monad => monad.join())
chain = curry((fn, monad) => monad.map(fn).join())
either = curry((lfn, rfn, functor) => {
    switch (functor.constructor) {
        case Left:
            return lfn(functor._value)
        case Right:
            return rfn(functor._value)
    }
})

liftA2 = curry((fn, functor1, functor2) => functor1.map(fn).ap(functor2))
liftA3 = curry((fn, functor1, functor2, functor3) => functor1.map(fn).ap(functor2).ap(functor3))
liftA4 = curry((fn, functor1, functor2, functor3, functor4) => functor1.map(fn).ap(functor2).ap(functor3).ap(functor4))

safeProp = curry((prop, obj) => Maybe.of(obj[prop]))
safeHead = safeProp(0)

//Maybe Functor
Maybe = function(x) { this._value = x }
Maybe.of = x => new Maybe(x)
Maybe.prototype.join = function() {
    return this.isNothing() ? Maybe.of(null) : this._value
}
Maybe.prototype.chain = function(fn) {
    return this.map(fn).join()
}
Maybe.prototype.isNothing = function() {
    return isNull(this._value) || isUndefined(this._value)
}
Maybe.prototype.map = function(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
}
Maybe.prototype.ap = function(other) {
    return this.isNothing() ? Maybe.of(null) : other.map(this._value)
}

//Either Functor
Left = function(x) { this._value = x }
Left.of = xs => new Left(xs)
Left.prototype.map = function(fn) {
    return this
}
Left.prototype.join = function() {
    return this
}
Left.prototype.chain = function() {
    return this
}

Right = function(x) { this._value = x }
Right.of = xs => new Right(xs)
Right.prototype.map = function(fn) {
    return Right.of(fn(this._value))
}
Right.prototype.join = function() {
    return this._value
}
Right.prototype.chain = function(fn) {
    return fn(this._value)
}

//IO Functor
IO = function(fn) { this.unsafePerformIO = fn }
IO.of = x => new IO(() => x)
IO.prototype.map = function(fn) {
    return new IO(compose(this.unsafePerformIO, fn))
}
IO.prototype.join = function() {
    return this.unsafePerformIO()
}
IO.prototype.chain = function(fn) {
    return this.map(fn).join()
}
IO.prototype.ap = function(other) {
    return this.chain(fn => other.map(fn))
}

//Identity Functor
Identity = function(x) {
    this._value = x
}

Identity.of = x => new Identity(x)

Identity.prototype.map = function(f) {
    return Identity.of(f(this._value));
}
