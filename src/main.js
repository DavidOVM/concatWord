class Node {
  constructor (parentNode, value = null, depth, childNodes = {}, isEndOfWord = false) {
    this.parentNode = parentNode
    this.childNodes = childNodes
    this.isEndOfWord = isEndOfWord
    this.value = value
    this.depth = depth
  }
  addChild(value) {
    let childNode = this.childNodes[value]
    if (!childNode) {
      childNode = new Node(this, value, this.depth + 1)
      this.childNodes[value] = childNode
    }
    return childNode
  }
}

class Tree {
  constructor () {
    this.rootNode = new Node(null, 'root', 0)
  }

  addWord(word) {
    let currentNode = this.rootNode
    for (let i = 0; i < word.length; i++) {
      currentNode = currentNode.addChild(word[i])
    }
    currentNode.isEndOfWord = true
  }
}

const words = ['rat', 'catratdog', 'cat', 'dog', 'cats', 'catsrat', 'ratdog', 'e']
const wordLengthsMap = new Map()
const tree = new Tree()
let orderedLengths

words.forEach(word => {
  let wordArray = wordLengthsMap.get(word.length) || []
  wordArray.push(word)
  wordLengthsMap.set(word.length, wordArray)
  tree.addWord(word)
})

orderedLengths = [...wordLengthsMap.keys()].sort()

console.log(orderedLengths)
console.log(wordLengthsMap)