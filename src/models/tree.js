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
    for (let index = 0, currentNode = this.rootNode, nextNode = null; index < word.length; index++, currentNode = nextNode) {
      nextNode = currentNode.childNodes[word[index]]
      if (!nextNode) {
        if (currentNode.isEndOfWord) break
        if (isOriginalWord) return false
        break
      }
      if (nextNode.depth === word.length) {
        if (isOriginalWord) {
          if (nextNode.isEndOfWord) break
          else return false
        } else {
          if (nextNode.isEndOfWord) return true
          else break
        }
      }
      if (nextNode.isEndOfWord && this.isConcatenated(word.substring(nextNode.depth), false)) return true
    }
    return false
  }

}

module.exports = Tree