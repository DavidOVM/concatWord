const fs = require('fs')
const treeAlgorithm = require('./algorithms/tree')
const recursiveAlgorithm = require('./algorithms/recursive')

let file = null, words = null
try {
  file = fs.readFileSync('src/words.txt', 'utf8')
  words = file.split(/\r?\n/).filter(Boolean).slice(0, 4000)
} catch (e) {
  console.log('please provide a valid file', e)
}

let solution

console.log('Tree algorithm execution:')
console.time("dbsave")
solution = treeAlgorithm.computeConcatenatedWords(words)
console.timeEnd("dbsave")
console.log(solution.maxLengthConcatWords, solution.secondMaxLengthConcatWords, solution.concatenatedWordCount)

// console.log('Recursive algorithm execution:')
// console.time("dbsave")
// solution = recursiveAlgorithm.computeConcatenatedWords(words)
// console.timeEnd("dbsave")
// console.log(solution.maxLengthConcatWords, solution.secondMaxLengthConcatWords, solution.concatenatedWordCount)