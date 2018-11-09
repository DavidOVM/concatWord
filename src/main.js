const fs = require('fs')
const treeAlgorithm = require('./algorithms/tree')
//const recursiveAlgorithm = require('./algorithms/recursive')

let file = null, words = null
try {
  file = fs.readFileSync('src/words.txt', 'utf8')
  words = file.split(/\r?\n/).filter(Boolean)
} catch (e) {
  console.log('please provide a valid file', e)
}

let solution

console.log('Tree algorithm execution:\n')
console.time("dbsave")
solution = treeAlgorithm.computeConcatenatedWords(words)
console.timeEnd("dbsave")
console.log()
if (solution.maxLengthConcatWords && solution.maxLengthConcatWords.length) {
  console.log(`\nLongest words: ${solution.maxLengthConcatWords.length} words with size ${solution.maxLengthConcatWords[0].length}:`)
  solution.maxLengthConcatWords.forEach(word => console.log(' -', word))
}
if (solution.secondMaxLengthConcatWords && solution.secondMaxLengthConcatWords.length) {
  console.log(`\nSecond longest words: ${solution.secondMaxLengthConcatWords.length} words with size ${solution.secondMaxLengthConcatWords[0].length}:`)
  solution.secondMaxLengthConcatWords.forEach(word => console.log(' -', word))
}
console.log('\nTotal number of concatenated words:', solution.concatenatedWordCount)

// console.log('Recursive algorithm execution:')
// console.time("dbsave")
// solution = recursiveAlgorithm.computeConcatenatedWords(words)
// console.timeEnd("dbsave")
// console.log(solution.maxLengthConcatWords, solution.secondMaxLengthConcatWords, solution.concatenatedWordCount)