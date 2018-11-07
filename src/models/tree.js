const Node = require('./node')

class Tree {
  constructor () {
    this.rootNode = new Node(null, 'root', 0)
  }

  addWord(word) {
    if (word && word.length) {
      let currentNode = this.rootNode
      for (let i = 0; i < word.length; i++) {
        currentNode = currentNode.addChild(word[i])
      }
      currentNode.isEndOfWord = true
    }
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

module.exports = Tree