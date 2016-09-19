require('./support')

//Maybe Functor
const Maybe = function(x) { this._value = x }
Maybe.of = function(x) {
    return new Maybe(x)
}
Maybe.prototype.isNothing = function() {
    return isNull(this._value) || isUndefined(this._value)
}
Maybe.prototype.map = function(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
}

module.exports = Maybe
