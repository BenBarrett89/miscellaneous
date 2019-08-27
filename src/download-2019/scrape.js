const rp = require('request-promise')
const cheerio = require('cheerio')

const getOptions = (parser, uri) => ({
  uri,
  transform: body => parser.load(body)
})

const scrapePage = (requestPromise, urlOptions, stages, stageMap, trash) => {
  let artistArray = []
  requestPromise(urlOptions)
    .then($ => {
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

        artistArray.push({
          name: `${artist.charAt(0).toUpperCase()}${artist.slice(1)}`,
          ...classes
        })
      })
    })
    .then(() => {
      const reorderedArray = artistArray
        .filter(
          artist =>
            artist.stage !== 'wwe-nxt' &&
            artist.stage !== 'the-sidesplitter-stage'
        )
        .map(artist =>
          artist.name.startsWith('The')
            ? Object.assign({}, artist, {
              name: `${artist.name.slice(4, artist.name.length)} (The)`
            })
            : artist
        )
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .forEach(artist =>
          console.log(
            `"${artist.name}", "${artist.genres.join(', ')}", "${
              artist.stage
            }", "${artist.day}"`
          )
        )
    })
    .catch(error => {
      console.log(error)
    })
}

const stages = [
  'avalanche',
  'main-stage',
  'the-dogtooth-stage',
  'the-sidesplitter-stage',
  'wwe-nxt',
  'zippo-encore-stage'
]

const stageMap = {
  avalanche: 'Avalanche Stage',
  'main-stage': 'Main Stage',
  'the-dogtooth-stage': 'The Dogtooth Stage',
  'the-sidesplitter-stage': 'the-sidesplitter-stage',
  'zippo-encore-stage': 'Zippo Encore Stage',
  'wwe-nxt': 'wwe-nxt'
}

const trash = [
  'artist',
  'day-all',
  'featured-artists',
  'genre-all',
  'grid-item',
  'name-all',
  'stage-all'
]

const options = getOptions(
  cheerio,
  `https://downloadfestival.co.uk/artists-a-z/`
)

scrapePage(rp, options, stages, stageMap, trash)
