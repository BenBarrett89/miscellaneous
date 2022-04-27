const getRandom = array => array[Math.floor(Math.random() * array.length)]

const getRandomBetween = (min, max) => Math.round(Math.random() * (max - min)) + min

const modNote = note => note % 12

const getChordNoteNumbers = (root, intervals) => intervals.map((interval) => modNote(root + interval))

const notes = [
  'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'
]
const major = 'major'
const minor = 'minor'
const majorIntervals = [0, 4, 7]
const minorIntervals = [0, 3, 7]
const chordTypes = {
  [major]: {
    intervals: majorIntervals
  },
  [minor]: {
    intervals: minorIntervals
  }
}

const keys = [
  { name: { major: 'G Major', minor: 'E Minor' }, note: { major: 7, minor: 4 } },
  { name: { major: 'C Major', minor: 'A Minor' }, note: { major: 0, minor: 9 } },
  { name: { major: 'A Major', minor: 'D Minor' }, note: { major: 9, minor: 2 } }
]
const progressions = [
  {
    index: 0,
    spelling: {
      major: ['vi', 'IV', 'I', 'V'],
      minor: ['i', 'VI', 'III', 'VII']
    },
    chords: [
      { offset: 9, type: minor }, // vi
      { offset: 5, type: major }, // IV
      { offset: 0, type: major }, // I
      { offset: 7, type: major } // V
    ]
  },
  {
    index: 1,
    spelling: {
      major: ['IV', 'vi', 'I', 'V'],
      minor: ['VI', 'i', 'III', 'VII']
    },
    chords: [
      { offset: 5, type: major }, // IV
      { offset: 9, type: minor }, // vi
      { offset: 0, type: major }, // I
      { offset: 7, type: major } // V
    ]
  },
  {
    index: 2,
    spelling: {
      major: ['vi', 'I', 'V', 'IV'],
      minor: ['i', 'III', 'VII', 'VI']
    },
    chords: [
      { offset: 9, type: minor }, // vi
      { offset: 0, type: major }, // I
      { offset: 7, type: major }, // V
      { offset: 5, type: major } // IV
    ]
  },
  {
    index: 3,
    spelling: {
      major: ['IV', 'V', 'vi'],
      minor: ['VII', 'VI', 'i']
    },
    chords: [
      { offset: 5, type: major }, // IV
      { offset: 7, type: major }, // V
      { offset: 9, type: minor } // vi
    ]
  },
  {
    index: 4,
    spelling: {
      major: ['vi', 'IV'],
      minor: ['i', 'VI']
    },
    chords: [
      { offset: 9, type: minor }, // vi
      { offset: 5, type: major }, // IV
    ]
  },
  {
    index: 5,
    spelling: {
      major: ['vi', 'I', 'V', 'II'],
      minor: ['i', 'III', 'VII', 'IV']
    },
    chords: [
      { offset: 9, type: minor }, // vi
      { offset: 0, type: major }, // I
      { offset: 7, type: major }, // V
      { offset: 2, type: major } // II
    ]
  },
  {
    index: 6,
    spelling: {
      major: ['vi', 'iii', 'IV'],
      minor: ['i', 'v', 'VI']
    },
    chords: [
      { offset: 9, type: minor }, // vi
      { offset: 4, type: minor }, // iii
      { offset: 5, type: major } // IV
    ]
  },
  {
    index: 7,
    numerals: {
      major: ['I', 'V', 'ii', 'vi'],
      minor: ['III', 'VII', 'iv', 'i']
    },
    chords: [
      { offset: 0, type: major }, // I
      { offset: 7, type: major }, // V
      { offset: 2, type: minor }, // ii
      { offset: 9, type: minor } // vi
    ]
  }
]

const key = getRandom(keys)
const progression = getRandom(progressions)
const tempo = getRandomBetween(76, 199)

console.log(key, progression, tempo)

console.log(modNote(13))
