const MIDI_RANGE_LOW = 0
const MIDI_RANGE_HIGH = 127
const MIDI_BASE_MODULO = 12

const getMidiBase = (midi) => {
  return midi % MIDI_BASE_MODULO
}

const outOfMidiRange = (midi) => {
  return isNaN(midi) ||
    midi < MIDI_RANGE_LOW ||
    midi > MIDI_RANGE_HIGH
}

module.exports = {
  MIDI_RANGE_HIGH,
  MIDI_RANGE_LOW,
  getMidiBase,
  outOfMidiRange
}
