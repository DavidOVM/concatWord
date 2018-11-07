const fs = require('fs')

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

let file = null
let words = null
try {
  file = fs.readFileSync('src/words.txt', 'utf8')
  words = file.split(/\r?\n/)
} catch (e) {
  console.log('please provide a valid file', e)
}

console.time("dbsave")

// words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat", "s"]
const tree = new Tree()

tree.addWords(words)

let concatenatedWordCount = 0
let maxLength = 0, secondMaxLength = 0
let maxLengthWords = [], secondMaxLengthWords = []
for (let i = 0; i < words.length; i++) {
  const word = words[i]
  if (tree.isConcatenated(word)) {
    concatenatedWordCount++
    if (word.length > maxLength) {
      secondMaxLength = maxLength
      secondMaxLengthWords = maxLengthWords
      maxLength = word.length
      maxLengthWords = [word]
    } else if (word.length === maxLength) {
      maxLengthWords.push(word)
    } else if (word.length > secondMaxLength) {
      secondMaxLength = word.length
      secondMaxLengthWords = [word]
    } else if (word.length === secondMaxLength) {
      secondMaxLengthWords.push(word)
    }
  }
}

console.log(maxLengthWords, secondMaxLengthWords, concatenatedWordCount)
console.timeEnd("dbsave")