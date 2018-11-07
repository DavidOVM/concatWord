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

module.exports = Node