require('./support')

//ex1
const USER = { id: 2, name: "albert", address: { street: { number: 22, name: 'Walnut St' } } }
const safeStreetName = compose(
    safeProp('address'), chain(safeProp('street')), chain(safeProp('name')), debug('ex1 => ')
)
safeStreetName(USER)

//ex2
const getFile = () => new IO(() => __filename)
const pureLog = x => new IO(() => {
    debug('result is => ')(x)
    return 'logged ' + x
})

const printFilename = compose(getFile, chain(compose(split('/'), last, pureLog)))
printFilename().unsafePerformIO()

//ex4

//  addToMailingList :: Email -> IO([Email])
const addToMailingList = (list => email => new IO(() => {
    list.push(email)
    return list
}))([])
const emailBlast = list => IO.of('emailed: ' + list.join(','))
const validateEmail = x => x.match(/\S+@\S+\.\S+/) ? (Right.of(x)) : (Left.of('invalid email'));
const mail = compose(validateEmail, chain(compose(addToMailingList, emailBlast)), join, debug('ex4 => '))
mail('abc@123.com')
mail('1234567890')
