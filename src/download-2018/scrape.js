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
        artistArray.push(artist)
      })
    })
    .then(() => {
      const reorderedArray = artistArray
        .map(artist => {
          return artist.startsWith('The')
            ? `${artist.slice(4, artist.length)} (The)`
            : artist
        })
        .sort()
        .forEach(artist => console.log(artist))
    })
    .catch(error => {
      console.log(error)
    })
}

const options = getOptions(cheerio, `https://downloadfestival.co.uk/artists-a-z/`)

scrapePage(rp, options)
