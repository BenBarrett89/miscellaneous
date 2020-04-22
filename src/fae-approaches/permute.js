module.exports = input => {
  let permutations = []
  let usedInputs = []

  const calculatePermutations = input => {
    let i, choice
    for (i = 0; i < input.length; i++) {
      choice = input.splice(i, 1)[0]
      usedInputs.push(choice)
      if (input.length == 0) {
        permutations.push(usedInputs.slice())
      }
      calculatePermutations(input)
      input.splice(i, 0, choice)
      usedInputs.pop()
    }
    return permutations
  }

  return calculatePermutations(input)
}
