const expect = require('chai').expect

describe('multi-bjorklund.js', () => {
  const multiBjorklund = require('../../src/multi-bjorklund/multi-bjorklund')

  it('should exist', () => {
    expect(multiBjorklund).to.exist
  })

  describe('multi-bjorklund.calculate', () => {
    it('should exist', () => {
      expect(multiBjorklund.calculate).to.exist
    })

    it('should calculate the intensities of the layers of the Bjorklund rhythms (Cuban tresillo over Cuban cinquillo)', () => {
      const testOnes = [3, 5]
      const testBits = 8
      const expectedArray = ['2', '0', '1', '2', '0', '1', '2', '0']
      expect(multiBjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate the intensities of the layers of the Bjorklund rhythms (three over two)', () => {
      const testOnes = [2, 3]
      const testBits = 8
      const expectedArray = [ '2', '0', '0', '1', '1', '0', '1', '0' ]
      expect(multiBjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })
  })

  describe('multi-bjorklund.combineIntensities', () => {
    it('should exist', () => {
      expect(multiBjorklund.combineIntensities).to.exist
    })

    it('should combine two existing intensity maps (Cuban tresillo over Cuban cinquillo + three over two)', () => {
      const testArrays = [
        ['2', '0', '1', '2', '0', '1', '2', '0'],
        ['2', '0', '0', '1', '1', '0', '1', '0']
      ]
      const expectedArray = ['4', '0', '1', '3', '1', '1', '3', '0']
      expect(multiBjorklund.combineIntensities(testArrays)).to.deep.equal(expectedArray)
    })
  })
})
