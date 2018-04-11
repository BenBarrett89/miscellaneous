module.exports = rhythms =>
  numberOfBeats =>
    Array(numberOfBeats).fill()
      .map(_ => rhythms[Math.floor(Math.random() * Math.floor(rhythms.length))])
      .reduce((existing, current) =>
        ({
          rhythm: `${existing.rhythm}${current.rhythm}`,
          number: `${existing.number}${current.code}`
        })
      , {rhythm: '', number: ''})