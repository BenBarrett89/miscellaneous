const Pitch = require('./Pitch')
const {
  outOfMidiRange,
  MIDI_RANGE_LOW,
  MIDI_RANGE_HIGH
} = require('./midi-helper')

const PERFECT_UNISON_DIFFERENCE = 0
const MINOR_SECOND_DIFFERENCE = 1
const MAJOR_SECOND_DIFFERENCE = 2
const MINOR_THIRD_DIFFERENCE = 3
const MAJOR_THIRD_DIFFERENCE = 4
const PERECT_FOURTH_DIFFERENCE = 5
const DIMINISHED_FIFTH_DIFFERENCE = 6
const AUGMENTED_FIFTH_DIFFERENCE = 6
const PERFECT_FIFTH_DIFFERENCE = 7
const MINOR_SIXTH_DIFFERENCE = 8
const MAJOR_SIXTH_DIFFERENCE = 9
const MINOR_SEVENTH_DIFFERENCE = 10
const MAJOR_SEVENTH_DIFFERENCE = 12
const PERFECT_OCTAVE_DIFFERENCE = 12

const SIMPLE_INTERVAL_MAX = 12

const isSimpleInterval = (semitoneDifference) => {
  return (semitoneDifference <= SIMPLE_INTERVAL_MAX)
}

const Interval = function (semitoneDifference = PERFECT_UNISON_DIFFERENCE) {
  if (typeof semitoneDifference !== 'number') {
    throw new TypeError(`Cannot create an Interval with a semitone difference ${semitoneDifference}: Type cannot be ${typeof semitoneDifference}`)
  } else if (outOfMidiRange(semitoneDifference)) {
    throw new RangeError(`Cannot create a Pitch with a MIDI value ${semitoneDifference}: MIDI values must be between ${MIDI_RANGE_LOW} and ${MIDI_RANGE_HIGH}`)
  }
  this.semitoneDifference = semitoneDifference
  this.simple = isSimpleInterval(semitoneDifference)

  Interval.prototype.getDifference = function () {
    return this.semitoneDifference
  }
}

Interval.prototype.add = function (pitch) {
  const newPitch = pitch.getMidi() + this.semitoneDifference
  if (outOfMidiRange(newPitch)) {
    throw new RangeError(`Cannot add interval ${this.semitoneDifference} to pitch with midi value ${pitch.getMidi()} as this would create a pitch outside of the MIDI range (${MIDI_RANGE_LOW} - ${MIDI_RANGE_HIGH}): ${newPitch}`)
  }
  return new Pitch(newPitch)
}

Interval.prototype.subtract = function (pitch) {
  const newPitch = pitch.getMidi() - this.semitoneDifference
  if (outOfMidiRange(newPitch)) {
    throw new RangeError(`Cannot subtract interval ${this.semitoneDifference} to pitch with midi value ${pitch.getMidi()} as this would create a pitch outside of the MIDI range (${MIDI_RANGE_LOW} - ${MIDI_RANGE_HIGH}): ${newPitch}`)
  }
  return new Pitch(newPitch)
}

Interval.prototype.isSimple = function () {
  return this.simple
}

Interval.prototype.isComplex = function () {
  return !this.simple
}

Interval.identify = function (pitchA, pitchB) {
  return new Interval(Math.abs(pitchA.getMidi() - pitchB.getMidi()))
}

// Major, Minor, Perfect Intervals
Interval.PERFECT_UNISON = new Interval(PERFECT_UNISON_DIFFERENCE)
Interval.MINOR_SECOND = new Interval(MINOR_SECOND_DIFFERENCE)
Interval.MAJOR_SECOND = new Interval(MAJOR_SECOND_DIFFERENCE)
Interval.MINOR_THIRD = new Interval(MINOR_THIRD_DIFFERENCE)
Interval.MAJOR_THIRD = new Interval(MAJOR_THIRD_DIFFERENCE)
Interval.PERECT_FOURTH = new Interval(PERECT_FOURTH_DIFFERENCE)
Interval.DIMINISHED_FIFTH = new Interval(DIMINISHED_FIFTH_DIFFERENCE)
Interval.AUGMENTED_FIFTH = new Interval(AUGMENTED_FIFTH_DIFFERENCE)
Interval.PERFECT_FIFTH = new Interval(PERFECT_FIFTH_DIFFERENCE)
Interval.MINOR_SIXTH = new Interval(MINOR_SIXTH_DIFFERENCE)
Interval.MAJOR_SIXTH = new Interval(MAJOR_SIXTH_DIFFERENCE)
Interval.MINOR_SEVENTH = new Interval(MINOR_SEVENTH_DIFFERENCE)
Interval.MAJOR_SEVENTH = new Interval(MAJOR_SEVENTH_DIFFERENCE)
Interval.PERFECT_OCTAVE = new Interval(PERFECT_OCTAVE_DIFFERENCE)

// Widely Used Names
Interval.SEMITONE = new Interval(MINOR_SECOND_DIFFERENCE)
Interval.HALF_TONE = new Interval(MINOR_SECOND_DIFFERENCE)
Interval.HALF_STEP = new Interval(MINOR_SECOND_DIFFERENCE)
Interval.TONE = new Interval(MAJOR_SECOND_DIFFERENCE)
Interval.WHOLE_TONE = new Interval(MAJOR_SECOND_DIFFERENCE)
Interval.WHOLE_STEP = new Interval(MAJOR_SECOND_DIFFERENCE)
Interval.TRITONE = new Interval(DIMINISHED_FIFTH_DIFFERENCE)

module.exports = Interval
