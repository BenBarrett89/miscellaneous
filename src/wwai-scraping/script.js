// Change p tags with a links to include class="names"
// https://weirdwonderfulai.art/resources/disco-diffusion-70-plus-artist-studies/ - artists.json
// https://weirdwonderfulai.art/resources/disco-diffusion-modifiers - modifiers.json (Howl's Moving Castle didn't work, so did manually)
// https://weirdwonderfulai.art/resources/anything-punk-modifiers-for-ai-art/ - punks.json
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