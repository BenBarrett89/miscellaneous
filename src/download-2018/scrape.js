const rp = require('request-promise')
const cheerio = require('cheerio')

const getOptions = (
  parser,
  uri
) => ({
  uri,
  transform: body => parser.load(body)
})

const scrapePage = (
  requestPromise,
  urlOptions
) => {
  let artistArray = []
  requestPromise(urlOptions)
    .then($ => {
      $('.artist').each((index, element) => {
        const artist = $(element).find('a').text().trim()
        const rawDetails = $(element).find('p').text().trim().split(', ')
        const details = rawDetails
          .reduce((details, detail) => {
            const colonIndex = detail.indexOf(`:`)
            const type = detail.slice(0, colonIndex).toLowerCase()
            const value = detail.slice(colonIndex + 2, detail.length)
            return Object.assign(
              {},
              details,
              {[type]: value}
            )
          }, {})
        artistArray.push({
          name: artist,
          ...details
        })
      })
    })
    .then(() => {
      const reorderedArray = artistArray
        .map(artist => (
          artist.name.startsWith('The')
            ? Object.assign({}, artist, { name: `${artist.name.slice(4, artist.name.length)} (The)`})
            : artist
        ))
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .forEach(artist => console.log(artist.name, artist.stage, artist.day))
    })
    .catch(error => {
      console.log(error)
    })
}

const options = getOptions(cheerio, `https://downloadfestival.co.uk/artists-a-z/`)

scrapePage(rp, options)
