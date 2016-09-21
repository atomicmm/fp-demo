require('./support')

const firstAddressStreet = compose(safeProp('addresses'), map(safeHead), map(map(safeProp('street'))), debug('firstAddressStreet=> '))
const firstAddressStreet2 = compose(safeProp('addresses'), map(safeHead), join, map(safeProp('street')), join, debug('firstAddressStreet=> '))
const firstAddressStreet3 = compose(safeProp('addresses'), chain(safeHead), chain(safeProp('street')), debug('firstAddressStreet=> '))

const ADDRESSES = { addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }] }

firstAddressStreet(ADDRESSES)
firstAddressStreet2(ADDRESSES)
firstAddressStreet3(ADDRESSES)
