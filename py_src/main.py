from algorithms.tree import compute_concatenated_words


f = open("py_src/words.txt", "r")
words = filter(None, f.read().split('\r\n'))

print compute_concatenated_words(words)

