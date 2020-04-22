const fs = require('fs')
const path = require('path')

const constants = require('./constants')

const getCombinationsByApproach = require('./getCombinationsByApproach')
const getPermutationsByApproach = require('./getPermutationsByApproach')
const getPermutationsByValue = require('./getPermutationsByValue')

const combinationsByApproach = getCombinationsByApproach().join('\n')

fs.writeFileSync(
  path.join(
    __dirname,
    `${constants.file.name.combinations}${constants.file.extension}`
  ),
  combinationsByApproach,
  {
    encoding: 'utf-8'
  }
)

const permutationsByApproach = getPermutationsByApproach().join('\n')

fs.writeFileSync(
  path.join(
    __dirname,
    `${constants.file.name.approaches}${constants.file.extension}`
  ),
  permutationsByApproach,
  {
    encoding: 'utf-8'
  }
)

const permutationsByValue = getPermutationsByValue().join('\n')

fs.writeFileSync(
  path.join(
    __dirname,
    `${constants.file.name.values}${constants.file.extension}`
  ),
  permutationsByValue,
  {
    encoding: 'utf-8'
  }
)
