const countriesJSON = require('./constants/countries')
const gadgetsJSON = require('./constants/gadgets')

const gadgetList = gadgetsJSON.gadgets.map(gadget =>
  Object.assign({}, gadget, {
    country: countriesJSON.countries.find(
      country => gadget.country === country.code
    )
  })
)

const melodyGadgets = gadgetList.filter(gadget =>
  gadget.uses.includes('Melody')
)
const harmonyGadgets = gadgetList.filter(gadget =>
  gadget.uses.includes('Harmony')
)
const bassGadgets = gadgetList.filter(gadget => gadget.uses.includes('Bass'))
const drumsGadgets = gadgetList.filter(gadget => gadget.uses.includes('Drums'))

const getRandomGadget = list =>
  list[Math.floor(Math.random() * Math.floor(list.length))]

const melody = getRandomGadget(melodyGadgets)
const harmony = getRandomGadget(harmonyGadgets)
const bass = getRandomGadget(bassGadgets)
const drums = getRandomGadget(drumsGadgets)

const logGadget = gadget => {
  console.log(`${gadget.country.flag}  ${gadget.name}`)
  console.log(gadget.type)
  console.log(gadget.description)
  console.log(`\n`)
}

console.log(`\n`)
console.log('\x1b[32m')
console.log('Melody:')
logGadget(melody)
console.log('\x1b[33m')
console.log('Harmony:')
logGadget(harmony)
console.log('\x1b[36m')
console.log('Bass:')
logGadget(bass)
console.log('\x1b[35m')
console.log('Drums:')
logGadget(drums)
