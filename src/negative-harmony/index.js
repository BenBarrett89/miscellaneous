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
  {title: "1 - 5", color: "info", aIndex: 0, bIndex: 1},
  {title: "4 - 2", color: "danger", aIndex: 11, bIndex: 2},
  {title: "b7 - 6", color: "danger", aIndex: 10, bIndex: 3},
  {title: "b3 - 3", color: "info", aIndex: 9, bIndex: 4},
  {title: "b6 - 7", color: "danger", aIndex: 8, bIndex: 5},
  {title: "b2 - b5", color: "danger", aIndex: 7, bIndex: 6},
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
    return Object.assign({}, mapping, { a: aNote, b: bNote })
  })

  removeMappings()

  addMappings(mappings)
}

const removeMappings = () => {
  const row = document.getElementById('mapping-row')
  while (row.firstChild) {
    row.removeChild(row.firstChild)
  }
}

const addMappings = mappings => {
  for (let i = 0; i < mappings.length; i++) {
    addMapping(mappings[i])
  }
}

const addMapping = mapping =>  {
  const mappingColumn = createMapping(mapping)
  const row = document.getElementById('mapping-row')
  row.appendChild(mappingColumn)
}

const createMapping = mapping => {
  const column = document.createElement('div')
  column.classList.add('col-md-3')
  
  const card = document.createElement('div')
  card.classList.add('card','text-white', `border-${mapping.color}`,'mb-3')
  
  const header = document.createElement('div')
  header.classList.add('card-header')
  const headerText = document.createTextNode(mapping.title)
  header.appendChild(headerText)
  
  const body = document.createElement('div')
  body.classList.add('card-body')
  
  const text = document.createElement('p')
  text.classList.add('card-text')
  const textNode = document.createTextNode(`${mapping.a.name.default} - ${mapping.b.name.default}`)
  
  text.appendChild(textNode)
  body.appendChild(text)
  card.appendChild(header)
  card.appendChild(body)
  column.appendChild(card)

  return column
}

// default
handleSelection('0,major')