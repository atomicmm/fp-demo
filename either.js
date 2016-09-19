const Left = function(x) { this._value = x }
Left.of = xs => new Left(xs)
Left.prototype.map = function(fn) {
    return this
}

const Right = function(x) { this._value = x }
Right.of = xs => new Right(xs)
Right.prototype.map = function(fn) {
    return Right.of(fn(this._value))
}

module.exports = {
    Left,
    Right
}
