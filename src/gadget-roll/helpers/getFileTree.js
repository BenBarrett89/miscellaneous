module.exports = ({ fs, path }) => ({ node, recursive }) => {
  return fs
    .readdirSync(node)
    .map(item => {
      const itemPath = path.join(node, item)
      const stat = fs.statSync(itemPath)
      const isDirectory = stat.isDirectory()
      return isDirectory
        ? { directory: item, path: itemPath, contents: recursive({ node: itemPath, recursive }) }
        : { file: item, path: itemPath }
    })
}
