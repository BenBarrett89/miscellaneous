module.exports = {
  intervals: {
    relative: [2, 2, 1, 2, 2, 2],
    absolute: [2, 4, 5, 7, 9, 11]
  },
  intervallicDistances: [
    { distance: 0, name: { full: 'Perfect unison', short: 'P1' }, quality: 'perfect' },
    { distance: 1, name: { full: 'Minor second', short: 'm2' }, quality: 'minor' },
    { distance: 2, name: { full: 'Major second', short: 'M2' }, quality: 'major' },
    { distance: 3, name: { full: 'Minor third', short: 'm3' }, quality: 'minor' },
    { distance: 4, name: { full: 'Major third', short: 'M3' }, quality: 'major' },
    { distance: 5, name: { full: 'Perfect fourth', short: 'P4' }, quality: 'perfect' },
    { distance: 6, name: { full: 'Tritone', short: 'TT' }, quality: 'augmented/diminished' },
    { distance: 7, name: { full: 'Perfect fifth', short: 'P5' }, quality: 'perfect' },
    { distance: 8, name: { full: 'Minor sixth', short: 'm6' }, quality: 'minor' },
    { distance: 9, name: { full: 'Major sixth', short: 'M6' }, quality: 'major' },
    { distance: 10, name: { full: 'Minor seventh', short: 'm7' }, quality: 'minor' },
    { distance: 11, name: { full: 'Major seventh', short: 'M7' }, quality: 'major' },
    { distance: 12, name: { full: 'Perfect octave', short: 'M8' }, quality: 'perfect' }
  ],
  modes: [
    { name: 'Ionian', tonality: 'major' },
    { name: 'Dorian', tonality: 'minor' },
    { name: 'Phrygian', tonality: 'minor' },
    { name: 'Lydian', tonality: 'major' },
    { name: 'Mixolydian', tonality: 'major' },
    { name: 'Aeolian', tonality: 'minor' },
    { name: 'Locrian', tonality: 'minor' }
  ],
  notes: [
    { index: 0, name: { sharp: "C", flat: "C" } },
    { index: 1, name: { sharp: "C♯", flat: "D♭" } },
    { index: 2, name: { sharp: "D", flat: "D" } },
    { index: 3, name: { sharp: "D♯", flat: "E♭" } },
    { index: 4, name: { sharp: "E", flat: "E" } },
    { index: 5, name: { sharp: "F", flat: "F" } },
    { index: 6, name: { sharp: "F♯", flat: "G♭" } },
    { index: 7, name: { sharp: "G", flat: "G" } },
    { index: 8, name: { sharp: "G♯", flat: "A♭" } },
    { index: 9, name: { sharp: "A", flat: "A" } },
    { index: 10, name: { sharp: "A♯", flat: "B♭" } },
    { index: 11, name: { sharp: "B", flat: "B" } },
  ],
  keys: [
    {
      pitches: {
        natural: true
      },
      notes: {
        major: 0,
        minor: 9
      }
    },
    {
      pitches: {
        sharps: 1,
      },
      notes: {
        major: 7,
        minor: 4
      }
    },
    {
      pitches: {
        sharps: 2,
      },
      notes: {
        major: 2,
        minor: 11
      }
    },
    {
      pitches: {
        sharps: 3,
      },
      notes: {
        major: 9,
        minor: 6
      }
    },
    {
      pitches: {
        sharps: 4,
      },
      notes: {
        major: 4,
        minor: 1
      }
    },
    {
      pitches: {
        sharps: 5,
      },
      notes: {
        major: 11,
        minor: 7
      }
    },
    {
      pitches: {
        flats: 1,
      },
      notes: {
        major: 5,
        minor: 2
      }
    },
    {
      pitches: {
        flats: 2,
      },
      notes: {
        major: 10,
        minor: 7
      }
    },
    {
      pitches: {
        flats: 3,
      },
      notes: {
        major: 3,
        minor: 0
      }
    },
    {
      pitches: {
        flats: 4,
      },
      notes: {
        major: 8,
        minor: 5
      }
    },
    {
      pitches: {
        flats: 5,
      },
      notes: {
        major: 1,
        minor: 10
      }
    },
    {
      pitches: {
        flats: 6,
      },
      notes: {
        major: 6,
        minor: 3
      }
    }
  ]
}