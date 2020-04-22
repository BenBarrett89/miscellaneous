const getPermutationsByApproach = require('./getPermutationsByApproach')

const permutationsByApproach = getPermutationsByApproach()

const randomIndex = Math.floor(Math.random() * permutationsByApproach.length)

console.log(permutationsByApproach[randomIndex])
