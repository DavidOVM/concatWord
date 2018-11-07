const Tree = require('../models/tree')

const computeConcatenatedWords = (words) => {
  const tree = new Tree()

  let minLength = Infinity, secondMinLength = Infinity
  for (let i = 0; i < words.length; i++) {
    tree.addWord(words[i])
    let length = words[i].length
    if (length < minLength) {
      secondMinLength = minLength
      minLength = length
    } else if (length < secondMinLength) {
      secondMinLength = length
    }
  }

  const minimumLength = minLength + secondMinLength

  let concatenatedWordCount = 0
  let maxLength = 0, secondMaxLength = 0
  let maxLengthWords = [], secondMaxLengthWords = []
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (word.length > minimumLength && tree.isConcatenated(word)) {
      concatenatedWordCount++
      if (word.length > maxLength) {
        secondMaxLength = maxLength
        secondMaxLengthWords = maxLengthWords
        maxLength = word.length
        maxLengthWords = [word]
      } else if (word.length === maxLength) {
        maxLengthWords.push(word)
      } else if (word.length > secondMaxLength) {
        secondMaxLength = word.length
        secondMaxLengthWords = [word]
      } else if (word.length === secondMaxLength) {
        secondMaxLengthWords.push(word)
      }
    }
  }

  return {
    concatenatedWordCount,
    maxLengthWords,
    secondMaxLengthWords
  }
}

module.exports = {
  computeConcatenatedWords
}
