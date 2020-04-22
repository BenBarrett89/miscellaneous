const constants = require('./constants')
const getCombinationsByApproach = require('./getCombinationsByApproach')

const permutations = getCombinationsByApproach()

const randomIndex = Math.floor(Math.random() * permutations.length)

console.log(permutations[randomIndex])
