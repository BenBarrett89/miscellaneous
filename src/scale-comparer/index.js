// Bootstrap enagle tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// constants
const keyDegreeClassNames = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh'
]

const whiteKeyStyle = "fill:rgb(255,255,255);stroke:rgb(0,0,0);stroke-width:1"
const blackKeyStyle = "fill:rgb(20,20,20);stroke:rgb(0,0,0);stroke-width:1"
const scale1KeyStyle = "fill:rgb(238, 102, 119);stroke:rgb(0,0,0);stroke-width:1"
const scale2KeyStyle = "fill:rgb(102, 204, 238);stroke:rgb(0,0,0);stroke-width:1"
const commonKeyStyle = "fill:rgb(170, 51, 119);stroke:rgb(0,0,0);stroke-width:1"

const pianoStyles = [
  { index: 0, style: whiteKeyStyle },
  { index: 1, style: blackKeyStyle },
  { index: 2, style: whiteKeyStyle },
  { index: 3, style: blackKeyStyle },
  { index: 4, style: whiteKeyStyle },
  { index: 5, style: whiteKeyStyle },
  { index: 6, style: blackKeyStyle },
  { index: 7, style: whiteKeyStyle },
  { index: 8, style: blackKeyStyle },
  { index: 9, style: whiteKeyStyle },
  { index: 10, style: blackKeyStyle },
  { index: 11, style: whiteKeyStyle },
]

// globals
let data, keys, modes

// functions
const axiosCall = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const getData = async () => {
  data = await axiosCall("https://raw.githubusercontent.com/BenBarrett89/miscellaneous/master/src/scales-and-modes/data/data.json")
  modes = await axiosCall("https://raw.githubusercontent.com/BenBarrett89/miscellaneous/master/src/scales-and-modes/data/modes.json")
}

const setUpApp = () => {
  populateNoteOptions()
  populateScaleOptions()
}

const handleSelectionUpdate = () => {
  const scale1Root = document.getElementById('scale-1-root-select')
  const scale2Root = document.getElementById('scale-2-root-select')
  const scale1Scale = document.getElementById('scale-1-scale-select')
  const scale2Scale = document.getElementById('scale-2-scale-select')
  
  update(scale1Root.value, scale1Scale.value, scale2Root.value, scale2Scale.value)
}

const getScale = (id) => modes.find(mode => mode.id === id)

const updateScaleKey = (prefix, key) => {
  const keyParagraph = document.getElementById(`${prefix}-key`)
  keyParagraph.innerHTML = `${key.major.name} / ${key.minor.name}`
  const keyPitches = document.getElementById(`${prefix}-key-pitches`)
  const keyPitchesText = key.pitches.natural
    ? 'Natural'
    : key.pitches.sharps
      ? key.pitches.sharps > 1 ? `${key.pitches.sharps} sharps` : `${key.pitches.sharps} sharp`
      : key.pitches.flats > 1 ? `${key.pitches.flats} flats` : `${key.pitches.flats} flat`
  keyPitches.innerHTML = keyPitchesText
}

const removeScaleNotes = prefix => {
  const scaleRow = document.getElementById(`${prefix}-notes`)
  while (scaleRow.firstChild) {
    scaleRow.removeChild(scaleRow.firstChild)
  }
}

const createNote = (label, keyDegree, interval) => {
  const div = document.createElement('div')
  div.classList.add('col', keyDegree, 'm-1')
  
  const p = document.createElement('p')
  p.classList.add('lead')
  const pText = document.createTextNode(label)
  p.appendChild(pText)
  
  const small = document.createElement('small')
  small.setAttribute('data-bs-toggle', 'tooltip')
  small.setAttribute('data-bs-placement', 'bottom')
  small.title = interval.full
  const smallText = document.createTextNode(interval.short)
  small.appendChild(smallText)
  
  div.appendChild(p)
  div.appendChild(small)
  
  return div
}

const updateScaleNotes = (prefix, notes, keyNotes) => {
  removeScaleNotes(prefix)
  
  const scaleRow = document.getElementById(`${prefix}-notes`)
  
  notes.forEach(note => {
    const keyDegree = keyDegreeClassNames[keyNotes.findIndex(keyNote => keyNote.name === note.name)]
    const noteElement = createNote(note.name, keyDegree, note.interval.name)
    scaleRow.appendChild(noteElement)
  })
}

const updateScale = (prefix, scale) => {
  updateScaleKey(prefix, scale.key)
  updateScaleNotes(prefix, scale.notes, scale.key.notes)
}

const getCommonNotes = (scale1, scale2) => {
  return scale1.notes.filter(scale1Note => {
    return scale2.notes.find(scale2Note => scale2Note.index === scale1Note.index)
  }).map(note => {
    const scale2Note = scale2.notes.find(scale2Note => scale2Note.index === note.index)
    return note.name === scale2Note.name
      ? note
      : Object.assign({}, note, {
        name: `${note.name} / ${scale2Note.name}`
      })
  })
}

