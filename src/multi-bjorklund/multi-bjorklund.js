const bjorklund = require('../bjorklund/bjorklund')

const getBitsInPattern = pattern => {
  return pattern.length
}

const combineIntensities = patterns => {
  const bits = getBitsInPattern(patterns[0])
  let intensities = []
  for (i = 0; i < bits; i++) {
    let intensity = 0
    patterns.forEach(pattern => {
      intensity += parseInt(pattern[i])
    })
    intensities.push(intensity.toString())
  }
  return intensities
}

const calculate = (onesArray, bits) => {
  const patterns = onesArray.map(ones =>
    bjorklund.split(bjorklund.calculate(ones, bits))
  )
  return combineIntensities(patterns)
}

module.exports = {
  calculate,
  combineIntensities
}

const beats = 4
const bits = 32
const array = new Array(beats)
  .fill(0)
  .map(() => Math.floor(Math.random() * bits))
console.log(array)
console.log(calculate(array, bits).join())
array.forEach(item => console.log(calculate([item], bits).join()))
