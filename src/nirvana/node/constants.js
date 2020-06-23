const colors = require('colors/safe')

const keyPattern = /[A|C|D|F|G]#?|[B|E](?!#)/i

const affirmative = ['y', 'yes', 'Y', 'Yes', 'true', 'True', '1']

module.exports = {
  affirmative,
  messages: {
    exit: colors.yellow('Thanks for playing!\n'),
    start: colors.bgWhite(
      colors.black('\n  Nirvana Chord Progression Generator  \n')
    )
  },
  keyPattern,
  notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  scaleDegrees: [
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
  ],
  scaleIntervals: [0, 2, 2, 1, 2, 2, 2],
  parallelMinorIntervals: [2, 1, 2, 2, 1, 2],
  schema: {
    again: {
      properties: {
        continue: {
          description: colors.green(
            'Would you like to generate another progression?'
          )
        }
      }
    },
    get: {
      properties: {
        key: {
          description: colors.yellow(
            'Enter the key - sharp notation only (no flats)'
          ),
          pattern: keyPattern,
          message: colors.red(
            'Please enter a valid note for the key - sharp notation only (no flats)'
          ),
          required: true
        },
        firstChordRoot: {
          description: colors.green('Should the first chord be the root?'),
          required: false
        },
        function: {
          description: colors.cyan('Enter the function to use (1 to 4)'),
          pattern: /[1-4]/,
          message: colors.red('Please select a number between 1 and 4'),
          required: true
        }
      }
    }
  }
}
