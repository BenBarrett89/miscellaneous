const MIDDLE_C_MIDI = 60
const {
  MIDI_RANGE_LOW,
  MIDI_RANGE_HIGH,
  getMidiBase,
  outOfMidiRange
} = require('./midi-helper')

const Pitch = function (midi = MIDDLE_C_MIDI) {
  if (typeof midi !== 'number') {
    throw new TypeError(`Cannot create a Pitch with a MIDI value ${midi}: Type cannot be ${typeof midi}`)
  } else if (outOfMidiRange(midi)) {
    throw new RangeError(`Cannot create a Pitch with a MIDI value ${midi}: MIDI values must be between ${MIDI_RANGE_LOW} and ${MIDI_RANGE_HIGH}`)
  }
  this.midi = midi
  this.midiBase = getMidiBase(midi)
}

Pitch.prototype.getMidi = function () {
  return this.midi
}

Pitch.prototype.getMidiBase = function () {
  return this.midiBase
}

module.exports = Pitch
