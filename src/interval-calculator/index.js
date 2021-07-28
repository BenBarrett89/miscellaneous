const btnClassesSelected = 'btn btn-info btn-lg'
const btnClassesNotSelected = 'btn btn-dark btn-lg'

const notes = [
  { index: 0, name: 'C' },
  { index: 1, name: 'C#/Db' },
  { index: 2, name: 'D' },
  { index: 3, name: 'D#/Eb' },
  { index: 4, name: 'E' },
  { index: 5, name: 'F' },
  { index: 6, name: 'F#/Gb' },
  { index: 7, name: 'G' },
  { index: 8, name: 'G#/Ab' },
  { index: 9, name: 'A' },
  { index: 10, name: 'A#/Bb' },
  { index: 11, name: 'B' }
]

const intervals = [
  { semitones: 0, name: 'Perfect Unison', short: 'P1' },
  { semitones: 1, name: 'Minor Second', short: 'm2' },
  { semitones: 2, name: 'Major Second', short: 'M2' },
  { semitones: 3, name: 'Minor Third', short: 'm3' },
  { semitones: 4, name: 'Major Third', short: 'M3' },
  { semitones: 5, name: 'Perfect Fourth', short: 'P4' },
  { semitones: 6, name: 'Tritone', short: 'TT' },
  { semitones: 7, name: 'Perfect Fifth', short: 'P5' },
  { semitones: 8, name: 'Minor Sixth', short: 'm6' },
  { semitones: 9, name: 'Major Sixth', short: 'M6' },
  { semitones: 10, name: 'Minor Seventh', short: 'm7' },
  { semitones: 11, name: 'Major Seventh', short: 'M7' },
  { semitones: 12, name: 'Perfect Octave', short: 'P8' }
]

let current = {
  notes: [0, 7],
  intervals: [7, 5]
}

const handleChange = (position, note) => {
  updateNotes(position, note)
  highlightNotes()
  updateIntervals()
  displayIntervals()
}

const updateNotes = (position, note) => {
  current.notes[position] = note
}

const highlightNotes = () => {
  // reset all notes
  const buttons = document.getElementsByClassName('btn')
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].className = btnClassesNotSelected
  }

  // highlight the current.notes notes
  current.notes.forEach((note, index) => {
    const button = document.getElementById(`${index}-${note}`)
    button.className = btnClassesSelected
  })
}

const updateIntervals = () => {
  const semitoneDifference = current.notes[1] - current.notes[0]
  const semitonesFirstToSecond = semitoneDifference < 0 ? 12 + semitoneDifference : semitoneDifference
  const semitonesSecondToFirst = 12 - semitonesFirstToSecond
  current.intervals = [semitonesFirstToSecond, semitonesSecondToFirst]
}

const displayIntervals = () => {
  current.intervals.forEach((intervalIndex, index) => {
    const interval = intervals[intervalIndex]

    const fromNote = notes[current.notes[index == 0 ? 0 : 1]].name
    const toNote = notes[current.notes[index == 0 ? 1 : 0]].name

    const title = document.getElementById(`interval-${index}-title`)
    title.innerHTML = `${fromNote} to ${toNote}`

    const text = document.getElementById(`interval-${index}-text`)
    text.innerHTML = `${interval.name} - ${interval.short} - ${interval.semitones} ${interval.semitones == 1 ? 'semitone' : 'semitones'}`
  })
}

highlightNotes()
displayIntervals()