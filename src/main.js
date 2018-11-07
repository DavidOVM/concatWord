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
  print(tab = ' ') {
    console.log(tab, this.value, '---', this.depth, '---', this.isEndOfWord, '---')
    const childNodeKeys = Object.keys(this.childNodes)
    for (let i = 0; i < childNodeKeys.length; i++) {
      this.childNodes[childNodeKeys[i]].print(tab + '  ')
    }
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

  print() {
    this.rootNode.print()
  }

  isConcatenated(word) {
    let currentNode = this.rootNode
    let nextNode = {}
    let lastEndOfWordNode = null
    let index = 0
    while (true) {
      if (index === word.length ) {
        if (word.length !== currentNode.depth && currentNode.isEndOfWord) {
          return true
        }
        if (!lastEndOfWordNode) {
          return false
        }
        index -= currentNode.depth - lastEndOfWordNode.depth
        nextNode = this.rootNode
        currentNode = this.rootNode
        lastEndOfWordNode = null
        continue
      } else {
        nextNode = currentNode.childNodes[word[index]]
      }

      if (!nextNode) {
        if (!currentNode.isEndOfWord) {
          if (!lastEndOfWordNode) {
            return false
          }
          index -= currentNode.depth - lastEndOfWordNode.depth
        }
        nextNode = this.rootNode
        lastEndOfWordNode = null
      } else {
        if (currentNode.isEndOfWord) {
          lastEndOfWordNode = currentNode
        }
        ++index
      }

      currentNode = nextNode
    }
  }
}

const words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
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

tree.print()

console.log(tree.isConcatenated('catsdogcats'))
console.log(tree.isConcatenated('dogcatsdog'))
console.log(tree.isConcatenated('ratcatdogcathippopotamuses'))