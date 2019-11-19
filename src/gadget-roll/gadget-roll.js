const fs = require('fs')
const path = require('path')

const ipt = require('ipt')

const constants = require('./constants/application')
const countriesJSON = require('./constants/countries')
const gadgetsJSON = require('./constants/gadgets')

const initGetFileTree = require('./helpers/getFileTree')
const getFileTree = initGetFileTree({ fs, path })

const list = gadgetsJSON
  .gadgets
  .map(gadget => Object.assign(
    {},
    gadget,
    { country: countriesJSON.countries.find(country => gadget.country === country.code) }
  ))

const structuresDirectory = path.join(process.cwd(), constants.structuresDirectoryPath)

const structureFiles = getFileTree({ node: structuresDirectory, recursive: getFileTree })

console.log(structureFiles)

ipt(
  ["Something", "Something Else"],
  {
    message: "Choose something",
    size: 10
  })
  .then(selections => console.log(selections))