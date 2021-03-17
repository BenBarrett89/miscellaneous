const fs = require('fs')
const path = require('path')

const data = require('../data/raw.js')

const getInterval = (a, b) => {
  const aNote = a.index
  const bNote = b.index < a.index ? b.index + 12 : b.index
  const distance = bNote - aNote
  return data.intervallicDistances.find(interval => interval.distance === distance)
}

const calculate = async ({ data, fs, path }) => {
  const keys = data.keys.reduce((output, key) => {
    const notationType = key.pitches.natural || key.pitches.sharps ? 'sharp' : 'flat'
    const keyNameMajor = `${data.notes[key.notes.major].name[notationType]} Major`
    const keyNameMinor = `${data.notes[key.notes.minor].name[notationType]} Minor`

    const notes = [{
      index: key.notes.major,
      name: data.notes[key.notes.major].name[notationType]
    }]
      .concat(data.intervals.absolute.map(interval => {
        const index = (key.notes.major + interval) % 12
        const name = data.notes[index].name[notationType]
        return { index, name }
      }))

    const modes = data.modes.map((mode, index) => {
      const modeNotes = notes
        .concat(notes)
        .slice(index, index + notes.length)
        .map((note, noteIndex, array) => Object.assign({}, note, {
          degree: noteIndex + 1,
          interval: getInterval(array[0], note)
        }))
      const name = `${modeNotes[0].name} ${mode.name}`
      return {
        name,
        type: mode,
        notes: modeNotes
      }
    })

    return output.concat({
      pitches: key.pitches,
      major: {
        name: keyNameMajor,
        index: key.notes.major
      },
      minor: {
        name: keyNameMinor,
        index: key.notes.minor
      },
      notes,
      modes
    })
  }, [])

  const modes = keys.reduce((output, key, keyIndex) => {
    const keyModes = key.modes.map((mode, modeIndex) => Object.assign({}, mode, {
      id: `${keyIndex}${modeIndex}`,
      mode: modeIndex,
      key: {
        major: key.major,
        minor: key.minor,
        pitches: key.pitches,
        notes: key.notes
      }
    }))
    return output.concat(...keyModes)
  }, [])

  const mapNotesToIndices = note => note.index

  const comparisons = modes.reduce((output, mode, _, modes) => {
    const modeNoteIndices = mode.notes.map(mapNotesToIndices)
    return output.concat(...modes.map(comparisonMode => {
      const comparisonModeNoteIndices = comparisonMode.notes.map(mapNotesToIndices)
      const commonNoteIndices = modeNoteIndices.filter(index => comparisonModeNoteIndices.includes(index))
      return {
        id: {
          mode: mode.id,
          comparison: comparisonMode.id
        },
        common: commonNoteIndices
      }
    }))
  }, [])

  const outputFilePathKeys = path.join(__dirname, '..', 'data', 'keys.json')
  await fs.writeFileSync(outputFilePathKeys, JSON.stringify(keys, undefined, 2))
  const outputFilePathModes = path.join(__dirname, '..', 'data', 'modes.json')
  await fs.writeFileSync(outputFilePathModes, JSON.stringify(modes, undefined, 2))
  const outputFilePathComparisons = path.join(__dirname, '..', 'data', 'comparisons.json')
  await fs.writeFileSync(outputFilePathComparisons, JSON.stringify(comparisons))
}

calculate({
  data,
  fs,
  path
})
