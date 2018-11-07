const fs = require('fs')
const treeAlgorithm = require('./algorithms/tree')

let file = null, words = null
try {
  file = fs.readFileSync('src/words.txt', 'utf8')
  words = file.split(/\r?\n/)
} catch (e) {
  console.log('please provide a valid file', e)
}

console.time("dbsave")
const {concatenatedWordCount, maxLengthWords, secondMaxLengthWords } = treeAlgorithm.computeConcatenatedWords(words)
console.timeEnd("dbsave")
console.log(maxLengthWords, secondMaxLengthWords, concatenatedWordCount)