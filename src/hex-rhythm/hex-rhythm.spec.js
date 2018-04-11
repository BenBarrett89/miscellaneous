const expect = require('chai').expect

describe('hex-rhythm.js', () => {
  const hexRhythm = require('./hex-rhythm')

  it('should exist', () => {
    expect(hexRhythm).to.exist
  })

  const rhythms = require('./rhythms.json')
  const hexRhythmGenerator = hexRhythm(rhythms.rhythms)

  it(`should generate a random hex rhythm of the given number of beats (1)`, () => {
    const expectedLength = 4
    const result = hexRhythmGenerator(expectedLength)
    expect(result.number.length).to.equal(expectedLength)
    expect(result.rhythm.length).to.equal(expectedLength * 4) // rhythms are in 16th notes
  })

  it(`should generate a random hex rhythm of the given number of beats (2)`, () => {
    const expectedLength = 8
    const result = hexRhythmGenerator(expectedLength)
    expect(result.number.length).to.equal(expectedLength)
    expect(result.rhythm.length).to.equal(expectedLength * 4) // rhythms are in 16th notes
  })

  it(`should generate a random hex rhythm of the given number of beats (2)`, () => {
    const expectedLength = 16
    const result = hexRhythmGenerator(expectedLength)
    expect(result.number.length).to.equal(expectedLength)
    expect(result.rhythm.length).to.equal(expectedLength * 4) // rhythms are in 16th notes
  })
})
