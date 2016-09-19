require('./support')

//base
console.log(Maybe.of(null).map(match(/a/ig)))
console.log(Maybe.of({ name: 'Atomic' }).map(property('age')).map(add(10)))
console.log(
    Maybe.of({ name: 'Atomic', age: 14 })
    .map(property('age'))
    .map(add(10))
)

//pointfree
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

//demo1
const safeHead = xs => Maybe.of(xs[0])
const streetName = compose(
    property('addresses'), safeHead, map(property('street')), console.log
)

streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }) //succ
streetName({ addresses: [] }) //error

//demo2
const withdraw = curry((amount, account) => amount > account.balance ? Maybe.of(null) : Maybe.of({ balance: account.balance - amount }))

const remainingBalance = account => `Your balance is ${account.balance}`
const updateLedger = identity
const finishTransaction = compose(remainingBalance, updateLedger)
const getTwenty = compose(
    withdraw(20.00), map(finishTransaction), console.log
)
const getThirty = compose(
    withdraw(30.00), maybe('something error', finishTransaction), console.log
)

getTwenty({ balance: 200.00 })
getTwenty({ balance: 10.00 })

getThirty({ balance: 10.00 })
getThirty({ balance: 40.00 })

//demo either
console.log(Right.of('rain').map(str => 'b' + str))
console.log(Left.of('rain').map(str => 'b' + str))

const getAge = curry((now, user) => {
    const birthdate = moment(user.birthdate, 'YYYY-MM-DD')
    return birthdate.isValid() ?
        Right.of(now.diff(birthdate, 'years')) :
        Left.of('Birth date format error')
})

console.log(getAge(moment(), { birthdate: '1983-12-12' }))
console.log(getAge(moment(), { birthdate: 'abcdefg' }))

const forture = compose(add(1), append('if you survice, you will be '))
const zoltar = compose(
    getAge(moment()), map(forture), console.log
)
zoltar({ birthdate: '1983-12-12' })
zoltar({ birthdate: 'balloons!' })

const zoltar2 = compose(
    getAge(moment()), either(identity, forture), console.log
)
zoltar2({ birthdate: '1983-12-12' })
zoltar2({ birthdate: 'balloons!' })

//demo of io functor
//
const ioProcess = IO.of(process)
console.log(ioProcess.map(property('title'))._value())
