const computeConcatenatedWords = (words) => {

  let minLength = Infinity, secondMinLength = Infinity, maxLength = 0
  for (let i = 0; i < words.length; i++) {
    let length = words[i].length
    if (length > maxLength) {
      maxLength = length
    }
    if (length < minLength) {
      secondMinLength = minLength
      minLength = length
    } else if (length < secondMinLength) {
      secondMinLength = length
    }
  }
  minLength = minLength + secondMinLength

  let concatenatedWordCount = 0
  let maxConcatLength = 0, secondMaxConcatLength = 0
  let maxLengthConcatWords = [], secondMaxLengthConcatWords = []
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (isConcatenated(word, 0, words, minLength, maxLength)) {
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

const isConcatenated = (word, currentIndex, words, minLength, maxLength, concatenatedWordCount = 0) => {
  if (word.length === currentIndex) {
    return concatenatedWordCount > 1
  }

  for (let i = minLength; i < maxLength; i++) {
    if (word.length + 1 === currentIndex + i) {
      break
    }
    let subWord = word.substring(currentIndex, currentIndex + i)
    if (words.includes(subWord)) {
      if (isConcatenated(word, currentIndex + i, words, minLength, maxLength, concatenatedWordCount + 1)) {
        return true
      }
    }
  }
  return false
}

module.exports = {
  computeConcatenatedWords
}
