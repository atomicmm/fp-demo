require('./support')

//ex1
const ex1 = (x, y) => Maybe.of(add).ap(Maybe.of(x)).ap(Maybe.of(y))
console.log(ex1(1, 2))
console.log(ex1('a', 2))
console.log(ex1('1', null))

//ex2
const ex2 = (x, y) => liftA2(add, Maybe.of(x), Maybe.of(y))
console.log(ex2(1, 2))
console.log(ex2('a', null))

//ex4
const localStorage = { player1: 'atomic', player2: 'struggle' }
const getCache = x => IO.of(localStorage[x])
const game = curry((p1, p2) => `${p1} vs ${p2}`)

const ex4 = (p1, p2) => liftA2(game, getCache(p1), getCache(p2))
console.log(ex4('player1', 'player2').join())