const removeCommonNotes = () => {
  const row = document.getElementById('common-notes-row')
  while (row.firstChild) {
    row.removeChild(row.firstChild)
  }
}

const createCommonNote = label => {
  const div = document.createElement('div')
  div.classList.add('col', 'common-note', 'm-1')
  
  const p = document.createElement('p')
  p.classList.add('lead')
  const pText = document.createTextNode(label)
  p.appendChild(pText)
  
  div.appendChild(p)
  
  return div
}

const updateCommonNotes = notes => {
  removeCommonNotes()
  
  const row = document.getElementById('common-notes-row')
  
  notes.forEach(note => {
    const noteElement = createCommonNote(note.name)
    row.appendChild(noteElement)
  })
}

const update = (scale1Root, scale1Scale, scale2Root, scale2Scale) => {
  const scale1Id = `${scale1Root}-${scale1Scale}`
  const scale2Id = `${scale2Root}-${scale2Scale}`
  
  const scale1 = getScale(scale1Id)
  const scale2 = getScale(scale2Id)
  
  updateScale('scale-1', scale1)
  updateScale('scale-2', scale2)
  
  const commonNotes = getCommonNotes(scale1, scale2)
  
  updateCommonNotes(commonNotes)

  updatePiano(scale1, scale2, commonNotes)
}

const updatePiano = (scale1, scale2, commonNotes) => {
  const scale1Indices = scale1.notes.map(note => note.index)
  const scale2Indices = scale2.notes.map(note => note.index)
  const commonIndices = commonNotes.map(note => note.index)

  const showScale1 = document.getElementById('piano-scale-1').checked
  const showScale2 = document.getElementById('piano-scale-2').checked
  const showCommon = showScale1 && showScale2

  const keyStyling = pianoStyles
    .map(key => {
    const index = key.index

    const isInScale1 = scale1Indices.includes(index)
    const isInScale2 = scale2Indices.includes(index)
    const isInCommon = commonIndices.includes(index)

    let style = key.style
    
    if (showCommon) {
      style = isInCommon
      ? commonKeyStyle
      : isInScale1
        ? scale1KeyStyle
        : isInScale2
          ? scale2KeyStyle
          : key.style
    } else if (showScale1) {
      style = isInScale1 ? scale1KeyStyle : key.style
    } else if (showScale2) {
      style = isInScale2 ? scale2KeyStyle : key.style
    }

    return { index, style }
  }).forEach(key => {
    const keyGroup = document.getElementById(`piano-${key.index}`)
    keyGroup.setAttribute('style', key.style)
  })

  
}

const addOptionToSelect = (text, value, select) => {
  const label = document.createTextNode(text)
  const option = document.createElement("option")
  option.value = value
  option.appendChild(label)
  select.appendChild(option)
}

const populateNoteOptions = () => {
  const notes = data.notes
  const scale1RootNoteOptions = document.getElementById('scale-1-root-select')
  const scale2RootNoteOptions = document.getElementById('scale-2-root-select')
  notes.forEach(note => {
    const noteNameLabel = note.name.sharp === note.name.flat ? note.name.sharp : `${note.name.sharp} / ${note.name.flat}`
    addOptionToSelect(noteNameLabel, note.index, scale1RootNoteOptions)
    addOptionToSelect(noteNameLabel, note.index, scale2RootNoteOptions)
  })
  scale1RootNoteOptions.addEventListener("change", handleSelectionUpdate)
  scale2RootNoteOptions.addEventListener("change", handleSelectionUpdate)
}

const populateScaleOptions = () => {
  const modes = data.modes
  const scale1ScaleOptions = document.getElementById('scale-1-scale-select')
  const scale2ScaleOptions = document.getElementById('scale-2-scale-select')
  modes.forEach((mode, index) => {
    addOptionToSelect(mode.name, index, scale1ScaleOptions)
    addOptionToSelect(mode.name, index, scale2ScaleOptions)
  })
  scale1ScaleOptions.addEventListener("change", handleSelectionUpdate)
  scale2ScaleOptions.addEventListener("change", handleSelectionUpdate)
}

const randomiseSelect = (id) => {
  const select = document.getElementById(id)
  const newIndex = Math.floor(Math.random() * select.options.length)
  select.options[newIndex].selected = true
}

const randomiseScale = (scale) => {
  randomiseSelect(`scale-${scale}-root-select`)
  randomiseSelect(`scale-${scale}-scale-select`)
  handleSelectionUpdate()
}

const startApp = async () => {
  await getData()
  setUpApp()
  handleSelectionUpdate()
}

startApp()