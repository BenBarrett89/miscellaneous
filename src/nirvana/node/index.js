const prompt = require('prompt')
const colors = require('colors/safe')

const constants = require('./constants')

console.log(constants.messages.start)
prompt.start()
prompt.message = colors.white('> ')

const getNote = number => constants.notes[number]

const getRandomItem = array => array[Math.floor(Math.random() * array.length)]

const randomPlusMinusModifier = () => (Math.random() >= 0.5 ? 1 : -1)

const random0or1 = () => (Math.random() >= 0.5 ? 1 : 0)

const getDegrees = keyIndex => {
  return constants.notes.map((note, index) => {
    return {
      note,
      degree: constants.scaleDegrees[(12 - keyIndex + index) % 12]
    }
  })
}

const getKeyIndex = key => constants.notes.findIndex(note => note === key)

const buildScale = (keyIndex, intervals) =>
  intervals.map((_, index) => {
    return (
      (keyIndex +
        intervals
          .slice(0, index + 1)
          .reduce((sum, current) => sum + current, 0)) %
      12
    )
  })

const getKeyNotes = key => {
  const keyIndex = getKeyIndex(key)
  const numbers = buildScale(keyIndex, constants.scaleIntervals)
  const notes = numbers.map(number => getNote(number))
  const degrees = getDegrees(keyIndex)
  return { key, index: keyIndex, notes, numbers, degrees }
}

const getRandomParallelMinor = keyIndex => {
  const parallelMinor = buildScale(keyIndex, constants.parallelMinorIntervals)
  return getRandomItem(parallelMinor)
}

const printProgression = (progression, degrees) => {
  console.log(
    colors.magenta(
      progression.map((chord, index) => getNote(chord)).join(' - ')
    )
  )
  console.log(
    colors.yellow(
      progression.map((chord, index) => degrees[chord].degree).join(' - ')
    )
  )
}

const moveBySemitones = (start, semitones, directionModifier) => {
  let number = (start + semitones * directionModifier) % 12
  number = number > 0 ? number : 12 + number
  return number % 12
}

const moveUpOrDown = (start, semitonesUp, semitonesDown) => {
  const up = random0or1()
  return up
    ? moveBySemitones(start, semitonesUp, 1)
    : moveBySemitones(start, semitonesDown, -1)
}

//  X(M)±b3(M)
const function1 = (keyInfo, firstChordRoot) => {
  const chord1Number = firstChordRoot
    ? keyInfo.numbers[0]
    : getRandomItem(keyInfo.numbers)
  let chord2Number = moveUpOrDown(chord1Number, 3, 4)
  const progression = [chord1Number, chord2Number]
  printProgression(progression, keyInfo.degrees)
}

// X(M)±4(M)+b3(M)±Y(r,M) - description says relative minor, but examples show parallel minor
const function2 = (keyInfo, firstChordRoot) => {
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
  const progression = [chord1Number, chord2Number, chord3Number, chord4Number]
  printProgression(progression, keyInfo.degrees)
}

// X±b3/3±Y(M)+b3(M)
const function3 = (keyInfo, firstChordRoot) => {
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
  const progression = [chord1Number, chord2Number, chord3Number, chord4Number]
  printProgression(progression, keyInfo.degrees)
}

// X±?±Y±?
const function4 = (keyInfo, firstChordRoot) => {
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
  const progression = [chord1Number, chord2Number, chord3Number, chord4Number]
  printProgression(progression, keyInfo.degrees)
}

const get = () =>
  prompt.get(constants.schema.get, (error, result) => {
    if (error) console.log(error)

    const firstChordRoot = constants.affirmative.includes(result.firstChordRoot)
    const functionNumber = parseInt(result.function)
    const upperKey = result.key.toUpperCase()
    const key = constants.notes.find(note => note === upperKey)
    if (!key) {
      console.log(`${result.key} not a recognised key`)
      get()
    } else {
      console.log('')
      const keyInfo = getKeyNotes(key)
      switch (functionNumber) {
        case 1:
          console.log(colors.white('Function 1: X(M)±b3(M)\n'))
          function1(keyInfo, firstChordRoot)
          break
        case 2:
          console.log(colors.white('Function 2: X(M)±4(M)+b3(M)±Y(r,M)\n'))
          function2(keyInfo, firstChordRoot)
          break
        case 3:
          console.log(colors.white('Function 3: X±b3/3±Y(M)+b3(M)\n'))
          function3(keyInfo, firstChordRoot)
          break
        case 4:
          console.log(colors.white('Function 4: X±?±Y±?\n'))
          function4(keyInfo, firstChordRoot)
          break
      }
      console.log('')
      again()
    }
  })

const again = () =>
  prompt.get(constants.schema.again, (error, result) => {
    if (error) console.log(error)

    if (constants.affirmative.includes(result.continue)) {
      console.log('')
      get()
    } else {
      console.log(constants.messages.exit)
      process.exit()
    }
  })

get()
