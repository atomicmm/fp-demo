require('./support')

const map = curry((fn, functor) => functor.map(fn))
const maybe = curry((x, fn, m) => m.isNothing() ? x : fn(m._value))
const either = curry((lfn, rfn, functor) => {
    switch (functor.constructor) {
        case Left:
            return lfn(functor._value)
        case Right:
            return rfn(functor._value)
    }
})

//ex1
const ex1 = map(add(1))

//ex2
const xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
compose(map(first), debug('ex2 is '))(xs)

//ex3
const safeProp = curry((prop, obj) => Maybe.of(obj[prop]))
const user = { id: 2, name: "Albert" }
const firstLetter = compose(
    safeProp('name'), map(split('')), map(first), map(append('the first letter is: ')), maybe('name format error! ', debug('ex3 is '))
)
firstLetter(user)

//ex4
const ex4 = compose(
    Maybe.of, map(parseInt), maybe('not a number!', debug('ex4 value is: '))
)
ex4(123)
console.log(ex4(null))
console.log(ex4(undefined))
