const expect = require('chai').expect

describe('bjorklund.js', () => {
  const bjorklund = require('../../src/bjorklund/bjorklund')

  it('should exist', () => {
    expect(bjorklund).to.exist
  })

  describe('bjorklund.calculate', () => {
    it('should exist', () => {
      expect(bjorklund.calculate).to.exist
    })

    it('should calculate optimal even spacing for non-primes (4 in 16)', () => {
      const testOnes = 4
      const testBits = 16
      const expectedArray = ['1000', '1000', '1000', '1000']
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for non-primes (12 in 16)', () => {
      const testOnes = 12
      const testBits = 16
      const expectedArray = ['1011', '1011', '1011', '1011']
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for primes (Toussaint example)', () => {
      const testOnes = 5
      const testBits = 13
      const expectedArray = ['10010', '10010', '100']
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for mixtures (Cuban tresillo)', () => {
      const testOnes = 3
      const testBits = 8
      const expectedArray = ['100', '100', '10']
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for mixtures (Cuban cinquillo)', () => {
      const testOnes = 5
      const testBits = 8
      const expectedArray = ['101', '101', '10']
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for mixture (bigger prime number)', () => {
      const testOnes = 79
      const testBits = 128
      const expectedArray = [ '10110101101101011010110110101101101011010110110',
        '10110101101101011010110110101101101011010110110',
        '1011010110110101101011011010110110' ]
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })
  })
})
