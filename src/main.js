
const words = ['rat', 'catratdog', 'cat', 'dog', 'cats', 'catsa', 'ratdog', 'e']
const wordLengthsMap = new Map()
let orderedLengths

words.forEach(word => {
  let wordArray = wordLengthsMap.get(word.length) || []
  wordArray.push(word)
  wordLengthsMap.set(word.length, wordArray)
})

orderedLengths = [...wordLengthsMap.keys()].sort()

console.log(orderedLengths)
console.log(wordLengthsMap)