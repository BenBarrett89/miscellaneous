const axios = require('axios').default
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

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
const arenaStages = [
  'Avalanche Stage', 'Apex Stage', 'Opus Stage', 'The Dogtooth Stage'
]
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

const byStartTime = (a, b) => a.startTime < b.startTime ? -1 : 1

const bandOn = day => artist => day == artist.day
const bandNotOn = day => artist => day != artist.day

const arenaStagesOnly = artist => artist.stage && arenaStages.includes(artist.stage)

const forExport = artist => ({ startTime: artist.startTime, endTime: artist.endTime, stage: artist.stage, name: artist.name, time: artist.time, genres: artist.genres ? artist.genres.join(" ") : "" })

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

  console.log(`Number of artists on artists page: ${artistArray.length}`)

  const artists = await Promise.all(
    artistArray.map(async artist => {
      const artistPageResponse = await axios.get(artist.link)
      let artistPage = cheerio.load(artistPageResponse.data)

      // TODO - refactor this; the artist may play on multiple days
      const time = artistPage('.time strong').text()
      let [startTime, endTime] = time.split(" – ")
      startTime = startTime.length ? startTime : "11:00"
      
      return Object.assign({}, artist, {
        time,
        startTime,
        endTime
      })
    })
  )

  console.log(`Total number of artists found: ${artists.length}`)

  fs.writeFileSync(
    path.join(dataDirectory,'bands.json'),
    JSON.stringify({ artists }),
    encoding
  )

  const wednesday = artists.filter(bandOn('Wednesday'))
  console.log(`Artists on Wednesday: ${wednesday.length}`)
  const thursday = artists.filter(bandOn('Thursday'))
  console.log(`Artists on Thursday: ${thursday.length}`)
  const friday = artists.filter(bandOn('Friday'))
  console.log(`Artists on Friday: ${friday.length}`)
  const saturday = artists.filter(bandOn('Saturday'))
  console.log(`Artists on Saturday: ${saturday.length}`)
  const sunday = artists.filter(bandOn('Sunday'))
  console.log(`Artists on Sunday: ${sunday.length}`)

  const unrecognisedDay = artists
    .filter(bandNotOn('Wednesday'))
    .filter(bandNotOn('Thursday'))
    .filter(bandNotOn('Friday'))
    .filter(bandNotOn('Saturday'))
    .filter(bandNotOn('Sunday'))

  const differenceInNumber = artists.length - (wednesday.length + thursday.length + friday.length + saturday.length + sunday.length)
  if (differenceInNumber !== 0) {
    console.error(`Some artists not found on standard days! Difference: ${differenceInNumber}`)
    unrecognisedDay.forEach((artist, i) => console.log(`${i+1}: ${artist.name} on ${artist.day}`))
  } else {
    console.log(`All artists sorted into known days`)
  }

  const days = [wednesday, thursday, friday, saturday, sunday]

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
        console.log(`No stage: ${artist.name} (${artist.startTime} on ${artist.day})`)
      }
    })
    return dayStages
  })

  // fs.writeFileSync(
  //   path.join(dataDirectory,'friday.json'),
  //   JSON.stringify({ artists: dayStages[0] }),
  //   encoding
  // )
  // fs.writeFileSync(
  //   path.join(dataDirectory,'saturday.json'),
  //   JSON.stringify({ artists: dayStages[1] }),
  //   encoding
  // )
  // fs.writeFileSync(
  //   path.join(dataDirectory,'sunday.json'),
  //   JSON.stringify({ artists: dayStages[2] }),
  //   encoding
  // )

  const thursdayJSON = thursday.filter(arenaStagesOnly).sort(byStartTime).map(forExport)
  const fridayJSON = friday.filter(arenaStagesOnly).sort(byStartTime).map(forExport)
  const saturdayJSON = saturday.filter(arenaStagesOnly).sort(byStartTime).map(forExport)
  const sundayJSON = sunday.filter(arenaStagesOnly).sort(byStartTime).map(forExport)

  let workBook = XLSX.utils.book_new()

  const thursdayWS = XLSX.utils.json_to_sheet(thursdayJSON)
  XLSX.utils.book_append_sheet(workBook, thursdayWS, `Thursday`)
  const fridayWS = XLSX.utils.json_to_sheet(fridayJSON)
  XLSX.utils.book_append_sheet(workBook, fridayWS, `Friday`)
  const saturdayWS = XLSX.utils.json_to_sheet(saturdayJSON)
  XLSX.utils.book_append_sheet(workBook, saturdayWS, `Saturday`)
  const sundayWS = XLSX.utils.json_to_sheet(sundayJSON)
  XLSX.utils.book_append_sheet(workBook, sundayWS, `Sunday`)

  XLSX.writeFile(workBook, path.join(dataDirectory, 'DL2023.xls'))
}

run()