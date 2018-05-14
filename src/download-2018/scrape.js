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
) => requestPromise(urlOptions)
  .then($ => {
    $('.artist').each((index, element) => {
      console.log($(element).find('a').text().trim())
    })
  })
  .catch(error => {
    console.log(error)
})

const options = getOptions(cheerio, `https://downloadfestival.co.uk/artists-a-z/`)

scrapePage(rp, options)
