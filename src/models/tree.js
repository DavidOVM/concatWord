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

  addWords(words) {
    for (let i = 0; i < words.length; i++) {
      this.addWord(words[i])
    }
  }

  print() {
    this.rootNode.print()
  }

  isConcatenated(word, isOriginalWord = true) {
    let currentNode = this.rootNode
    let nextNode = null
    let endOfWordDepths = []

    for (let index = 0; index < word.length; index++) {
      nextNode = currentNode.childNodes[word[index]]
      if (!nextNode) {
        if (currentNode.isEndOfWord) {
          break
        }
        if (isOriginalWord) {
          return false
        } else {
          break
        }
      } else if (isOriginalWord && nextNode.depth === word.length && !nextNode.isEndOfWord) {
        return false
      } else if (!isOriginalWord && nextNode.depth === word.length && !nextNode.isEndOfWord) {
        break
      } else if (!isOriginalWord && nextNode.isEndOfWord && nextNode.depth === word.length) {
        return true
      } else if (isOriginalWord && nextNode.isEndOfWord && nextNode.depth === word.length) {
        break
      } else if (nextNode.isEndOfWord) {
        endOfWordDepths.push(nextNode.depth)
      }
      currentNode = nextNode
    }

    for (let index = 0; index < endOfWordDepths.length; index++) {
      if (this.isConcatenated(word.substring(endOfWordDepths[index]), false)) {
        return true
      }
    }

    return false
  }

}

module.exports = Tree