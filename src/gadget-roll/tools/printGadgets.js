const countriesJSON = require('../constants/countries')
const gadgetsJSON = require('../constants/gadgets')

gadgetsJSON.gadgets
  .map(gadget =>
    Object.assign({}, gadget, {
      country: countriesJSON.countries.find(
        country => gadget.country === country.code
      )
    })
  )
  .sort((a, b) => (a.name > b.name ? 1 : -1))
  .forEach(gadget => {
    console.log(`- ${gadget.country.flag} ${gadget.name} (${gadget.type})`)
  })
