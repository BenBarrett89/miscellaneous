const expect = require('chai').expect
const Pitch = require('./Pitch')

describe('Interval.js', () => {
  const Interval = require('./Interval')

  it('should exist', () => {
    expect(Interval).to.exist
  })

  it('can construct an Interval instance with a valid semitone value', () => {
    const perfectOctave = new Interval(12)
    expect(perfectOctave).to.be.an.instanceOf(Interval)
  })

  it('can construct a default Interval instance without a semitone value', () => {
    const perfectUnison = new Interval()
    expect(perfectUnison).to.be.an.instanceOf(Interval)
  })

  it('will not create Intervals with invalid semitone values (not type of number)', () => {
    expect(() => new Interval('PERFECT_OCTAVE')).to.throw(TypeError)
  })

  it('will not create Intervals with invalid semitone values (NaN)', () => {
    expect(() => new Interval(NaN)).to.throw(RangeError)
  })

  it('will not create Intervals with invalid semitone values (below MIDI range - below 0)', () => {
    expect(() => new Interval(-1)).to.throw(RangeError)
  })

  it('will not create Intervals with invalid semitone values (below MIDI range - below 0)', () => {
    expect(() => new Interval(128)).to.throw(RangeError)
  })

  it('should have constants for common intervals', () => {
    expect(Interval.PERFECT_UNISON).to.be.an.instanceOf(Interval) // there are lots, I won't test them all...
  })

  describe('Interval.prototype.getDifference', () => {
    it('should exist', () => {
      expect(Interval.prototype.getDifference).to.exist
    })

    it('should return the semitone different value of the Interval instance', () => {
      const perfectOctaveSemitoneDifference = 12
      const perfectOctave = new Interval(perfectOctaveSemitoneDifference)
      expect(perfectOctave.getDifference()).to.equal(perfectOctaveSemitoneDifference)
    })
  })

  describe('Interval.prototype.add', () => {
    it('should exist', () => {
      expect(Interval.prototype.add).to.exist
    })

    it('should return a new Pitch instance with the Interval semitone value added to it', () => {
      const middleCMidi = 60
      const middleC = new Pitch(middleCMidi)
      const gAboveMiddleCMidi = 67
      const gAboveMiddleC = Interval.PERFECT_FIFTH.add(middleC)
      expect(gAboveMiddleC).to.be.an.instanceOf(Pitch)
      expect(gAboveMiddleC.getMidi()).to.equal(gAboveMiddleCMidi)
    })

    it('will not create a new Pitch instance if the pitch would be outside the MIDI range', () => {
      const g10Midi = 127
      const g10 = new Pitch(g10Midi)
      expect(() => Interval.SEMITONE.add(g10)).to.throw(RangeError)
    })
  })

  describe('Interval.prototype.subtract', () => {
    it('should exist', () => {
      expect(Interval.prototype.subtract).to.exist
    })

    it('should return a new Pitch instance with the Interval semitone value subtracted from it', () => {
      const gAboveMiddleCMidi = 67
      const gAboveMiddleC = new Pitch(gAboveMiddleCMidi)
      const middleC = Interval.PERFECT_FIFTH.subtract(gAboveMiddleC)
      const middleCMidi = 60
      expect(middleC).to.be.an.instanceOf(Pitch)
      expect(middleC.getMidi()).to.equal(middleCMidi)
    })

    it('will not create a new Pitch instance if the pitch would be outside the MIDI range', () => {
      const c0Midi = 0
      const c0 = new Pitch(c0Midi)
      expect(() => Interval.SEMITONE.subtract(c0)).to.throw(RangeError)
    })
  })

  describe('Interval.identify', () => {
    it('should exist', () => {
      expect(Interval.identify).to.exist
    })

    it('should return a new Interval instance with the semitone difference between two given pitches', () => {
      const middleCMidi = 60
      const middleC = new Pitch(middleCMidi)
      const gAboveMiddleCMidi = 67
      const gAboveMiddleC = new Pitch(gAboveMiddleCMidi)
      const interval = Interval.identify(middleC, gAboveMiddleC)
      const perfectFifth = 7
      expect(interval).to.be.an.instanceOf(Interval)
      expect(interval.getDifference()).to.equal(perfectFifth)
    })
  })
})
