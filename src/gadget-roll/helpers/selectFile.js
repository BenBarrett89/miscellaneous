module.exports = ({ ipt }) => ({ fileTree, recursive }) => {
  const input = fileTree
    .sort(itemA, itemB => {
      const itemAIsDirectory = Boolean(itemA.directory)
      const itemBIsDirectory = Boolean(itemB.directory)
      if (itemAIsDirectory && !itemBIsDirectory) return 1
      else if (!itemAIsDirectory && itemBIsDirectory) return -1
      else if (itemAIsDirectory && itemBIsDirectory) {
        return itemA.directory.localeCompare(itemB.directory)
      } else {
        return itemA.file.localeCompare(itemB.file)
      }
    })
    .map(item => item.directory === undefined ? `${item.file}` : `(Directory) ${item.directory.toUpperCase()}`)
}