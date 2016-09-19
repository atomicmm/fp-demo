require('./support')

//IO Functor
const IO = function(fn) { this._value = fn }
IO.of = x => new IO(() => x)
IO.prototype.map = function(fn) {
    return new IO(compose(this._value, fn))
}

module.exports = IO
