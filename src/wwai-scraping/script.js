const anchors = document.querySelectorAll('p.names a')
const as = []
anchors.forEach(anchor => as.push({text: anchor.innerHTML, link: anchor.href, hash: anchor.hash}))
const aswi = []
as.forEach(a => {
  try {
    const hash = a.hash.slice(1,a.hash.length).replace(`'`,`\\'`)
    const img = document.querySelector(`h2[id='${hash}'] ~ figure img`)
    aswi.push(Object.assign(a, {img: img.src}))
  } catch (error) {
    console.error(error)
    try {
      const text = a.text.replace(`'`,`\\'`).replace(` `, `-`)
      const img = document.querySelector(`h2[id='${text}'] ~ figure img`)
      aswi.push(Object.assign(a, {img: img.src}))
    } catch (e) {
      console.error(e)
      aswi.push(Object.assign(a,{imgNotRetrieved: true}))
    }
  }
})
console.table(aswi)