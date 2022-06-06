const axios = require('axios').default
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const artistsUrl = 'https://downloadfestival.co.uk/artists-a-z/'
const stages = [
  'avalanche',
  'main-stage',
  'second-stage',
  'the-dogtooth-stage',
  'the-sidesplitter-stage',
  'the-dog-house'
]
const stageMap = {
  'avalanche': 'Avalanche Stage',
  'main-stage': 'Apex Stage',
  'second-stage': 'Opus Stage',
  'the-dogtooth-stage': 'The Dogtooth Stage',
  'the-sidesplitter-stage': 'the-sidesplitter-stage',
  'the-dog-house': 'The Doghouse'
}
const trash = [
  'artist',
  'day-all',
  'featured-artists',
  'genre-all',
  'grid-item',
  'name-all',
  'stage-all',
  'stage-2',
  'late-night-dj'
]

const dataDirectory = path.join(__dirname, '../data')
const encoding = {
  encoding: 'utf-8'
}

const byStageTime = (a, b) => {
  const aTime = a.time
  const bTime = b.time
  return aTime < bTime ? -1 : 1
}

const bandOn = day => artist => day == artist.day

const run = async () => {
  const artistsPageResponse = await axios.get(artistsUrl)

  let $ = cheerio.load(artistsPageResponse.data)

  let artistArray = []
  $('.artist').each((_, element) => {
    const artist = $(element)
      .find('a')
      .text()
      .trim()
    const classes = $(element)
      .attr('class')
      .split(' ')
      .reduce(
        (details, currentClass) => {
          if (currentClass.endsWith('day')) {
            details.day = `${currentClass
              .charAt(0)
              .toUpperCase()}${currentClass.slice(1)}`
          } else if (stages.includes(currentClass)) {
            details.stage = stageMap[currentClass]
          } else if (
            currentClass.length > 1 &&
            !trash.includes(currentClass)
          ) {
            details.genres.push(
              `${currentClass.charAt(0).toUpperCase()}${currentClass.slice(
                1
              )}`
            )
          }
          return details
        },
        { genres: [] }
      )
    const link = $(element)
      .find('a')
      .attr('href')
    artistArray.push({
      name: `${artist.charAt(0).toUpperCase()}${artist.slice(1)}`,
      link,
      ...classes
    })
  })

  const artists = await Promise.all(
    artistArray.map(async artist => {
      const artistPageResponse = await axios.get(artist.link)
      let artistPage = cheerio.load(artistPageResponse.data)
      const time = artistPage('.time strong').text()
      const [startTime, endTime] = time.split(" – ")
      
      return Object.assign({}, artist, {
        time,
        startTime,
        endTime
      })
    })
  )

  fs.writeFileSync(
    path.join(dataDirectory,'bands.json'),
    JSON.stringify({ artists }),
    encoding
  )

  const friday = artists.filter(bandOn('Friday'))
  const saturday = artists.filter(bandOn('Saturday'))
  const sunday = artists.filter(bandOn('Sunday'))

  const days = [friday, saturday, sunday]

  const stageSplit = stages.reduce((result, stage) => Object.assign({}, result, {[stageMap[stage]]:[]}),{})
  
  const dayStages = days.map(day => {
    let dayStages = Object.assign({}, stageSplit)
    day.forEach(artist => {
      const stage = artist.stage
      if (stage) {
        const stageArray = dayStages[stage]
        const newStage = stageArray.concat(artist).sort(byStageTime)
        dayStages[stage] = newStage
      } else {
        console.log(`No stage: ${artist.name}`)
      }
    })
    return dayStages
  })

  fs.writeFileSync(
    path.join(dataDirectory,'friday.json'),
    JSON.stringify({ artists: dayStages[0] }),
    encoding
  )
  fs.writeFileSync(
    path.join(dataDirectory,'saturday.json'),
    JSON.stringify({ artists: dayStages[1] }),
    encoding
  )
  fs.writeFileSync(
    path.join(dataDirectory,'sunday.json'),
    JSON.stringify({ artists: dayStages[2] }),
    encoding
  )
}

run()