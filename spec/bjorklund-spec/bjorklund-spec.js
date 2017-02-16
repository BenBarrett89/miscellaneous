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
      const expectedArray = [1000, 1000, 1000, 1000].join()
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for non-primes (12 in 16)', () => {
      const testOnes = 12
      const testBits = 16
      const expectedArray = [1011, 1011, 1011, 1011].join()
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for primes (Toussaint example)', () => {
      const testOnes = 5
      const testBits = 13
      const expectedArray = [10010, 10010, 100].join()
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for mixtures (Cuban tresillo)', () => {
      const testOnes = 3
      const testBits = 8
      const expectedArray = [100, 100, 10].join()
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })

    it('should calculate optimal even spacing for mixtures (Cuban cinquillo)', () => {
      const testOnes = 5
      const testBits = 8
      const expectedArray = [101, 101, 10].join()
      expect(bjorklund.calculate(testOnes, testBits)).to.deep.equal(expectedArray)
    })
  })
})
