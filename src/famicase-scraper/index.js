const axios = require('axios')
const fs = require('fs')
const path = require('path')
const requestPromise = require('request-promise')
const cheerio = require('cheerio')

const baseUrl = 'https://famicase.com'
const baseOutputDirectory = path.join(__dirname, 'output')

const cartridgeImagePath = '/softs'
const imageSuffix = '_sample.jpg'

const padTo3 = index => ("000" + index).slice(-3)

const pages = [
  { url: `${baseUrl}/20`, output: path.join(baseOutputDirectory, '20'), pad: padTo3 },
  // { url: `${baseUrl}/19`, output: path.join(baseOutputDirectory, '19'), pad: padTo3 },
  // { url: `${baseUrl}/18`, output: path.join(baseOutputDirectory, '18'), pad: padTo3 },
  // { url: `${baseUrl}/17`, output: path.join(baseOutputDirectory, '17'), pad: padTo3 }
]

const getOptions = (
  parser,
  uri
) => ({
  uri,
  transform: body => parser.load(body)
})

const scraper = async ({ axios, cartridgeImagePath, cheerio, fs, imageSuffix, pages, requestPromise }) => {
  pages.map(page => {
    const pageOptions = getOptions(cheerio, page.url)
    return requestPromise(pageOptions)
      .then($ => {
        const numberOfElements = $('#pop').length
        Array
          .apply(null, Array(numberOfElements))
          .forEach((_, index) => {
            const imagePath = `${page.pad(index + 1)}${imageSuffix}`
            const savePath = path.join(page.output, imagePath)
            const imageUrl = `${page.url}${cartridgeImagePath}/${imagePath}`
            axios({ url: imageUrl, responseType: 'stream' })
              .then(response =>
                new Promise((resolve, reject) => {
                  response.data
                    .pipe(fs.createWriteStream(savePath))
                    .on('finish', () => resolve())
                    .on('error', error => reject(error))
                })
              )
          })
      })
  })
}

scraper({
  axios,
  cartridgeImagePath,
  cheerio,
  fs,
  getOptions,
  imageSuffix,
  pages,
  requestPromise
})