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
  .then(htmlString => {
    console.log(htmlString)
  })
  .catch(error => {
    console.log(error)
})

const options = getOptions(cheerio, `https://downloadfestival.co.uk/artists-a-z/`)

scrapePage(rp, options)
