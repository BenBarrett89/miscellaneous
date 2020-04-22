const constants = require('./constants')
const permute = require('./permute')

module.exports = () =>
  permute(constants.values).map(permutation =>
    permutation
      .map((value, index) => `${constants.approaches[index]} +${value}`)
      .join(' ')
  )
