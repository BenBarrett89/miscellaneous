// data
const notes = [
  { index: 0, name: { default: 'C', natural: 'C'} },
  { index: 1, name: { default: 'C#', sharp: 'C#', flat: 'Db'} },
  { index: 2, name: { default: 'D', natural: 'D'} },
  { index: 3, name: { default: 'D#', sharp: 'D#', flat: 'Eb'} },
  { index: 4, name: { default: 'E', natural: 'E'} },
  { index: 5, name: { default: 'F', natural: 'F'} },
  { index: 6, name: { default: 'F#', sharp: 'F#', flat: 'Gb'} },
  { index: 7, name: { default: 'G', natural: 'G'} },
  { index: 8, name: { default: 'G#', sharp: 'G#', flat: 'Ab'} },
  { index: 9, name: { default: 'A', natural: 'A'} },
  { index: 10, name: { default: 'A#', sharp: 'A#', flat: 'Bb'} },
  { index: 11, name: { default: 'B', natural: 'B', flat: 'Cb'} },
]
const circleOfFifths = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]
const keys = [
  { major: 0, minor: 9, offset: 0 },
  { major: 7, minor: 4, offset: 1 },
  { major: 2, minor: 11, offset: 2 },
  { major: 9, minor: 6, offset: 3 },
  { major: 4, minor: 1, offset: 4 },
  { major: 11, minor: 8, offset: 5 },
  { major: 6, minor: 3, offset: 6 },
  { major: 1, minor: 10, offset: 7 },
  { major: 8, minor: 5, offset: 8 },
  { major: 3, minor: 0, offset: 9 },
  { major: 10, minor: 7, offset: 10 },
  { major: 5, minor: 2, offset: 11 }
]
const negativeHarmonyMappings = [
  {aIndex: 0, bIndex: 1},
  {aIndex: 11, bIndex: 2},
  {aIndex: 10, bIndex: 3},
  {aIndex: 9, bIndex: 4},
  {aIndex: 8, bIndex: 5},
  {aIndex: 7, bIndex: 6},
]

// handler: handle selection
const handleSelection = (value) => {
  const input = value.split(',')
  const root = parseInt(input[0])
  const tonality = input[1]

  const key = keys.find(key => key[tonality] === root)
  const offset = key.offset

  const doubleCircle = new Array(...circleOfFifths, ...circleOfFifths)
  const circle = doubleCircle.slice(offset, offset + circleOfFifths.length)

  const mappings = negativeHarmonyMappings.map(mapping => {
    const aNote = notes[circle[mapping.aIndex]]
    const bNote = notes[circle[mapping.bIndex]]
    return { a: aNote, b: bNote }
  })
}

// default
handleSelection('0,major')