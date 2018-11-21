from classes.tree import Tree


f = open("py_src/words.txt", "r")
words = filter(None, f.read().split('\r\n'))


tree = Tree()
tree.add_words(words)

concatenatedWordCount = 0
maxConcatLength = 0
secondMaxConcatLength = 0
maxLengthConcatWords = []
secondMaxLengthConcatWords = []

for word in words:

    if tree.is_concatenated(word):
        concatenatedWordCount += 1

        if len(word) > maxConcatLength:
            secondMaxConcatLength = maxConcatLength
            secondMaxLengthConcatWords = maxLengthConcatWords
            maxConcatLength = len(word)
            maxLengthConcatWords = [word]

        elif len(word) == maxConcatLength:
            maxLengthConcatWords.append(word)

        elif len(word) > secondMaxConcatLength:
            secondMaxConcatLength = len(word)
            secondMaxLengthConcatWords = [word]

        elif len(word) == secondMaxConcatLength:
            secondMaxLengthConcatWords.append(word)

print concatenatedWordCount, \
    maxLengthConcatWords, \
    secondMaxLengthConcatWords

