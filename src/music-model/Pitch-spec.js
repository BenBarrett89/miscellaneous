const expect = require('chai').expect

describe('Pitch.js', () => {
  const Pitch = require('./Pitch')

  it('should exist', () => {
    expect(Pitch).to.exist
  })

  it('can construct a Pitch instance with a valid MIDI value (number)', () => {
    const middleC = new Pitch(60)
    expect(middleC).to.be.an.instanceOf(Pitch)
  })

  it('can construct a default Pitch instance without a MIDI value', () => {
    const middleC = new Pitch()
    expect(middleC).to.be.an.instanceOf(Pitch)
  })

  it('will not construct Pitch instances with invalid MIDI values (not type of number)', () => {
    expect(() => new Pitch('MIDDLE C')).to.throw(TypeError)
  })

  it('will not construct Pitch instances with invalid MIDI values (NaN)', () => {
    expect(() => new Pitch(NaN)).to.throw(RangeError)
  })

  it('will not construct Pitch instances with invalid MIDI values (below MIDI range - below 0)', () => {
    expect(() => new Pitch(-1)).to.throw(RangeError)
  })

  it('will not construct Pitch instances with invalid MIDI values (above MIDI range - above 127)', () => {
    expect(() => new Pitch(128)).to.throw(RangeError)
  })

  describe('Pitch.prototype.getMidi', () => {
    it('should exist', () => {
      expect(Pitch.prototype.getMidi).to.exist
    })

    it('should return the MIDI value of the Pitch instance', () => {
      const middleCMidi = 60
      const middleC = new Pitch(middleCMidi)
      expect(middleC.getMidi()).to.equal(middleCMidi)
    })
  })

  describe('Pitch.prototype.getMidiBase', () => {
    it('should exist', () => {
      expect(Pitch.prototype.getMidiBase).to.exist
    })

    it('should return the MIDI base value of the Pitch instance', () => {
      const middleCMidi = 60
      const middleC = new Pitch(middleCMidi)
      const cMidiBase = 0
      expect(middleC.getMidiBase()).to.equal(cMidiBase)
    })
  })
})
