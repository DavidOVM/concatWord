const Tree = require('../models/tree')

const computeConcatenatedWords = (words) => {
  const tree = new Tree()

  tree.addWords(words)

  let concatenatedWordCount = 0
  let maxConcatLength = 0, secondMaxConcatLength = 0
  let maxLengthConcatWords = [], secondMaxLengthConcatWords = []

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (tree.isConcatenated(word)) {
      concatenatedWordCount++
      if (word.length > maxConcatLength) {
        secondMaxConcatLength = maxConcatLength
        secondMaxLengthConcatWords = maxLengthConcatWords
        maxConcatLength = word.length
        maxLengthConcatWords = [word]
      } else if (word.length === maxConcatLength) {
        maxLengthConcatWords.push(word)
      } else if (word.length > secondMaxConcatLength) {
        secondMaxConcatLength = word.length
        secondMaxLengthConcatWords = [word]
      } else if (word.length === secondMaxConcatLength) {
        secondMaxLengthConcatWords.push(word)
      }
    }
  }

  return {
    concatenatedWordCount,
    maxLengthConcatWords,
    secondMaxLengthConcatWords
  }
}

module.exports = {
  computeConcatenatedWords
}
