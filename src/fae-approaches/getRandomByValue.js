const getPermutationsByValue = require('./getPermutationsByValue')

const permutationsByValue = getPermutationsByValue()

const randomIndex = Math.floor(Math.random() * permutationsByValue.length)

console.log(permutationsByValue[randomIndex])
