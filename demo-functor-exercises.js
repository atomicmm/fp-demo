require('./support')

//ex1
const ex1 = map(add(1))

//ex2
const xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
compose(map(first), debug('ex2 is '))(xs)

//ex3
const safeProp = curry((prop, obj) => Maybe.of(obj[prop]))
const user = {
    id: 2,
    name: "Albert"
}
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

//ex6
const showWelcome = compose(property('name'), append('Welcome '))
const checkActive = user => user.active ? Right.of(user) : Left.of('Your account is not active')
const ex6 = compose(checkActive, either(identity, showWelcome), debug('ex6: '))
ex6({
    name: 'atomic',
    active: false
})
ex6({
    name: 'atomicMM',
    active: true
})

//ex7
const ex7 = x => x.length > 3 ? Right.of(x) : Left.of('You need >3 ')

//ex8
const save = x => new IO(() => {
    console.log('USER SAVED!')
    return x + ' saved'
})
const ex8 = compose(ex7, either(IO.of, save))
