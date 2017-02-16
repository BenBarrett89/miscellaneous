// Uncomment the console.log statements to see outputs during the tests

const ONE = '1'
const ZERO = '0'

const createInitialArray = (ones, bits) => {
  let array = []
  for (var i = 0; i < ones; i++) array.push(ONE)
  for (var j = 0; j < (bits - ones); j++) array.push(ZERO)
  return array
}

const calculateNumberOfRemainders = (array, remainder) => {
  return array.reduce((total, next) => {
    if (next === remainder) {
      total = total + 1
    }
    return total
  }, 0)
}

const isEndOfAlgorithm = (numberOfRemainders, numberOfSequences) => {
  return (
    numberOfSequences === 0 ||
    numberOfRemainders <= 1
  )
}

const recursivelyCalculate = (array) => {
  const remainder = array[array.length - 1]
  const numberOfRemainders = calculateNumberOfRemainders(array, remainder)
  const numberOfSequences = array.length - numberOfRemainders
  const difference = numberOfRemainders - numberOfSequences
  // console.log(`Remainders: ${numberOfRemainders}, Sequences: ${numberOfSequences}, Diff: ${difference}`)
  if (isEndOfAlgorithm(numberOfRemainders, numberOfSequences)) {
    return array
  } else {
    let newArray = []
    if (difference > 0) {
      newArray = array.slice(0, numberOfSequences)
        .map(sequence => sequence.concat(remainder))
      for (var i = 0; i < difference; i++) newArray.push(remainder)
    } else {
      newArray = array.slice(0, numberOfRemainders)
        .map(sequence => sequence.concat(remainder))
        .concat(array.slice(numberOfRemainders, array.length - numberOfRemainders))
    }
    // console.log(`Array: ${newArray}`)
    return recursivelyCalculate(newArray)
  }
}

const calculate = (ones, bits) => {
  const array = createInitialArray(ones, bits)
  // console.log(`Array: ${array}`)
  const result = recursivelyCalculate(array)
  // console.log('\n')
  return result
}

const split = (bjorklund) => {
  return bjorklund.reduce((array, sequence) => {
    return array.concat(sequence.split(''))
  }, [])
}

module.exports = {
  calculate,
  split
}
