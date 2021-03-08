const fs = require('fs')
const path = require('path')

const baseOutputDirectory = path.join(__dirname, 'output')

const pages = [
  { output: path.join(baseOutputDirectory, '20') },
  { output: path.join(baseOutputDirectory, '19') },
  { output: path.join(baseOutputDirectory, '18') },
  { output: path.join(baseOutputDirectory, '17') }
]

const run = async () => {
  Promise.all(
    pages.map(async page => {
      await fs.rmSync(page.output, { force: true, recursive: true })
      await fs.mkdirSync(page.output)
    })
  )
}

run()