const expect = require('chai').expect

describe('midi-helper.js', () => {
  describe('outOfMidiRange', () => {
    const { outOfMidiRange } = require('./midi-helper')
    it('should exist', () => {
      expect(outOfMidiRange).to.exist
    })

    it('should return false for values within the MIDI range', () => {
      expect(outOfMidiRange(60)).to.be.false
    })

    it('should return true for NaN values', () => {
      expect(outOfMidiRange(NaN)).to.be.true
    })

    it('should return true for values below the MIDI range lower limit', () => {
      expect(outOfMidiRange(-1)).to.be.true
    })

    it('should return true for values above the MIDI range upper limit', () => {
      expect(outOfMidiRange(128)).to.be.true
    })
  })

  describe('getMidiBase', () => {
    const { getMidiBase } = require('./midi-helper')
    it('should exist', () => {
      expect(getMidiBase).to.exist
    })

    it('should return the MIDI base of a given MIDI number', () => {
      const middleCMidi = 60
      const cMidiBase = 0
      expect(getMidiBase(middleCMidi)).to.equal(cMidiBase)
    })
  })
})
