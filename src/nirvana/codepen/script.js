const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const scaleDegrees = [
  'I',
  'bII',
  'ii',
  'bIII',
  'iii',
  'IV',
  'bV',
  'V',
  'bVI',
  'vi',
  'bVII',
  'vii'
]
const scaleIntervals = [0, 2, 2, 1, 2, 2, 2]
const parallelMinorIntervals = [2, 1, 2, 2, 1, 2]
const functionText = [
  'X(M)±b3(M)',
  'X(M)±4(M)+b3(M)±Y(r,M)',
  'X±b3/3±Y(M)+b3(M)',
  'X±?±Y±?'
]

let chords = []

function getRandomItem (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function randomPlusMinusModifier () {
  return Math.random() >= 0.5 ? 1 : -1
}

function random0or1 () {
  return Math.random() >= 0.5 ? 1 : 0
}

function getKey () {
  const keySelect = document.querySelector('#key')
  return parseInt(keySelect.options[keySelect.selectedIndex].value)
}

function getFirstChordRoot () {
  return Boolean(document.querySelector('#firstChordRoot:checked'))
}

function getFunctionNumber () {
  const functionRadio = document.querySelector('input[name="function"]:checked')
    .value
  return parseInt(functionRadio)
}

function getOptions () {
  const key = getKey()
  const firstChordRoot = getFirstChordRoot()
  const functionNumber = getFunctionNumber()
  return { key, firstChordRoot, functionNumber }
}

function getNote (number) {
  return notes[number]
}

function buildScale (keyIndex, intervals) {
  return intervals.map((_, index) => {
    return (
      (keyIndex +
        intervals
          .slice(0, index + 1)
          .reduce((sum, current) => sum + current, 0)) %
      12
    )
  })
}

function getDegrees (keyIndex) {
  return notes.map((note, index) => {
    return {
      note,
      degree: scaleDegrees[(12 - keyIndex + index) % 12]
    }
  })
}

function getKeyNotes (keyIndex) {
  const key = getNote(keyIndex)
  const numbers = buildScale(keyIndex, scaleIntervals)
  const notes = numbers.map(number => getNote(number))
  const degrees = getDegrees(keyIndex)
  return { key, index: keyIndex, notes, numbers, degrees }
}

function moveBySemitones (start, semitones, directionModifier) {
  let number = (start + semitones * directionModifier) % 12
  number = number > 0 ? number : 12 + number
  return number % 12
}

function moveUpOrDown (start, semitonesUp, semitonesDown) {
  const up = random0or1()
  return up
    ? moveBySemitones(start, semitonesUp, 1)
    : moveBySemitones(start, semitonesDown, -1)
}

function getRandomParallelMinor (keyIndex) {
  const parallelMinor = buildScale(keyIndex, parallelMinorIntervals)
  return getRandomItem(parallelMinor)
}

function function1 (keyInfo, firstChordRoot) {
  const chord1Number = firstChordRoot
    ? keyInfo.numbers[0]
    : getRandomItem(keyInfo.numbers)
  let chord2Number = moveUpOrDown(chord1Number, 3, 4)
  return [chord1Number, chord2Number]
}

function function2 (keyInfo, firstChordRoot) {
  const chord1Number = firstChordRoot
    ? keyInfo.numbers[0]
    : getRandomItem(keyInfo.numbers)
  const chord2Number = moveBySemitones(
    chord1Number,
    5,
    randomPlusMinusModifier()
  )
  const chord3Number = moveBySemitones(chord2Number, 3, 1)
  const chord4Number = getRandomParallelMinor(keyInfo.index)
  return [chord1Number, chord2Number, chord3Number, chord4Number]
}

function function3 (keyInfo, firstChordRoot) {
  const chord1Number = firstChordRoot
    ? keyInfo.numbers[0]
    : getRandomItem(keyInfo.numbers)
  const chord2Number = moveBySemitones(
    chord1Number,
    Math.random() > 0.5 ? 3 : 4,
    randomPlusMinusModifier()
  )
  const chord3Number = getRandomItem(keyInfo.numbers)
  const chord4Number = moveBySemitones(
    chord3Number,
    Math.random() > 0.5 ? 3 : 4,
    1
  )
  return [chord1Number, chord2Number, chord3Number, chord4Number]
}

function function4 (keyInfo, firstChordRoot) {
  const chord1Number = firstChordRoot
    ? keyInfo.numbers[0]
    : getRandomItem(keyInfo.numbers)
  const randomSemitones = Math.floor(Math.random() * 11)
  const randomDirection = randomPlusMinusModifier()
  const chord2Number = moveBySemitones(
    chord1Number,
    randomSemitones,
    randomDirection
  )
  const chord3Number = getRandomItem(keyInfo.numbers)
  const chord4Number = moveBySemitones(
    chord3Number,
    randomSemitones,
    randomDirection
  )
  return [chord1Number, chord2Number, chord3Number, chord4Number]
}

function addProgressionDetails (progression, degrees) {
  return progression.map(number => ({
    number,
    note: getNote(number),
    degree: degrees[number].degree
  }))
}

function generate () {
  removePreviousChords()

  const options = getOptions()
  const keyInfo = getKeyNotes(options.key)

  let progressionNumbers = []

  switch (options.functionNumber) {
    case 1:
      progressionNumbers = function1(keyInfo, options.firstChordRoot)
      break
    case 2:
      progressionNumbers = function2(keyInfo, options.firstChordRoot)
      break
    case 3:
      progressionNumbers = function3(keyInfo, options.firstChordRoot)
      break
    case 4:
      progressionNumbers = function4(keyInfo, options.firstChordRoot)
      break
  }

  const progression = addProgressionDetails(progressionNumbers, keyInfo.degrees)

  addProgressionToPage(progression)
  addFunctionToPage(options.functionNumber)
}

function removePreviousChords () {
  chords.forEach(chord => {
    chord.remove()
  })
}

function createChord (chord) {
  const chordDiv = document.createElement('div')
  chordDiv.classList.add('chord')
  chordDiv.classList.add(chord.degree.toLowerCase())

  const chordNoteParagraph = document.createElement('p')
  chordNoteParagraph.innerHTML = chord.note
  chordNoteParagraph.classList.add('chordNote')

  const chordDegreeParagraph = document.createElement('p')
  chordDegreeParagraph.innerHTML = chord.degree
  chordDegreeParagraph.classList.add('chordDegree')

  chordDiv.appendChild(chordNoteParagraph)
  chordDiv.appendChild(chordDegreeParagraph)

  return chordDiv
}

function addProgressionToPage (progression) {
  chords = progression.map(chord => {
    return createChord(chord)
  })
  const result = document.querySelector('#result')
  chords.forEach(chord => {
    result.appendChild(chord)
  })
}

function addFunctionToPage (functionNumber) {
  const text = functionText[functionNumber - 1]
  const functionTextPlaceholder = document.querySelector('#function p')
  functionTextPlaceholder.innerHTML = text
}
