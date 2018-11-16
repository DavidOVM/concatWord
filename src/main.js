const fs = require('fs')
const treeAlgorithm = require('./algorithms/tree')

let file = null, words = null
try {
  file = fs.readFileSync('src/words.txt', 'utf8')
  words = file.split(/\r?\n/).filter(Boolean)
} catch (e) {
  console.log('please provide a valid file', e)
}
console.log(treeAlgorithm.computeConcatenatedWords(words))