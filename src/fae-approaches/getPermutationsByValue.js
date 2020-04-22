const constants = require('./constants')
const permute = require('./permute')

module.exports = () =>
  permute(constants.approaches).map(permutation =>
    permutation
      .map((approach, index) => `${approach} +${constants.values[index]}`)
      .join(' ')
  )
